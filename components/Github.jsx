return (
  <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 font-sans">
    <ul className="space-y-6">
      {projects.map((proj) => (
        <li
          key={proj.id}
          className="p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-semibold text-blue-600 hover:underline break-words"
          >
            {proj.full_name}
          </a>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {proj.description || 'No description available.'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> {proj.stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {new Date(proj.last_updated).toLocaleDateString()}
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
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <span className="font-medium text-sm sm:text-base">{proj.owner.login}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
