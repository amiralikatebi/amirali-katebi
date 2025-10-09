import NewsList from "@/components/NewsList";

export const revalidate = 3600;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://amiralikatebi.ir"
    : "http://localhost:3000";

async function fetchNews() {
  const res = await fetch(`${BASE_URL}/api/news`, {
    cache: "force-cache",
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("API response is not valid JSON:", text);
    return { news: [] };
  }
}

export default async function NewsPage() {
  const data = await fetchNews();
  return <NewsList initialNews={data.news || []} />;
}
