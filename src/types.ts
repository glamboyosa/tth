import { Message } from "ai";

export interface LightMessageType extends Pick<Message, "role" | "content"> {
  createdAt: string;
}

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
