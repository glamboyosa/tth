# tth

a chat app built with:

- OpenAI
- Next.js 13 (Pages)
- Vercel AI SDK
- Shadcn/ui
- Tailwind
- T3 Env
- Vercel KV

## Getting Started with Vercel KV

Copy the environment variables via:

```bash
cp .env.local.example .env.local
```

To use Vercel KV in our project follow the [official guide](https://vercel.com/docs/storage/vercel-kv/quickstart) and update the env file with the variables supplied by Vercel.

## Install Project Dependencies

Install dependencies via:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Run app

To run:

```bash
npm run dev
```

## Troubleshooting

You might get a `429` error code when you attempt a chat completion, this comes from OpenAI and basically means your free trial is over and need to input billing details for a paid plan.
