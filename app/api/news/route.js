import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const RSS_SOURCES = [
  { name: "Dev.to", url: "https://dev.to/feed/tag/developer" },
  { name: "Dev.to", url: "https://dev.to/feed/tag/react" },
  { name: "Dev.to", url: "https://dev.to/feed/tag/next" },
  { name: "Dev.to", url: "https://dev.to/feed/tag/python" },
];

export async function GET() {
  try {
    let allPosts = [];

    for (let source of RSS_SOURCES) {
      const feed = await parser.parseURL(source.url);
      const posts = feed.items.slice(0, 10).map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item.content || item.contentSnippet || "",
        author: item.creator || item.author || source.name,
        source: source.name
      }));
      allPosts = allPosts.concat(posts);
    }

    allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return NextResponse.json(
      { news: allPosts.slice(0, 50) },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, no-cache, must-revalidate",
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
