import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { nicerDate } from "@/lib/nicerDate";
import { LightMessageType } from "@/types";
import {
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  UserCircleIcon,
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
    <div className="flex  gap-2 p-2 text-black divide-y-2 divide-solid divide-gray-300 last-of-type:divide-y-0 last-of-type:divide-none">
      {message.role === "user" ? (
        <UserIcon width={45} />
      ) : (
        <ComputerDesktopIcon width={45} />
      )}
      <div className="w-[90%]">
        <p className="whitespace-normal text-base mb-2 md:text-xl">
          {message.content}
        </p>
        <p className="text-base mb-2 md:text-xl">
          {nicerDate(message.createdAt as Date)}
        </p>
      </div>
      <ClipboardDocumentIcon onClick={() => copyHandler(message.content)} />
    </div>
  );
};
