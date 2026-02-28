// Minimal Express server to proxy OpenAI and fetch Wikipedia/Wikidata
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // serve frontend files from /public

// Wikipedia summary endpoint
app.get('/api/wiki', async (req, res) => {
  const q = req.query.query || '';
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
  const r = await fetch(url);
  if (!r.ok) return res.status(500).json({error:'Wikipedia fetch failed'});
  const data = await r.json();
  res.json({title: data.title, extract: data.extract});
});

// Wikidata search (basic)
app.get('/api/wikidata', async (req, res) => {
  const q = req.query.query || '';
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&format=json`;
  const r = await fetch(url);
  const data = await r.json();
  const first = data.search && data.search[0];
  if (!first) return res.json({});
  // fetch entity details
  const entityUrl = `https://www.wikidata.org/wiki/Special:EntityData/${first.id}.json`;
  const ent = await fetch(entityUrl).then(r=>r.json());
  res.json({id:first.id, description:first.description || '', entity: ent});
});

// Chat proxy to OpenAI (example using fetch to OpenAI REST)
app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt || '';
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({error:'Server missing OPENAI_API_KEY'});
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // example; choose appropriate model
        messages: [{role:'user', content: prompt}],
        max_tokens: 600
      })
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || 'No reply';
    res.json({reply});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
