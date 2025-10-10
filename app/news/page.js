import NewsList from "@/components/NewsList";

const BASE_URL = "https://amiralikatebi.ir";

async function fetchNews() {
  try {
    const res = await fetch(`${BASE_URL}/api/news`, { cache: "no-store" });
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
