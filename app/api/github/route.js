let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 دقیقه

export async function GET() {
  const now = Date.now();

  if (cache && now - cacheTime < CACHE_DURATION) {
    return new Response(JSON.stringify(cache), { status: 200 });
  }

  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=nextjs+OR+react+OR+python+OR+javascript+pushed:>2024-04-01&sort=stars&order=desc&per_page=20',
      {
        headers: {
          'User-Agent': 'MyApp',
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ message: 'Error fetching data from GitHub' }),
        { status: response.status }
      );
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

    cache = projects;
    cacheTime = now;

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      { status: 500 }
    );
  }
}
