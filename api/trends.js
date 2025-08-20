// api/trends.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const response = await fetch('https://twitter-trends5.p.rapidapi.com/twitter/request.php', {
    method: 'POST',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // secret key
      'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ woeid: '23424934' })
  });

  const data = await response.json();
  res.status(200).json(data);
}
