import ChatUI from "@/components/chat";
import { MessageTypeFromKV, StrippedPayload } from "@/types";
import { kv } from "@vercel/kv";
import { Message } from "ai";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams?: { unique_ip: string; id: string };
}) {
  let usersMessages: MessageTypeFromKV = [];

  console.log(searchParams);
  if (searchParams?.id && searchParams.id.length > 0) {
    usersMessages = await kv.hget(`userchat${searchParams.id}`, "messages");
  }

  console.log(usersMessages, "from user serverr");

  const msgsList: Array<StrippedPayload> = await kv.lrange(
    `chats:${searchParams?.unique_ip}`,
    0,
    -1
  );
  console.log("FROM SERVER", msgsList);
  const usersMessagesList =
    msgsList !== null && msgsList.length > 0 ? msgsList : null;
  return (
    <div className="flex flex-col min-h-screen items-center text-black/80 bg-white/90">
      <ChatUI messages={usersMessages} usersMessagesList={usersMessagesList} />
    </div>
  );
}
