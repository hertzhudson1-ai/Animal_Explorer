const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

// SECURITY FACTOR: Limit users to 60 searches per minute to prevent spam
const limiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 60,
  message: { error: 'Too many searches. Please wait a minute before trying again.' }
});

app.use('/api/search', limiter);

/**
 * SEARCH ENDPOINT
 * This receives the animal query from the frontend and asks Bing for results.
 */
app.post('/api/search', async (req, res) => {
  const q = req.body.q || '';
  
  // Validation Factor: Ensure the query isn't empty
  if (!q) {
    return res.status(400).json({ error: 'Please provide an animal to search for.' });
  }

  const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
  const params = new URLSearchParams({ q: `${q} wildlife biology facts`, count: '5' });

  try {
    // API Call Factor: Securely use the BING_KEY from environment variables
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: { 'Ocp-Apim-Subscription-Key': process.env.BING_KEY }
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Search provider is currently unavailable.' });
    }

    const data = await response.json();
    
    // Clean up the data to send only what the student needs
    const simplifiedResults = data.webPages?.value.map(page => ({
      title: page.name,
      url: page.url,
      snippet: page.snippet
    })) || [];

    res.json({ results: simplifiedResults });

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error occurred while searching.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Wildlife Search Proxy running on port ${PORT}`);
});
