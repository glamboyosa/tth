import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";

type ChatInputProps = {
  /**
   * `onChangeHandler` bound from Vercel AI's form control
   */
  onChangeHandler: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  /**
   * `submitHandler` bound from Vercel AI's form control
   */
  submitHandler: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  /**
   * `value` bound from Vercel AI's form control
   */
  value: string;
};

const ChatInput = ({
  onChangeHandler,
  value,
  submitHandler,
}: ChatInputProps) => {
  return (
    <form
      onSubmit={submitHandler}
      className="fixed cursor-pointer top-[82vh] left-0 z-30 w-full  md:w-[45%] p-8 bg-white/80 shadow-fuller-shadow md:left-[30%] "
    >
      <div className="flex gap-3 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PlusCircleIcon width={30} />
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-sm text-inherit">
              <p>Start a new chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Input
          placeholder="send a message"
          onChange={onChangeHandler}
          value={value}
          className=" p-5 shadow-md outline-none border-none focus:border-none focus-visible:border-none focus:outline-none focus-visible:outline-none"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                className="shadow-md outline-none cursor-pointer text-black text-sm whitespace-nowrap border-none hover:bg-transparent bg-transparent flex items-center gap-2"
              >
                <PaperAirplaneIcon className="text-black" width={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mr-2 bg-white text-inherit shadow-sm">
              <p>Send Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  );
};

export default ChatInput;
