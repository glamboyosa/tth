import { cn } from "@/lib/utils";
import { channel } from "diagnostics_channel";
import Link from "next/link";
import { useState } from "react";
const commandLabel = (
  <p className="text-base whitespace-nowrap text-muted-foreground">
    Conversation History (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5  text-[10px] font-medium text-muted-foreground opacity-100">
      <span className="text-sm">⌘</span>F
    </kbd>
    ) or click!
  </p>
);
// navigation tabs
const tabs: Array<{
  id: "chat" | "home" | "history";
  label: JSX.Element | string;
  link?: string;
}> = [
  { id: "home", label: "Home", link: "/" },
  { id: "chat", label: "Chat", link: "/chat" },
  {
    id: "history",
    label: commandLabel,
  },
];

type ChatNavProps = {
  /**
   * the function that triggers opening the `<Command/>`
   */
  triggerHandler: VoidFunction;
  /**
   * the users unique ip
   */
  uniqueIp: string;
};

const ChatNav = ({ triggerHandler, uniqueIp }: ChatNavProps) => {
  const [activeTabId] = useState("chat" as const);
  // const [tabId, setTabId] = useState<(typeof tabs)[0]["id"]>("chat");

  return (
    <div
      className={cn(
        "bg-white text-black fixed top-[1vh] z-20 w-auto rounded-md p-2  shadow-xl xl:top-[5vh]"
      )}
    >
      <div className="cursor flex space-x-2 md:space-x-6">
        {tabs.map((tab) =>
          tab.link ? (
            <Link
              key={tab.id}
              href={
                tab.link === "/chat"
                  ? `${tab.link}?unique_ip=${uniqueIp}`
                  : tab.link
              }
            >
              <button
                className={cn(
                  `relative  rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`,
                  cn(
                    activeTabId !== tab.id
                      ? "hover:bg-homeBg"
                      : "underline underline-offset-8 decoration-2 decoration-homeBg"
                  )
                )}
              >
                {tab.label}
              </button>
            </Link>
          ) : (
            <button
              key={tab.id}
              onClick={triggerHandler}
              className={cn(
                "rounded-md p-2",
                activeTabId !== tab.id
                  ? "hover:bg-homeBg"
                  : "underline hover:underline-offset-8 hover:decoration-homeBg"
              )}
            >
              {tab.label}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default ChatNav;
