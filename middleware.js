import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export function middleware(req) {
  const { userId } = getAuth(req);

  // اینجا فقط وضعیت لاگین رو چک می‌کنیم (مثلاً برای لاگ گرفتن یا منطق دیگه)
  // ولی اجازه میدیم همیشه ادامه بده بدون هیچ ریدایرکتی
  // اگر خواستی می‌تونی اینجا لاگ بزنی یا داده‌هایی تو req بگذاری

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
