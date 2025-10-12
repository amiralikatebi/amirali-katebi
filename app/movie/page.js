'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const IMDbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 64 64"
    fill="currentColor"
    className="text-yellow-500"
  >
    <rect width="64" height="64" rx="8" ry="8" fill="#f5c518" />
    <path
      d="M10 22h4v20h-4zM21 22h4v20h-4zM27 22h7l3 11 3-11h7v20h-4V28l-3 10h-4l-3-10v14h-4zM50 22h4v20h-4z"
      fill="#000"
    />
  </svg>
);

export default function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/movie.json')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
      });
  }, []);

  return (
    <section className="p-6">
      <ul className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie, idx) => (
          <li key={idx}>
            <div className="relative flex flex-col items-start justify-center gap-6 p-5 border-dashed border-[0.8px] border-transparent rounded-2xl hover:border-muted-foreground hover:bg-muted">
              <div className="relative flex items-center justify-center w-12 h-12 shadow-[0_0px_3px_rgb(180,180,180)] rounded-full overflow-hidden">
                <Image
                  src={movie.url}
                  alt={movie.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="mb-2 font-semibold">{movie.name}</h2>
                <p className="text-sm font-light text-muted-foreground">
                  Type: {movie.type}
                </p>

                <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600">
                  <IMDbIcon />
                  <span className="font-medium">{movie.imdb}</span>
                </div>
              </div>

              <div className="w-full">
                {movie.seasons.map((season) => (
                  <div key={season.season_number} className="mb-4">
                    <h3 className="font-medium mb-2">
                      Season {season.season_number}
                    </h3>
                    <ul className="space-y-2">
                      {season.episodes.map((episode) => (
                        <li key={episode.episode_number}>
                          <Link
                            href={episode.url[0].quality['720p']}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                          >
                            <span>
                              Episode {episode.episode_number} - {episode.title}
                            </span>
                            <ExternalLink className="size-4" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
