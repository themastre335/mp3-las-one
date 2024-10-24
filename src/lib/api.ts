import axios from 'axios';

const YOUTUBE_API_KEY = 'AIzaSyDEewlOHkLqScZWUHvOZz_C5_74VSCQG4s';

interface VideoDetails {
  title: string;
  thumbnail: string;
  duration: string;
  channelTitle: string;
  publishedAt: string;
}

interface ConversionResponse {
  downloadUrl: string;
  status: string;
  videoDetails: VideoDetails;
}

function extractVideoId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  if (!match) throw new Error('Invalid YouTube URL');
  return match[1];
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  
  if (hours) {
    parts.push(hours.padStart(2, '0'));
  }
  parts.push((minutes || '0').padStart(2, '0'));
  parts.push((seconds || '0').padStart(2, '0'));
  
  return parts.join(':');
}

async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const video = response.data.items[0];
    if (!video) {
      throw new Error('Video not found');
    }

    // Create a plain object without any non-cloneable properties
    const details: VideoDetails = {
      title: String(video.snippet.title),
      thumbnail: String(video.snippet.thumbnails.maxres?.url || 
                video.snippet.thumbnails.high?.url || 
                video.snippet.thumbnails.default.url),
      duration: formatDuration(String(video.contentDetails.duration)),
      channelTitle: String(video.snippet.channelTitle),
      publishedAt: String(video.snippet.publishedAt),
    };

    return details;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('YouTube API quota exceeded');
      }
      if (error.response?.status === 404) {
        throw new Error('Video not found');
      }
    }
    throw new Error('Failed to fetch video details');
  }
}

export async function convertVideo(url: string): Promise<ConversionResponse> {
  try {
    const videoId = extractVideoId(url);
    const videoDetails = await getVideoDetails(videoId);

    // Simulate MP3 conversion since we don't have a working conversion API
    // In a production environment, you would integrate with a proper conversion service
    const downloadUrl = `https://music.youtube.com/watch?v=${videoId}`;
    
    return {
      downloadUrl,
      status: 'success',
      videoDetails,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(errorMessage);
  }
}