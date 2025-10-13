'use client';
import { Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecentUpdate({ projects = [] }) {
  const [randomProject, setRandomProject] = useState(null);

  useEffect(() => {
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setRandomProject(projects[randomIndex]);
    }
  }, [projects]);

  if (!randomProject) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-start w-full gap-3 mb-10">
        <Newspaper className="w-6 h-6" />
        <span className="text-lg font-semibold">Recent Github</span>
      </div>

      <ul className="grid w-full grid-cols-1 gap-10">
        <li key={randomProject.id}>
          <Link href={randomProject.url} target="_blank">
            <div className="relative rounded-2xl hover:shadow-lg shadow-md transition-all duration-200 opacity-80 hover:opacity-100">
              <div className="relative aspect-[240/135] w-full">
                {randomProject.owner.avatar_url && (
                  <Image
                    src={randomProject.owner.avatar_url}
                    alt={randomProject.full_name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-lg backdrop-blur-md bg-black/30">
                <h2 className="mb-2 font-bold text-white">{randomProject.full_name}</h2>
                <p className="mb-4 text-sm text-gray-300">
                  ⭐ {randomProject.stars.toLocaleString()} — Last updated:{' '}
                  {new Date(randomProject.last_updated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-200">
                  {randomProject.description || 'No description available.'}
                </p>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
