import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(
  async (req) => {
    try {
      const { userId } = await auth();
      console.log("User ID in middleware:", userId);
      // هیچ ریدایرکتی انجام نمیشه حتی اگر userId وجود نداشته باشه
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      // خطا رو می‌گیریم ولی جلوش رو می‌گیریم و اجازه می‌دیم درخواست ادامه پیدا کنه
      return NextResponse.next();
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
