import { StrippedPayload } from "@/types";

const convertFromJSON = (msgList: Array<string>): Array<StrippedPayload> => {
  return msgList.map((el) => JSON.parse(el));
};

export { convertFromJSON };
