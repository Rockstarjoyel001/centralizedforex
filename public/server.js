const express = require('express');
const path = require("path");
const app = express();

// Use environment port or fall back to 3000
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/FLAGS', express.static(path.join(__dirname, 'FLAGS')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
