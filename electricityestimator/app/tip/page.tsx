'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { getRelevantTips, Tip, calculateTotalSavings } from '@/lib/tips';
import { loadLastCalculation } from '@/lib/storage';
import TipCard from '../component/tip/TipCard';
import Card from '../component/ui/Card';
import { 
  FaLightbulb, 
  FaChartLine, 
  FaBell, 
  FaCheckCircle,
  FaBolt,
  FaCrown,
  FaGem,
  FaArrowRight,
  FaClock,
  FaLeaf,
  FaWallet,
  FaTrophy
} from 'react-icons/fa';

export default function TipsPage() {
  const { t, language } = useLanguage();
  const [tips, setTips] = useState<Tip[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Typing Animation States
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    { en: 'Smart', ur: 'سمارٹ' },
    { en: 'Tips', ur: 'مشورے' }
  ];

  // Typing Animation
  useEffect(() => {
    const currentText = language === 'en' ? texts[0].en : texts[0].ur;
    const currentText2 = language === 'en' ? texts[1].en : texts[1].ur;
    
    // First text typing
    if (!isDeleting && typedText1.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText1(currentText.substring(0, typedText1.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } 
    else if (!isDeleting && typedText1.length === currentText.length) {
      // First text complete, start second text
      if (typedText2.length < currentText2.length) {
        const timeout = setTimeout(() => {
          setTypedText2(currentText2.substring(0, typedText2.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText1, typedText2, isDeleting, language]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor1(prev => !prev);
      setShowCursor2(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

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

  useEffect(() => {
    // Load last calculation from storage
    const lastCalc = loadLastCalculation();
    
    if (lastCalc) {
      const relevantTips = getRelevantTips(lastCalc.units, []);
      setTips(relevantTips);
      setTotalSavings(calculateTotalSavings(relevantTips));
    } else {
      // Default tips if no calculation
      setTips(getRelevantTips(250, []));
    }
  }, []);

  const dismissTip = (tipId: string) => {
    setTips(tips.filter(t => t.id !== tipId));
  };

  const markAllRead = () => {
    setTips([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-24 pb-16 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute top-20 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Premium Header with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <FaLightbulb className="text-3xl" />
            </div>
          </motion.div>

          {/* Typing Animation Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center flex-wrap"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {typedText1}
            </span>
            {showCursor1 && typedText1.length < (language === 'en' ? texts[0].en.length : texts[0].ur.length) && (
              <span className="ml-1 text-yellow-500 animate-pulse">|</span>
            )}
            <span className="mx-2 text-white"> </span>
            <span className="text-white">
              {typedText2}
            </span>
            {showCursor2 && typedText2.length < (language === 'en' ? texts[1].en.length : texts[1].ur.length) && (
              <span className="ml-1 text-orange-500 animate-pulse">|</span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t(
              'Save money with personalized electricity-saving tips',
              'ذاتی نوعیت کے بجلی بچانے کے مشوروں سے پیسے بچائیں'
            )}
          </motion.p>

          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mt-6"
          >
            <FaCrown className="text-yellow-500" />
            <span className="text-sm text-gray-300">
              {t('AI-Powered Suggestions', 'اے آئی سے چلنے والے مشورے')}
            </span>
            <FaGem className="text-orange-400" />
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-xl text-blue-500" />
                </div>
                <p className="text-gray-400">{t('Active Tips', 'فعال مشورے')}</p>
              </div>
              <motion.p
                key={tips.length}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-white"
              >
                {tips.length}
              </motion.p>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FaWallet className="text-xl text-green-500" />
                </div>
                <p className="text-gray-400">{t('Potential Savings', 'ممکنہ بچت')}</p>
              </div>
              <motion.p
                key={totalSavings}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-green-400"
              >
                Rs {totalSavings}
              </motion.p>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <FaLeaf className="text-xl text-yellow-500" />
                </div>
                <p className="text-gray-400">{t('Environment', 'ماحول')}</p>
              </div>
              <p className="text-3xl font-bold text-yellow-500">
                {tips.length * 50} kg
              </p>
              <p className="text-xs text-gray-500">CO₂ {t('Saved', 'بچت')}</p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tips List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white flex items-center gap-2"
            >
              <FaTrophy className="text-yellow-500" />
              {t('Recommended for You', 'آپ کے لیے تجاویز')}
            </motion.h2>
            {tips.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllRead}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                {t('Mark all as read', 'سب پڑھ لیا')}
                <FaArrowRight className="text-xs" />
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {tips.length > 0 ? (
              tips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <TipCard
                    tip={tip}
                    onDismiss={() => dismissTip(tip.id)}
                    onMarkRead={() => dismissTip(tip.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-12 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-6xl mb-4 opacity-30 inline-block"
                  >
                    💡
                  </motion.div>
                  <p className="text-gray-400 text-lg mb-2">
                    {t(
                      'No tips for now',
                      'ابھی کوئی مشورے نہیں'
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(
                      'Check back after using the calculator!',
                      'کیلکولیٹر استعمال کرنے کے بعد دوبارہ آئیں!'
                    )}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Tip of the Day */}
        {tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <FaClock className="text-yellow-500" />
                </div>
                <p className="text-sm text-gray-300">
                  {t(
                    'Tip of the Day: Unplug chargers when not in use. They still consume standby power!',
                    'آج کا مشورہ: چارجر استعمال میں نہ ہوں تو نکال دیں۔ وہ اسٹینڈ بائی میں بھی بجلی استعمال کرتے ہیں!'
                  )}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}