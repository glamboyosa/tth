import { StrippedPayload } from "@/types";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, streamToResponse, Message } from "ai";
import OpenAI from "openai";

// run on the edge
export const runtime = "edge";
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
    const body = request.body;
    console.log("THE BODY IS", body);
    console.log("PARSED BODY?", JSON.parse(body));

    // Listen to the 'data' event to accumulate the incoming data
    const {
      messages,
      unique_ip,
    }: { messages: Array<Message>; unique_ip: string } = JSON.parse(body);
    const id = crypto.randomUUID();
    console.log(request.body.unique_ip);
    console.log(messages, "messages from client");
    const title = messages[0].content.substring(0, 50);
    const path = `/chat?unique_ip=${unique_ip}&id=${id}`;
    console.log("THE PATH IS", path);
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      stream: true,
    });
    const stream = OpenAIStream(res, {
      async onCompletion(completion) {
        const messagesWithTimestamp = messages.map((message) => ({
          ...message,
          createdAt: new Date(),
        }));
        const payload = {
          id,
          unique_ip,
          path,
          title,
          messages: [
            ...messagesWithTimestamp,
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
        const r = await kv.hset(`userchat${id}`, payload);
        console.log("HSET RESP", r);
        const msgs = JSON.stringify(strippedPayload);
        // save the messages itself
        const l = await kv.lpush(`chats:${unique_ip}`, msgs);
        console.log("LPUSH RESP", l);
      },
    });
    return streamToResponse(stream, response);
  }

  return response.status(200).json({ hello: "world" });
}
