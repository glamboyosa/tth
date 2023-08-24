import Image from "next/image";
import ChatInput from "./chat-input";
import { LightMessageType } from "@/types";
import { useChat } from "ai/react";
import { Message } from "ai";
import { MessageList } from "./message-list";
import Spacer from "../ui/spacer";

type ChatProps = {
  /**
   * messages stored in Redis, gotten from fetching the KV store.
   */
  messages: Message[];
  /**
   * user's unique IP
   */
  unique_ip: string;
  /**
   * function that updates users list once streaming is done
   */
  mutationHandler: () => Promise<void>;
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
  mutationHandler,
}) => {
  const { messages, handleSubmit, input, handleInputChange } = useChat({
    api: "/api/chat",
    body: {
      unique_ip,
    },

    initialMessages:
      initialMessages && initialMessages.length > 0
        ? initialMessages
        : undefined,
    async onFinish() {
      await mutationHandler();
    },
  });
  console.log("openAI", messages);

  return (
    <div className="mt-32 overflow-scroll scroll-smooth">
      {messages.length > 0 ? (
        <MessageList messages={messages as unknown as LightMessageType[]} />
      ) : (
        NMY
      )}

      <Spacer />
      <ChatInput
        onChangeHandler={handleInputChange}
        value={input}
        submitHandler={handleSubmit}
      />
    </div>
  );
};

export default Chat;
