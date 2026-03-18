'use client'
import { useLanguage } from '@/lib/LanguageContext';
import UnitInput from './component/home/UnitInput';
import { motion } from 'framer-motion';
import { FaBolt, FaLightbulb, FaHistory } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  const texts = [
    'FusionX Bill',
    'Electricity Estimator'
  ];

  // Colors for different parts
  const getColoredText = (text: string) => {
    if (text === 'FusionX Bill') {
      return (
        <>
          <span className="text-white">Fusion</span>
          <span className="text-blue-500">X</span>
          <span className="text-white"> </span>
          <span className="text-purple-500">Bill</span>
        </>
      );
    } else if (text === 'Electricity Estimator') {
      return (
        <>
          <span className="text-white">Electricity</span>
          <span className="text-white"> </span>
          <span className="text-green-500">Estimator</span>
        </>
      );
    }
    return <span className="text-white">{text}</span>;
  };

  // Typing Animation
  useEffect(() => {
    const currentText = texts[textIndex];
    
    if (!isDeleting && typedText.length < currentText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setTypedText(currentText.substring(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } 
    else if (!isDeleting && typedText.length === currentText.length) {
      // Pause at the end
      const timeout = setTimeout(() => {
        if (textIndex < texts.length - 1) {
          setIsDeleting(true);
        } else {
          // Last text completed, stop cursor
          setTypingComplete(true);
          setShowCursor(false);
        }
      }, 2000); // 2 second pause
      return () => clearTimeout(timeout);
    }
    else if (isDeleting && typedText.length > 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setTypedText(currentText.substring(0, typedText.length - 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    else if (isDeleting && typedText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [typedText, isDeleting, textIndex]);

  // Cursor blink (only during typing)
  useEffect(() => {
    if (typingComplete) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [typingComplete]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: FaBolt, titleEn: 'Accurate', titleUr: 'درست', descEn: 'NEPRA tariffs', descUr: 'نیپرا ٹیرف' },
    { icon: FaLightbulb, titleEn: 'Smart Tips', titleUr: 'مشورے', descEn: 'Save money', descUr: 'پیسے بچائیں' },
    { icon: FaHistory, titleEn: 'History', titleUr: 'تاریخ', descEn: 'Track bills', descUr: 'بل ٹریک کریں' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-4 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-6 border border-white/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <FaBolt className="text-5xl text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Multi-text Typing Animation with Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 min-h-20 flex items-center justify-center"
          >
            <span className="inline-block">
              {typedText && getColoredText(typedText)}
            </span>
            {showCursor && (
              <span className="ml-1 text-blue-500 animate-pulse">|</span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t('Pakistan\'s most accurate electricity bill estimator', 'پاکستان کا سب سے درست بجلی بل کیلکولیٹر')}
          </motion.p>

          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mt-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">{t('Live Rates', 'لائیو ریٹس')}</span>
          </motion.div>
        </motion.div>

        {/* Features with Hover Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 group-hover:border-transparent transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3"
                >
                  <feature.icon className="text-2xl text-blue-500" />
                </motion.div>
                
                <h3 className="text-white font-semibold text-center mb-1">
                  {t(feature.titleEn, feature.titleUr)}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {t(feature.descEn, feature.descUr)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Calculator Card with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ y: -5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            
            {/* Main Card */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
              {/* Shine Effect */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
              />
              
              <div className="p-6">
                <UnitInput />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}