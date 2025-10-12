'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mrrobot from '../../public/images/mrrobot.jpg';

const IMDbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="20"
    viewBox="0 0 80 64"
    className="drop-shadow-sm"
  >
    <rect width="80" height="64" rx="8" ry="8" fill="#F5C518" />
    <text
      x="40"
      y="42"
      textAnchor="middle"
      fontSize="30"
      fontWeight="900"
      fontFamily="Arial Black, Arial, Helvetica, sans-serif"
      fill="#000"
      dominantBaseline="middle"
    >
      IMDb
    </text>
  </svg>
);



export default function MoviePage() {
  const [movies, setMovies] = useState(null);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [playingUrl, setPlayingUrl] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);

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
            <li
              key={idx}
              className="border rounded-2xl p-6 shadow-lg hover:shadow-xl transition bg-white dark:bg-gray-800"
            >
              <div
                className="flex items-center gap-6 cursor-pointer"
                onClick={() => {
                  if (expandedMovie === idx) {
                    setExpandedMovie(null);
                    setExpandedSeason(null);
                    setPlayingUrl(null);
                    setSelectedQuality(null);
                  } else {
                    setExpandedMovie(idx);
                    setExpandedSeason(null);
                    setPlayingUrl(null);
                    setSelectedQuality(null);
                  }
                }}
              >
                <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={mrrobot}
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

              <AnimatePresence>
                {isMovieExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pl-2 overflow-hidden"
                  >
                    {movie.seasons.map((season) => {
                      const isSeasonExpanded =
                        expandedSeason === season.season_number;
                      return (
                        <div
                          key={season.season_number}
                          className="mb-6 border rounded-xl border-gray-300 dark:border-gray-600 overflow-hidden"
                        >
                          <button
                            className="w-full flex justify-between items-center px-6 py-3 text-lg font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            onClick={() =>
                              setExpandedSeason(
                                isSeasonExpanded ? null : season.season_number
                              )
                            }
                          >
                            <span>Season {season.season_number}</span>
                            <span className="text-2xl font-bold select-none">
                              {isSeasonExpanded ? '−' : '+'}
                            </span>
                          </button>

                          <AnimatePresence>
                            {isSeasonExpanded && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="max-h-80 overflow-y-auto px-6 py-4 space-y-3 bg-white dark:bg-gray-800"
                              >
                                {season.episodes.map((episode) => {
                                  const qualities = episode.url[0].quality;
                                  const episodeKeys = Object.keys(qualities);
                                  const selected =
                                    playingUrl &&
                                    playingUrl.includes(
                                      `E${String(episode.episode_number).padStart(2, '0')}`
                                    );
                                  return (
                                    <li
                                      key={episode.episode_number}
                                      className={`p-3 rounded-lg transition ${
                                        selected
                                          ? 'bg-blue-100 dark:bg-blue-900'
                                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                          Episode {episode.episode_number}
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-blue-500" />
                                      </div>

                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {episodeKeys.map((q) => (
                                          <button
                                            key={q}
                                            onClick={() => {
                                              setSelectedQuality(q);
                                              setPlayingUrl(qualities[q]);
                                            }}
                                            className={`px-3 py-1 text-xs rounded-full font-medium transition border ${
                                              playingUrl === qualities[q]
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-white'
                                            }`}
                                          >
                                            {q}
                                          </button>
                                        ))}
                                      </div>

                                      {playingUrl &&
                                        Object.values(qualities).includes(
                                          playingUrl
                                        ) && (
                                          <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="mt-4"
                                          >
                                            <video
                                              src={playingUrl}
                                              controls
                                              autoPlay
                                              className="rounded-lg w-full aspect-video bg-black shadow-lg"
                                            />
                                          </motion.div>
                                        )}
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
