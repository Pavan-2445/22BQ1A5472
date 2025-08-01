// /Frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Log } from './logger';
import { Box, TextField, Button, Typography, Link, Container, Paper } from '@mui/material';

const API_URL = 'http://localhost:3001';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }
    await Log('frontend', 'info', 'component', 'User submitted a URL.');
    try {
      const response = await axios.post(`${API_URL}/shorturls`, { url: longUrl });
      setResults([...results, response.data]);
      setLongUrl('');
      await Log('frontend', 'info', 'api', 'Successfully shortened URL.');
    } catch (err) {
      setError('Failed to shorten URL.');
      await Log('frontend', 'error', 'api', 'Shorten URL API call failed.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Enter Long URL"
            variant="outlined"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Shorten
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Paper>

        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Results</Typography>
            {results.map((result, index) => (
              <Paper key={index} sx={{ p: 2, mt: 1, textAlign: 'left' }}>
                <Link href={result.shortlink} target="_blank">{result.shortlink}</Link>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
