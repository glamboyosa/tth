import Image from "next/image";
import ChatInput from "./chat-input";
import { MessageTypeFromKV } from "@/types";
import { useChat } from "ai/react";
import { Message } from "ai";
import { MessageList } from "../message-list";

type ChatProps = {
  /**
   * messages stored in Redis, gotten from fetching the KV store.
   */
  messages: MessageTypeFromKV;
  /**
   * user's unique IP
   */
  unique_ip: string;
};
const NMY = (
  <>
    <Image
      src="/remote-work.svg"
      width={400}
      height={400}
      alt="remote work GIF"
    />
    <p className="text-xl md:text-2xl text-center">No Messages Yet...</p>
  </>
);
const Chat: React.FC<ChatProps> = ({
  messages: initialMessages,
  unique_ip,
}) => {
  const { messages, handleSubmit, input, handleInputChange } = useChat({
    api: "/api/chat",
    body: {
      unique_ip,
    },

    initialMessages: (initialMessages && initialMessages.length > 0
      ? initialMessages
      : []) as Message[],
  });
  console.log("openAI", messages);
  return (
    <div className="mt-28">
      {messages.length > 0 ? <MessageList messages={messages} /> : NMY}
      <ChatInput
        onChangeHandler={handleInputChange}
        value={input}
        submitHandler={handleSubmit}
      />
    </div>
  );
};

export default Chat;
