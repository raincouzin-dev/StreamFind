export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { query, type = 'multi' } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const key = process.env.TMDB_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured' });

  const endpoint = type === 'multi' ? 'search/multi' : `search/${type}`;
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${key}&query=${encodeURIComponent(query)}&include_adult=false`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
}
