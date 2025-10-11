"use client";
import { useState } from "react";

export default function NewsList({ initialNews, loading }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (i) =>
    setExpandedIndex(expandedIndex === i ? null : i);

  const skeletons = Array(5).fill(0);

  return (
    <div className="flex flex-col w-full gap-4 lg:w-2/3">
      <h1 className="text-xl font-semibold">News for Developers</h1>

      {loading
        ? skeletons.map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-white shadow-sm animate-pulse"
            >
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-1" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))
        : initialNews.map((n, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleExpand(i)}
            >
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-sm text-gray-500">
                {n.author} | {new Date(n.pubDate).toLocaleDateString()} | {n.source}
              </p>

              {expandedIndex === i && (
                <div className="mt-2 text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: n.content }} />
                  <div className="mt-2">
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Read full article
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
    </div>
  );
}
