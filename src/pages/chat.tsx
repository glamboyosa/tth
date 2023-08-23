import Chat from "@/components/chat/chat";
import ChatNav from "@/components/navigation/chat-nav";
import { Toaster } from "@/components/ui/toaster";
import { convertFromJSON } from "@/lib/convertFromJson";
import { MessageTypeFromKV, StrippedPayload } from "@/types";
import { kv } from "@vercel/kv";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Message } from "ai";
import { useMutation } from "@tanstack/react-query";
import CommandChat from "@/components/chat/command-chat";
import { useToast } from "@/components/ui/use-toast";
export default function ChatPage({
  messages,
  usersMessagesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const [usersMsgsList, setUsersMsgsList] = useState(usersMessagesList);

  const uniqueIp = query["unique_ip"];
  const { toast } = useToast();
  const fetchList = useMutation<{ result: string[] }>(
    () =>
      fetch(`${process.env.NEXT_PUBLIC_KV_REST_API_URL}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_KV_REST_API_TOKEN}`,
        },
        body: `["LRANGE", "chats:${uniqueIp}", "0", "-1"]`,
      }).then((resp) => resp.json()),
    {
      onSuccess(data) {
        if (Object.keys(data).some((el) => el === "error")) {
          // Vercel KV returns an error successfully so we need to deal with it
          toast({
            title: "❌",
            description: "Something went wrong with KV",
          });
          return;
        }
        if (data.result.length === 0) {
          return [];
        } else {
          console.log(data.result);
          setUsersMsgsList(convertFromJSON(data.result));
        }
      },
    }
  );
  console.log(usersMsgsList, "users msg list");
  const mutationHandler = async () => {
    await fetchList.mutateAsync();
  };

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

  return (
    <>
      <ChatNav
        uniqueIp={uniqueIp as string}
        triggerHandler={() => setOpen(!open)}
      />
      <Chat
        messages={messages as unknown as Message[]}
        unique_ip={uniqueIp as string}
      />
      <CommandChat
        usersMessages={usersMsgsList}
        open={open}
        openHandler={async () => {
          console.log("YM");
          await mutationHandler();
          setOpen(!open);
        }}
      />
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
    usersMessages = await kv.hget(`userchat${query.id}`, "messages");
    path = await kv.hget(`userchat${query.id}`, "path");
  }

  console.log(usersMessages, "from user serverr");

  const msgsList: Array<StrippedPayload> = await kv.lrange(
    `chats:${query.unique_ip}`,
    0,
    -1
  );
  console.log("FROM SERVER", msgsList);
  const usersMessagesList =
    msgsList !== null && msgsList.length > 0 ? msgsList : null;
  return {
    props: {
      messages: usersMessages,
      path,
      usersMessagesList,
    },
  };
}
