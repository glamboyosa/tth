import { Message } from "ai";
/**
 * The message to display. By default, this is an object with a `role` and `content` property.
 * Feel free to modify this as you wish, or use a different type (even from another library) altogether.
 */
export interface LightMessageType extends Pick<Message, "role" | "content">{
  createdAt: string;
};

export type MessageTypeFromKV = Array<LightMessageType> | null;
 type Payload = {
  id: string;
  unique_ip: string;
  path: string;
  title: string;
  messages: Array<
    | Message
    | {
        content: string;
        role: string;
        createdAt: Date;
      }
  >;
};
export type StrippedPayload = Omit<Payload, "messages">;
