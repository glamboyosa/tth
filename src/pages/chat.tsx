import Chat from "@/components/chat/chat";
import ChatNav from "@/components/navigation/chat-nav";
import { Toaster } from "@/components/ui/toaster";
import { convertFromJSON } from "@/lib/convertFromJson";
import { LightMessageType, MessageTypeFromKV, StrippedPayload } from "@/types";
import { createClient, kv } from "@vercel/kv";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
export default function ChatPage({
  messages,
  path,
  usersMessagesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const [usersMsgsList, setUsersMsgsList] = useState(usersMessagesList);
  const router = useRouter();
  const uniqueIp = query["unique-ip"];

  const { data } = useQuery({
    queryKey: ["userMessages"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_KV_REST_API_URL}/lrange/chat:${uniqueIp}/0/-1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_KV_REST_API_TOKEN}`,
          },
        }
      ).then((resp) => resp.json()),
    initialData:
      usersMessagesList && usersMessagesList?.length > 0
        ? usersMessagesList
        : [],
    onSuccess(data) {
      if (data.result.length === 0) {
        console.log("YEESIRR");
        return [];
      }
    },
  });
  console.log(data);
  console.log(uniqueIp);
  // key handler for when ctrl f is pressed (open <Command/>)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  // basically every re-render if there is a path ,
  // shallow update the route
  useEffect(() => {
    if (path && path.length > 0) {
      router.push({ pathname: path }, undefined, { shallow: true });
    }
  });

  return (
    <>
      <ChatNav triggerHandler={() => setOpen(!open)} />
      <Chat messages={messages} unique_ip={uniqueIp as string} />
      <Toaster />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  let usersMessages: MessageTypeFromKV = [];
  let path: string | null = "";

  console.log(query);
  if (query.id) {
    usersMessages = await kv.hget(
      `user:${query["unique-ip"]}chat:${query.id}`,
      "messages"
    );
    path = await kv.hget(`user:${query["unique-ip"]}chat:${query.id}`, "path");
  }

  const msgsList: string[] = await kv.lrange(`chats:${query.unique_ip}`, 0, -1);
  const usersMessagesList =
    msgsList !== null && msgsList.length > 0 ? convertFromJSON(msgsList) : null;
  return {
    props: {
      messages: usersMessages,
      path,
      usersMessagesList,
    },
  };
}
