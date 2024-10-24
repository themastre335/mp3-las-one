import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, Music2, Clock, AlertCircle } from 'lucide-react';

interface VideoDetails {
  title: string;
  thumbnail: string;
  duration: string;
  channelTitle: string;
  publishedAt: string;
}

interface ConverterFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  downloadUrl: string;
  videoDetails?: VideoDetails | null;
  error?: string;
}

export function ConverterForm({ onSubmit, loading, downloadUrl, videoDetails, error }: ConverterFormProps) {
  const [url, setUrl] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(url);
    } catch (err) {
      console.error('Conversion error:', err);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-2">
            {t('urlLabel')}
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('urlPlaceholder')}
            className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? t('converting') : t('convert')}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {videoDetails && (
        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <div className="flex gap-4 items-start">
            <div className="relative flex-shrink-0">
              <img 
                src={videoDetails.thumbnail} 
                alt={videoDetails.title}
                className="w-32 h-auto rounded-md"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {videoDetails.duration}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{videoDetails.title}</h3>
              <p className="text-sm text-gray-300 mb-1">{videoDetails.channelTitle}</p>
              <p className="text-sm text-gray-400">
                {new Date(videoDetails.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {downloadUrl && (
        <div className="mt-6 text-center">
          <p className="mb-4">{t('downloadReady')}</p>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-2 bg-green-500 py-2 px-6 rounded-lg hover:bg-green-600 transition"
          >
            <Download className="w-5 h-5" />
            {t('download')}
          </a>
        </div>
      )}
    </div>
  );
}