import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { url } = JSON.parse(event.body || '{}');
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' })
      };
    }

    const response = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
      params: { url },
      headers: {
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to convert video' })
    };
  }
};

export { handler };