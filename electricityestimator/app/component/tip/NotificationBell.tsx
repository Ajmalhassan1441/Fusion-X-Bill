'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { FaBell } from 'react-icons/fa';
import { Tip } from '@/lib/tips';

interface NotificationBellProps {
  unreadCount: number;
  onOpen?: () => void;
}

export default function NotificationBell({ unreadCount, onOpen }: NotificationBellProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  return (
    <button
      onClick={onOpen}
      className="relative group"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur transition duration-500" />
      <div className="relative">
        <FaBell 
          className={`text-2xl text-gray-400 group-hover:text-white transition-colors ${
            isAnimating ? 'animate-bounce' : ''
          }`} 
        />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
          >
            {unreadCount}
          </motion.div>
        )}
      </div>
    </button>
  );
}