import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    KV_REST_API_TOKEN: z.string().min(20),
    KV_REST_API_READ_ONLY_TOKEN: z.string().min(20),
    KV_REST_API_URL: z.string().url(),
    KV_URL: z.string().min(20),
    OPEN_AI_API_KEY: z.string().min(20),
  },
  runtimeEnv: process.env,
});
