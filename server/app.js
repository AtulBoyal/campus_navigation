const express = require('express');
const cors = require('cors');

const mapRoutes = require("./routes/mapRoutes");

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: process.env.FRONTEND_URL, // This line uses the environment variable
  credentials: true // Set to true if your frontend needs to send cookies/credentials
}));

app.use(express.json());

app.use("/api/map", mapRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
});
