import NewsList from "@/components/NewsList";

export const revalidate = 60;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://amiralikatebi.ir"
    : "http://localhost:3000";

async function fetchNews() {
  try {
    const res = await fetch(`${BASE_URL}/api/news`, { next: { revalidate: 60 } });
    if (!res.ok) return { news: [] };
    return res.json();
  } catch {
    return { news: [] };
  }
}

export default async function NewsPage() {
  const data = await fetchNews();
  return <NewsList initialNews={data.news || []} />;
}
