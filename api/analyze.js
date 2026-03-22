export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backendUrl = process.env.API_BACKEND_URL;
  if (!backendUrl) {
    return res.status(500).json({ error: 'API_BACKEND_URL not configured' });
  }

  try {
    const response = await fetch(`${backendUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Forward CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Backend unreachable', detail: err.message });
  }
}
