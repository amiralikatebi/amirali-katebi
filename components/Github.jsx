'use client';
import { useEffect, useState } from 'react';
import { Star, Calendar, User } from 'lucide-react';

export default function Github() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-medium px-4">
        Loading projects...
      </div>
    );

  if (!projects)
    return (
      <div className="text-center mt-20 text-lg font-medium px-4">
        No projects found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 font-sans px-4 sm:px-6">
      <ul className="space-y-6">
        {projects.map((proj) => (
          <li
            key={proj.id}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-full overflow-hidden break-words"
          >
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 hover:underline block max-w-full overflow-hidden break-words"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {proj.full_name}
            </a>

            <p
              className="mt-2 text-gray-600 dark:text-gray-300 break-words max-w-full"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {proj.description || 'No description available.'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Star className="w-4 h-4 text-yellow-500" />{' '}
                {proj.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="w-4 h-4" />{' '}
                {new Date(proj.last_updated).toLocaleDateString()}
              </span>
            </div>

            <a
              href={proj.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:underline"
            >
              <User className="w-5 h-5" />
              <img
                src={proj.owner.avatar_url}
                alt={proj.owner.login}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{proj.owner.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
