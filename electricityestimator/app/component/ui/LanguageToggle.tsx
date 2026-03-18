'use client'
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
    >
      <FaGlobe className="text-blue-400" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'اردو' : 'English'}
      </span>
    </button>
  );
}