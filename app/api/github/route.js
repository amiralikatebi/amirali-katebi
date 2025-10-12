
let cachedData = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 60;

export async function GET() {
  const now = Date.now();

  if (cachedData && now - cacheTime < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedData), { status: 200 });
  }

  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=nextjs+pushed:>2024-04-01&sort=stars&order=desc&per_page=20'
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ message: 'Error fetching data from GitHub' }), {
        status: response.status,
      });
    }

    const data = await response.json();

    const projects = data.items.map((repo) => ({
      id: repo.id,
      full_name: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      url: repo.html_url,
      last_updated: repo.pushed_at,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
      },
    }));

    cachedData = projects;
    cacheTime = now;

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      { status: 500 }
    );
  }
}
