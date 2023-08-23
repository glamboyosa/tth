import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PF = Playfair_Display({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={cn(
          "flex flex-col min-h-screen items-center text-black/80",
          PF.className,
          router.pathname === "/" && "bg-homeBg"
        )}
      >
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
