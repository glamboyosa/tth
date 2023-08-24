"use client";
import { MessageTypeFromKV, StrippedPayload } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import CommandChat from "@/components/chat/command-chat";
import Chat from "@/components/chat/chat";
import { Message } from "ai";
import ChatNav from "@/components/navigation/chat-nav";
import { convertFromJSON } from "@/lib/convertFromJson";
export default function ChatUI({
  messages,
  usersMessagesList,
}: {
  messages: MessageTypeFromKV;
  usersMessagesList: Array<StrippedPayload> | null;
}) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [usersMsgsList, setUsersMsgsList] = useState(usersMessagesList);

  const uniqueIp = searchParams?.get("unique_ip");
  const id = searchParams?.get("id");
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
  const mutationHandler = useCallback(async () => {
    await fetchList.mutateAsync();
  }, []);

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

    // also if the page mounts for the first time e.g. after clicking
    // some history , dismiss

    setOpen(false);

    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (id) {
      setOpen(false);
    }
  }, [id]);

  return (
    <>
      <ChatNav
        uniqueIp={uniqueIp as string}
        triggerHandler={() => setOpen(!open)}
      />
      <Chat
        messages={messages as unknown as Message[]}
        unique_ip={uniqueIp as string}
        mutationHandler={mutationHandler}
      />
      <CommandChat
        usersMessages={usersMsgsList}
        open={open}
        openHandler={() => setOpen(!open)}
      />
    </>
  );
}
