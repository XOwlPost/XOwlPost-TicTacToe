// Assuming you have obtained the initial access token and refresh token

const refreshToken = require('dotenv').config();


// Function to refresh the access token
async function refreshAccessToken() {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  };

  try {
    const response = await fetch(tokenEndpoint, options);
    const data = await response.json();

    // Update the access token with the new value
    const accessToken = data.access_token;

    // Continue making API requests using the new access token
    // Your code here...
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

// Example usage
refreshAccessToken();
