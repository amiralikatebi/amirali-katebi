// "use client";
// import { useState } from "react";

// export default function NewsList({ initialNews }) {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const toggleExpand = (i) =>
//     setExpandedIndex(expandedIndex === i ? null : i);

//   return (
//     <div className="flex flex-col w-full gap-4 lg:w-2/3">
//       <h1 className="text-xl font-semibold">News for Developers</h1>

//       {initialNews.map((n, i) => (
//         <div
//           key={i}
//           className="p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
//           onClick={() => toggleExpand(i)}
//         >
//           <h2 className="font-semibold">{n.title}</h2>
//           <p className="text-sm text-gray-500">
//             {n.author} | {new Date(n.pubDate).toLocaleDateString()} | {n.source}
//           </p>

//           {expandedIndex === i && (
//             <div className="mt-2 text-gray-700">
//               <div dangerouslySetInnerHTML={{ __html: n.content }} />
//               <div className="mt-2">
//                 <a
//                   href={n.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   Read full article
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
