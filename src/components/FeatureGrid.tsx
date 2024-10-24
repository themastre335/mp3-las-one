import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Music2, Zap, Download } from 'lucide-react';

export function FeatureGrid() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Music2 className="w-8 h-8" />,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/10 transition"
        >
          <div className="flex justify-center mb-4 text-purple-400">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}