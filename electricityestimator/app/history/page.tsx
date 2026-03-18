'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { loadHistory, saveHistory, clearHistory, CalculationHistory } from '@/lib/storage';
import { formatCurrency } from '@/lib/format';
import Card from '../component/ui/Card';
import { 
  FaHistory, 
  FaChartLine, 
  FaCalendarAlt, 
  FaTrash, 
  FaEye,
  FaArrowRight,
  FaCrown,
  FaGem,
  FaClock,
  FaDownload,
  FaChartBar,
  FaFileInvoice,
  FaBolt
} from 'react-icons/fa';

export default function HistoryPage() {
  const { t, language } = useLanguage();
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Typing Animation States
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);

  const texts = [
    { en: 'Bill', ur: 'بل' },
    { en: 'History', ur: 'تاریخ' }
  ];

  // Typing Animation
  useEffect(() => {
    const currentText = language === 'en' ? texts[0].en : texts[0].ur;
    const currentText2 = language === 'en' ? texts[1].en : texts[1].ur;
    
    if (typedText1.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText1(currentText.substring(0, typedText1.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText1.length === currentText.length && typedText2.length < currentText2.length) {
      const timeout = setTimeout(() => {
        setTypedText2(currentText2.substring(0, typedText2.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText1, typedText2, language]);

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
    // Load history from storage
    const savedHistory = loadHistory();
    setHistory(savedHistory);
  }, []);

  const handleDelete = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const handleClearAll = () => {
    setHistory([]);
    clearHistory();
  };

  const handleViewDetails = (id: string) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <FaHistory className="text-3xl" />
            </div>
          </motion.div>

          {/* Typing Animation Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center flex-wrap"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {typedText1}
            </span>
            {showCursor1 && typedText1.length < (language === 'en' ? texts[0].en.length : texts[0].ur.length) && (
              <span className="ml-1 text-blue-500 animate-pulse">|</span>
            )}
            <span className="mx-2 text-white"> </span>
            <span className="text-white">
              {typedText2}
            </span>
            {showCursor2 && typedText2.length < (language === 'en' ? texts[1].en.length : texts[1].ur.length) && (
              <span className="ml-1 text-purple-500 animate-pulse">|</span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t(
              'Track all your previous electricity bill calculations',
              'اپنے تمام پچھلے بجلی بلوں کا حساب دیکھیں'
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
              {t('Calculation History', 'حساب کی تاریخ')}
            </span>
            <FaGem className="text-blue-400" />
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
                  <FaFileInvoice className="text-xl text-blue-500" />
                </div>
                <p className="text-gray-400">{t('Total Bills', 'کل بل')}</p>
              </div>
              <p className="text-3xl font-bold text-white">{history.length}</p>
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
                  <FaChartBar className="text-xl text-green-500" />
                </div>
                <p className="text-gray-400">{t('Average Bill', 'اوسط بل')}</p>
              </div>
              <p className="text-3xl font-bold text-green-400">
                {history.length > 0 
                  ? formatCurrency(history.reduce((sum, item) => sum + item.total, 0) / history.length)
                  : formatCurrency(0)}
              </p>
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
                  <FaBolt className="text-xl text-yellow-500" />
                </div>
                <p className="text-gray-400">{t('Total Units', 'کل یونٹس')}</p>
              </div>
              <p className="text-3xl font-bold text-yellow-500">
                {history.reduce((sum, item) => sum + item.units, 0).toFixed(0)} kWh
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* History List */}
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
              <FaCalendarAlt className="text-blue-500" />
              {t('Previous Calculations', 'پچھلے حساب')}
            </motion.h2>
            {history.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearAll}
                className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
              >
                <FaTrash className="text-xs" />
                {t('Clear All', 'سب ہٹائیں')}
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {history.length > 0 ? (
              history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                  
                  <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
                          📊
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <FaClock className="text-xs" />
                            {formatDate(item.createdAt)}
                          </p>
                          <p className="text-white font-semibold mt-1">
                            {item.units} {t('Units', 'یونٹس')}
                          </p>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">{t('Total Bill', 'کل بل')}</p>
{item.energyCharges ? formatCurrency(item.energyCharges) : formatCurrency(0)}
                        </div>
                        
                        <button
                          onClick={() => handleViewDetails(item.id)}
                          className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all group/btn"
                        >
                          <FaEye className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all group/btn"
                        >
                          <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details - with safe check */}
                    <AnimatePresence>
                      {selectedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-700/50">
                            <h5 className="text-sm text-gray-400 mb-3">{t('Details', 'تفصیل')}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-xs p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-500">{t('Energy Charges', 'انرجی چارجز')}:</span>
                                <p className="text-blue-400 mt-1">{formatCurrency(item.energyCharges)}</p>
                              </div>
                              <div className="text-xs p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-500">{t('GST', 'جی ایس ٹی')}:</span>
                                <p className="text-blue-400 mt-1">{formatCurrency(item.gst)}</p>
                              </div>
                              <div className="text-xs p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-500">{t('Meter Rent', 'میٹر کرایہ')}:</span>
                                <p className="text-blue-400 mt-1">{formatCurrency(item.meterRent)}</p>
                              </div>
                              <div className="text-xs p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-500">{t('TV Fee', 'ٹی وی فیس')}:</span>
                                <p className="text-blue-400 mt-1">{formatCurrency(item.tvFee)}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                    📜
                  </motion.div>
                  <p className="text-gray-400 text-lg mb-2">
                    {t(
                      'No history yet',
                      'ابھی کوئی تاریخ نہیں'
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(
                      'Use the calculator to save your first bill!',
                      'اپنا پہلا بل بچانے کے لیے کیلکولیٹر استعمال کریں!'
                    )}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}