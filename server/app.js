const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Endpoint to get map data
app.get('/api/map', (req, res) => {
  const mapPath = path.join(__dirname, 'data', 'campusMap.json');
  fs.readFile(mapPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load map data' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Placeholder for other endpoints (routes, search, etc.)

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
