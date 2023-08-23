import { LightMessageType, StrippedPayload } from "@/types";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, StreamingTextResponse, Message } from "ai";
import OpenAI from "openai";
import { json } from "express";

// run on the edge

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const requestBody: { messages: Array<Message>; unique_ip: string } | null =
    null;
  if (request.method === "POST") {
    console.log("HIT HERE");
    let rawData = "";

    // Listen to the 'data' event to accumulate the incoming data
    request.on("data", (chunk) => {
      rawData += chunk;
    });

    request.on("end", async () => {
      const requestData = JSON.parse(rawData);
      console.log(requestData);
      const {
        messages,
        unique_ip,
      }: { messages: Array<Message>; unique_ip: string } = requestData;
      const id = crypto.randomUUID();
      console.log(request.body.unique_ip);
      console.log(messages, "messages from client");
      const title = messages[0].content.substring(0, 50);
      const path = `/chat?unique_ip=${unique_ip}&id=${id}`;
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        stream: true,
      });
      const stream = OpenAIStream(res, {
        async onCompletion(completion) {
          const payload = {
            id,
            unique_ip,
            path,
            title,
            messages: [
              ...messages,
              {
                content: completion,
                role: "assistant",
                createdAt: new Date(),
              },
            ],
          };
          const strippedPayload: StrippedPayload = {
            id: payload.id,
            unique_ip: payload.unique_ip,
            path: payload.path,
            title: payload.title,
          };
          // save a chat payload into Redis
          await kv.hset(`user:${unique_ip}chat:${id}`, payload);
          const msgs = JSON.stringify(strippedPayload);
          // save the messages itself
          await kv.lpush(`chats:${unique_ip}`, msgs);
        },
      });
      return new StreamingTextResponse(stream);
    });
  }

  return response.status(200).json({ hello: "world" });
}
