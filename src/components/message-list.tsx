import React from "react";
import { LightMessageType } from "@/types";
import { Message } from "./message";

export type MessageListProps = {
  /**
   * The list of messages to display.
   * @see src/types.ts
   */
  messages: LightMessageType[];
};
export const MessageList = ({ messages }: MessageListProps) => {
  console.log(messages)
  return (
    <div className="overflow-auto flex flex-col justify-center items-center">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
