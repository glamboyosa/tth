import { getRemoteUser } from "@/lib/getRemoteUser";
import { nanoid } from "ai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const userDeets = request.ip ?? nanoid();
  console.log(userDeets);
  url.searchParams.set("unique_ip", userDeets);
  return NextResponse.rewrite(url);
}
export const config = {
  matcher: ["/"],
};
