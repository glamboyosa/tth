import ChatNav from "@/components/navigation/chat-nav";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const uniqueIp = query["unique-ip"];
  console.log(uniqueIp);
  // key handler for when ctrl f is pressed (open <Command/>)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <ChatNav triggerHandler={() => setOpen(!open)} />
      <Image
        src="/remote-work.svg"
        width={400}
        height={400}
        alt="remote work GIF"
      />
      <p className="text-xl md:text-2xl text-center">No Messages Yet...</p>
    </>
  );
}
