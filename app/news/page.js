// import NewsList from "@/components/NewsList";

// export const revalidate = 3600;

// async function fetchNews() {
//   const res = await fetch("http://amiralikatebi.ir/api/news", {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) throw new Error("Failed to fetch news");
//   return res.json();
// }

// export default async function NewsPage() {
//   const data = await fetchNews();
//   return <NewsList initialNews={data.news || []} />;
// }
