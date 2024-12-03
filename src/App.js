const express = require('express');
const axios = require('axios');
const app = express();

// Use the port specified by Vercel or fallback to 5001 for local development
const port = process.env.PORT || 5001;

// Middleware to parse JSON bodies (built into Express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle the request from React frontend
app.post('/translate', async (req, res) => {
  try {
    // Forward the image data to the Flask backend
    const response = await axios.post('https://flasky-d9sr.onrender.com/translate', req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Return the response from Flask backend to React frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error in middleman server:', error);
    res.status(500).json({ error: 'Something went wrong with the translation.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Middleman server is running on port ${port}`);
});
