import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    KV_REST_API_TOKEN: z.string().min(20),
    KV_REST_API_READ_ONLY_TOKEN: z.string().min(20),
    KV_REST_API_URL: z.string().url(),
    KV_URL: z.string().min(20),
  },
  client: {
    KV_REST_API_TOKEN_CLIENT: z.string().min(20),
    KV_REST_API_URL_CLIENT: z.string().url(),
  },
  runtimeEnv: {
    KV_REST_API_TOKEN_CLIENT: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
    KV_REST_API_URL_CLIENT: process.env.NEXT_PUBLIC_KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_URL: process.env.KV_URL,
  },
});
