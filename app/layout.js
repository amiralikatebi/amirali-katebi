import "./global.css";
import { Roboto_Mono } from "next/font/google";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Amirali Katebi",
  description:
    "Hi, I'm Amirali Katebi, a front-end and back-end developer currently working at Parspardaz. I am passionate about building software that blends functionality with enjoyable user experiences.",
  keywords: [
    "Amirali Katebi",
    "امیرعلی کاتبی",
    "Full Stack Developer",
    "Front-end Developer",
    "Back-end Developer",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Amirali Katebi" }],
  creator: "امیرعلی کاتبی",
  openGraph: {
    title: "Amirali Katebi | Full-Stack Developer",
    description:
      "Portfolio of Amirali Katebi, a full-stack developer creating efficient and enjoyable web experiences.",
    url: "https://amirali-katebi.ir",
    siteName: "Amirali Katebi",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted"
    >
      <ClerkProviderWrapper>
        <body className={`${roboto_mono.className} bg-bg-image `}>
          <div className="flex flex-col items-center px-4 pt-10 mx-auto max-w-4xl lg:max-w-5xl sm:px-12 md:px-20 lg:px-12 xl:max-w-7xl min-h-svh">
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </body>
      </ClerkProviderWrapper>
    </html>
  );
}
