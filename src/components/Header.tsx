import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Music } from 'lucide-react';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <Music className="w-16 h-16 text-purple-400" />
      </div>
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl text-gray-300">{t('description')}</p>
    </header>
  );
}