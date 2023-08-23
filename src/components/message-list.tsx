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
  return (
    <div className="overflow-auto w-full ">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
