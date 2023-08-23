import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { nicerDate } from "@/lib/nicerDate";
import { LightMessageType } from "@/types";
import {
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "./ui/use-toast";

export type MessageProps = {
  /**
   * The message to display.
   * @see src/types.ts
   */
  message: LightMessageType;
};
export const Message = ({ message }: MessageProps) => {
  const { toast } = useToast();
  const copyHandler = async (text: string) => {
    try {
      await copyTextToClipboard(text);
      toast({
        title: "Success ✅",
        description: "Successfully copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "❌",
        description: "Something went wrong copying to clipboard",
      });
    }
  };
  return (
    <div className="flex items-start w-1/2  gap-2 p-2 text-black divide-y-2 divide-y-reverse divide-solid divide-gray-300 last-of-type:divide-y-0 last-of-type:divide-none md:w-full">
      {message.role === "user" ? (
        <UserIcon  className="w-12 md:w-6" />
      ) : (
        <ComputerDesktopIcon className="w-12 md:w-6" />
      )}
      <div className="w-[500px]">
        <p className=" w-full text-base mb-2">{message.content}</p>
        <p className="mb-2 text-xs text-gray-700 md:text-sm whitespace-nowrap">
          {nicerDate(message.createdAt ? message.createdAt : Date())}
        </p>
      </div>
      <ClipboardDocumentIcon
        className="ml-auto cursor-pointer divide-none! w-12 md:w-7"
      
        onClick={() => copyHandler(message.content)}
      />
    </div>
  );
};
