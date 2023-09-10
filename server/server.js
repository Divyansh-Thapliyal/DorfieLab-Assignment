const express = require('express');
const axios = require('axios'); // Import Axios
const app = express();
const port = 5000; // You can choose any available port

// Middleware to enable CORS (for development purposes; tighten CORS settings for production)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to fetch countries from the external API using Axios
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get('https://d32sbion19muhj.cloudfront.net/pub/interview/countries');

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
