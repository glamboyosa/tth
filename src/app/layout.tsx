import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { PF } from "@/lib/font";
import QueryProvider from "./query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trelent 👾",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className={cn(" min-h-screen text-black/80", PF.className)}>
            {children}
          </div>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
