// /api/translate.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Check if the method is POST
  if (req.method === 'POST') {
    try {
      // Send the request to your Flask API on Render
      const response = await fetch('https://flasky-d9sr.onrender.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
        body: JSON.stringify(req.body),  // Forward the body from the React frontend to the Flask backend
      });

      // Parse the response from the Flask API
      const data = await response.json();

      // Send the data back to the React frontend
      return res.status(200).json(data);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // If the method is not POST, return method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
