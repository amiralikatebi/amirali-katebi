"use client";

import { useState, useEffect } from "react";
import NewsList from "@/components/NewsList";

const BASE_URL = "https://amiralikatebi.ir";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  async function fetchNews() {
    try {
      const res = await fetch(`${BASE_URL}/api/news`, { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      return data.news || [];
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return <NewsList initialNews={news} />;
}
