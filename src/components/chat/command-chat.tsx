import { StrippedPayload } from "@/types";
import {
  CommandDialog,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { useRouter } from "next/router";
import Link from "next/link";

type CommandChatProps = {
  /**
   * open state for triggering the <Command/>
   */
  open: boolean;
  /**
   *  setter function for opening or closing <Command/>
   */
  openHandler: VoidFunction;

  usersMessages: Array<StrippedPayload> | null;
};

const CommandChat = ({
  open,
  openHandler,
  usersMessages,
}: CommandChatProps) => {
  const router = useRouter();
  return (
    <CommandDialog open={open} onOpenChange={openHandler}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Previous Conversations 💡">
          {usersMessages && usersMessages.length > 0 ? (
            usersMessages.map((info) => (
              <CommandItem className="cursor-pointer" key={info.path}>
                <Link href={`/chat?unique_ip=${info.unique_ip}&id=${info.id}`}>
                  {info.title}
                </Link>
              </CommandItem>
            ))
          ) : (
            <CommandItem>No results found.</CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandChat;
