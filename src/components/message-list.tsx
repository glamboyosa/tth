import React from "react";
import { MessageType } from "@/types";
import { Message } from "./message";

export type MessageListProps = {
  /**
   * The list of messages to display.
   * @see src/types.ts
   */
  messages: MessageType[];
};
export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="overflow-auto w-full  md:w-[45%]">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
