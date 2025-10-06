const express = require('express');
const path = require('path');
const app = express();

// Use environment port or fallback to 3000
const PORT = process.env.PORT || 3000;

// Serve all static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Example: If you want a separate API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Fallback: serve index.html for any unmatched routes (optional, for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
