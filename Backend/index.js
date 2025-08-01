// Establishing Connectin 
const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const { Log } = require('./logger.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const urlDatabase = {};

// POST URL
app.post('/shorturls', (req, res) => {
  const { url } = req.body;
  if (!url) {
    Log('backend', 'warn', 'controller', 'URL is required');
    return res.status(400).json({ error: 'URL is required' });
  }

  const id = nanoid(7);
  urlDatabase[id] = { originalUrl: url, shortcode: id, clicks: 0 };

  Log('backend', 'info', 'controller', `URL shortened: ${id}`);
  res.status(201).json({ shortlink: `http://localhost:${PORT}/${id}` });
});

// GET SHORT CODE

app.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = urlDatabase[shortcode];

  if (urlEntry) {
    urlEntry.clicks++;
    Log('backend', 'info', 'service', `Redirecting ${shortcode}`);
    return res.redirect(301, urlEntry.originalUrl);
  }
  return res.status(404).send('Not Found');
});

// GET SHORT URL
app.get('/shorturls/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = urlDatabase[shortcode];
  if (urlEntry) {
    Log('backend', 'info', 'service', `Stats for ${shortcode}`);
    return res.status(200).json(urlEntry);
  }
  return res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
