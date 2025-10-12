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
      <ul className="space-y-6">
        {movies.map((movie, idx) => {
          const isMovieExpanded = expandedMovie === idx;

          return (
            <li key={idx} className="border rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer">
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
                <div className="relative w-24 h-32 flex-shrink-0 rounded overflow-hidden shadow">
                  <Image
                    src={movie.url}
                    alt={movie.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold">{movie.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-yellow-600">
                    <IMDbIcon />
                    <span className="font-medium">{movie.imdb}</span>
                  </div>
                </div>
              </div>

              {isMovieExpanded && (
                <div className="mt-6 pl-1">
                  {movie.seasons.map((season) => {
                    const isSeasonExpanded = expandedSeason === season.season_number;
                    return (
                      <div key={season.season_number} className="mb-4">
                        <button
                          className="font-semibold text-lg text-left w-full flex justify-between items-center py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
                          onClick={() =>
                            setExpandedSeason(
                              isSeasonExpanded ? null : season.season_number
                            )
                          }
                        >
                          <span>Season {season.season_number}</span>
                          <span>{isSeasonExpanded ? '-' : '+'}</span>
                        </button>

                        {isSeasonExpanded && (
                          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                            {season.episodes.map((episode) => {
                              const isPlaying = playingUrl === episode.url[0].quality['720p'];
                              return (
                                <li key={episode.episode_number} className="pl-4">
                                  <button
                                    className="text-blue-600 hover:underline flex items-center gap-2"
                                    onClick={() => setPlayingUrl(episode.url[0].quality['720p'])}
                                  >
                                    Episode {episode.episode_number} - {episode.title}
                                    <ExternalLink className="w-4 h-4" />
                                  </button>

                                  {isPlaying && (
                                    <video
                                      src={playingUrl}
                                      controls
                                      autoPlay
                                      className="mt-2 rounded-md w-full max-w-full aspect-video bg-black"
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
