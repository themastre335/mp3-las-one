import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/convert', authenticateToken, async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
      params: { url },
      headers: {
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert video' });
  }
});

// Simple auth endpoint (in production, use proper auth system)
app.post('/api/auth', (req, res) => {
  // Demo user authentication
  const token = jwt.sign({ id: 1, username: 'demo' }, process.env.JWT_SECRET);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});