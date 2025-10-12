'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [movies, setMovies] = useState(null);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [playingUrl, setPlayingUrl] = useState(null);

  useEffect(() => {
    fetch('/movie.json')
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  }, []);

  if (!movies) return null;

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <ul className="space-y-8">
        {movies.map((movie, idx) => {
          const isMovieExpanded = expandedMovie === idx;

          return (
            <li key={idx} className="border rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800">
              <div
                className="flex items-center gap-6"
                onClick={() => {
                  if (expandedMovie === idx) {
                    setExpandedMovie(null);
                    setExpandedSeason(null);
                    setPlayingUrl(null);
                  } else {
                    setExpandedMovie(idx);
                    setExpandedSeason(null);
                    setPlayingUrl(null);
                  }
                }}
              >
                <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={movie.banner}
                    alt={movie.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority={idx === 0}
                  />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {movie.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-yellow-500">
                    <IMDbIcon />
                    <span className="font-semibold">{movie.imdb}</span>
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                    Type: <span className="capitalize">{movie.type}</span>
                  </p>
                </div>
              </div>

              {isMovieExpanded && (
                <div className="mt-8 pl-2">
                  {movie.seasons.map((season) => {
                    const isSeasonExpanded = expandedSeason === season.season_number;
                    return (
                      <div
                        key={season.season_number}
                        className="mb-6 border rounded-lg border-gray-300 dark:border-gray-600"
                      >
                        <button
                          className="w-full flex justify-between items-center px-6 py-3 text-lg font-semibold bg-gray-100 dark:bg-gray-700 rounded-t-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          onClick={() =>
                            setExpandedSeason(
                              isSeasonExpanded ? null : season.season_number
                            )
                          }
                          aria-expanded={isSeasonExpanded}
                        >
                          <span>Season {season.season_number}</span>
                          <span className="text-2xl font-bold select-none">
                            {isSeasonExpanded ? '−' : '+'}
                          </span>
                        </button>

                        {isSeasonExpanded && (
                          <ul className="max-h-72 overflow-y-auto px-6 py-4 space-y-3 bg-white dark:bg-gray-800 rounded-b-lg">
                            {season.episodes.map((episode) => {
                              const episodeUrl = episode.url[0].quality['720p'];
                              const isPlaying = playingUrl === episodeUrl;
                              return (
                                <li key={episode.episode_number} className="flex flex-col">
                                  <button
                                    className={`flex items-center justify-between text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm ${
                                      isPlaying ? 'underline' : ''
                                    }`}
                                    onClick={() => setPlayingUrl(episodeUrl)}
                                  >
                                    <span>
                                      Episode {episode.episode_number} - {episode.title}
                                    </span>
                                    <ExternalLink className="w-4 h-4" />
                                  </button>

                                  {isPlaying && (
                                    <video
                                      src={playingUrl}
                                      controls
                                      autoPlay
                                      className="mt-3 rounded-md w-full max-w-full aspect-video bg-black shadow-lg"
                                    />
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
