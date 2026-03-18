'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { loadTariff, saveTariff } from '@/lib/storage';
import { DEFAULT_TARIFF } from '@/lib/constants';
import { Tariff } from '@/lib/types';
import Card from '../component/ui/Card';
import { 
  FaCog, 
  FaSave, 
  FaUndo, 
  FaCrown,
  FaGem,
  FaBolt,
  FaPercentage,
  FaRupeeSign,
  FaChartLine,
  FaClock,
  FaTv,
  FaHome,
  FaCheckCircle,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function SettingsPage() {
  const { t, language } = useLanguage();
  const [tariff, setTariff] = useState<Tariff>(DEFAULT_TARIFF);
  const [saved, setSaved] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Typing Animation States
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);

  const texts = [
    { en: 'Tariff', ur: 'ٹیرف' },
    { en: 'Settings', ur: 'سیٹنگز' }
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
    // Load tariff from storage
    const savedTariff = loadTariff();
    setTariff(savedTariff);
  }, []);

  const handleSlabChange = (index: number, field: 'upTo' | 'rate', value: string) => {
    const newTariff = { ...tariff };
    const numValue = field === 'upTo' ? parseInt(value) : parseFloat(value);
    
    if (!isNaN(numValue)) {
      if (field === 'upTo') {
        newTariff.slabs[index].upTo = numValue;
      } else {
        newTariff.slabs[index].rate = numValue;
      }
      setTariff(newTariff);
    }
  };

  const handleExtraChargeChange = (
    field: 'meterRent' | 'tvFee' | 'gstPercent' | 'dutyPercent',
    value: string
  ) => {
    const newTariff = { ...tariff };
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      if (field === 'meterRent') {
        newTariff.meterRent = numValue;
      } else if (field === 'tvFee') {
        newTariff.tvFee = numValue;
      } else if (field === 'gstPercent') {
        newTariff.gstPercent = numValue;
      } else if (field === 'dutyPercent') {
        newTariff.dutyPercent = numValue;
      }
      setTariff(newTariff);
    }
  };

  const handleSave = () => {
    saveTariff(tariff);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setTariff(DEFAULT_TARIFF);
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
          className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
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

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <FaCog className="text-3xl" />
            </div>
          </motion.div>

          {/* Typing Animation Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center flex-wrap"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              {typedText1}
            </span>
            {showCursor1 && typedText1.length < (language === 'en' ? texts[0].en.length : texts[0].ur.length) && (
              <span className="ml-1 text-purple-500 animate-pulse">|</span>
            )}
            <span className="mx-2 text-white"> </span>
            <span className="text-white">
              {typedText2}
            </span>
            {showCursor2 && typedText2.length < (language === 'en' ? texts[1].en.length : texts[1].ur.length) && (
              <span className="ml-1 text-pink-500 animate-pulse">|</span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t(
              'Customize your electricity tariff rates and charges',
              'اپنے بجلی کے ٹیرف ریٹس اور چارجز تبدیل کریں'
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
              {t('Admin Settings', 'ایڈمن سیٹنگز')}
            </span>
            <FaGem className="text-purple-400" />
          </motion.div>
        </motion.div>

        {/* Main Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75" />

          <Card className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50">
            {/* Slabs Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-purple-500" />
                {t('Slab Rates (Rs/unit)', 'سلیب ریٹس (روپے/یونٹ)')}
              </h3>

              <div className="space-y-3">
                {tariff.slabs.map((slab, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="relative">
                      <FaBolt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={slab.upTo === Infinity ? '' : slab.upTo}
                        onChange={(e) => handleSlabChange(index, 'upTo', e.target.value)}
                        placeholder={t('Up to (units)', 'تک (یونٹس)')}
                        disabled={index === tariff.slabs.length - 1}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {index === tariff.slabs.length - 1 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                          {t('Above', 'اس سے زیادہ')}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <FaMoneyBillWave className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={slab.rate}
                        onChange={(e) => handleSlabChange(index, 'rate', e.target.value)}
                        step="0.01"
                        placeholder={t('Rate (Rs)', 'ریٹ (روپے)')}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rs</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Extra Charges Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaPercentage className="text-pink-500" />
                {t('Extra Charges', 'اضافی چارجز')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meter Rent */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="relative"
                >
                  <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={tariff.meterRent}
                    onChange={(e) => handleExtraChargeChange('meterRent', e.target.value)}
                    placeholder={t('Meter Rent (Rs)', 'میٹر کرایہ (روپے)')}
                    step="1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rs</span>
                </motion.div>

                {/* TV Fee */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="relative"
                >
                  <FaTv className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={tariff.tvFee}
                    onChange={(e) => handleExtraChargeChange('tvFee', e.target.value)}
                    placeholder={t('TV Fee (Rs)', 'ٹی وی فیس (روپے)')}
                    step="1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rs</span>
                </motion.div>

                {/* GST Percent */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="relative"
                >
                  <FaPercentage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={tariff.gstPercent}
                    onChange={(e) => handleExtraChargeChange('gstPercent', e.target.value)}
                    placeholder={t('GST (%)', 'جی ایس ٹی (٪)')}
                    step="0.1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                </motion.div>

                {/* Duty Percent */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="relative"
                >
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={tariff.dutyPercent}
                    onChange={(e) => handleExtraChargeChange('dutyPercent', e.target.value)}
                    placeholder={t('Duty (%)', 'ڈیوٹی (٪)')}
                    step="0.1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
              >
                <FaSave className="group-hover:scale-110 transition-transform" />
                {t('Save Settings', 'سیٹنگز محفوظ کریں')}
              </button>

              <button
                onClick={handleReset}
                className="flex-1 bg-gray-800/50 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-gray-700/50 group"
              >
                <FaUndo className="group-hover:-rotate-180 transition-transform duration-500" />
                {t('Reset to Default', 'ڈیفالٹ پر ری سیٹ کریں')}
              </button>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400"
                >
                  <FaCheckCircle />
                  {t('Settings saved successfully!', 'سیٹنگز کامیابی سے محفوظ ہو گئیں!')}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}