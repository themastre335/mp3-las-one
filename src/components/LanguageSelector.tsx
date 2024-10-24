import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'es')}
        className="bg-white/10 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}