// server.js
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

const limiter = rateLimit({ windowMs: 60_000, max: 60 });
app.use('/api/search', limiter);

app.post('/api/search', async (req, res) => {
  const q = req.body.q || '';
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
  const params = new URLSearchParams({ q, count: '10' });

  try {
    const r = await fetch(`${endpoint}?${params.toString()}`, {
      headers: { 'Ocp-Apim-Subscription-Key': process.env.BING_KEY }
    });
    if (!r.ok) return res.status(502).json({ error: 'Search provider error' });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Search proxy running on :3000'));
