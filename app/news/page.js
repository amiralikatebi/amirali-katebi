import { Suspense } from "react";
import NewsList from "@/components/NewsList";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://amiralikatebi.ir"
    : "http://localhost:3000";

async function fetchNews() {
  const res = await fetch(`${BASE_URL}/api/news`, { next: { revalidate: 3600 } });
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("API response is not valid JSON:", text);
    return { news: [] };
  }
}

async function NewsContent() {
  const data = await fetchNews();
  return <NewsList initialNews={data.news || []} />;
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
