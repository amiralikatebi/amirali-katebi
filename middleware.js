import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export function middleware(req) {
  try {
    const { userId } = getAuth(req);
    console.log("User ID:", userId); // برای دیباگ
  } catch (error) {
    console.error("Middleware error:", error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
