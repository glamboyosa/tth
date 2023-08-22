import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import { MessageType } from "@/types";
import { useState } from "react";
import { Ultra, Indie_Flower } from "next/font/google";

import HomeNav from "@/components/navigation/home-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import temp from "../../public/temp.png";
const ultra = Ultra({
  subsets: ["latin"],
  weight: "400",
});
const indie = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
});
/**
 * The list of messages displayed when the page is first loaded. You may remove or modify it as you wish.
 * @see src/types.ts
 */

export default function HomePage() {
  return (
    <section className="flex flex-col justify-center items-center">
      <HomeNav className="mt-10 mb-7">
        <span className={cn("text-xl md:text-2xl", indie.className)}>
          Trelent
        </span>
        <Button className="rounded-md p-4 text-white" asChild>
          <Link href="/chat">Chat Now !</Link>
        </Button>
      </HomeNav>
      <h1
        className={cn(
          "ml-2 text-4xl flex flex-col md:text-5xl  w-full p-2 mt-6 mb-6",
          ultra.className
        )}
      >
        Discover AI-Powered Dialogue
        <span>With Trelent,</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center  text-gray-900">
        Your Personalized, Intelligent AI Conversation Partner 👾
      </p>

      <Image
        src={temp}
        alt="placeholder img"
        placeholder="blur"
        className="text-center w-3/4 p-2 rounded-sm h-auto lg:w-full lg:h-auto"
        width={500}
        height={300}
      />
    </section>
  );
}
