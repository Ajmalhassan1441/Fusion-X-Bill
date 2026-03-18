'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Card from '../component/ui/Card';
import { 
  FaQuestionCircle,
  FaCrown,
  FaGem,
  FaHome,
  FaCalculator,
  FaLightbulb,
  FaHistory,
  FaCog,
//   FaHelpCircle,
  FaArrowRight,
  FaCheckCircle,
  FaPlayCircle,
  FaBookOpen,
  FaVideo,
  FaFileAlt,
  FaHeadset
} from 'react-icons/fa';

export default function HelpPage() {
  const { t, language } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Typing Animation States
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);

  const texts = [
    { en: 'Help', ur: 'مدد' },
    { en: 'Guide', ur: 'رہنما' }
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

  const sections = [
    {
      id: 'home',
      icon: FaHome,
      titleEn: 'Home Page',
      titleUr: 'ہوم پیج',
      descEn: 'Quick unit calculator. Enter your electricity units and get instant bill estimate with complete breakdown.',
      descUr: 'فوری یونٹ کیلکولیٹر۔ اپنے بجلی کے یونٹس ڈالیں اور فوری بل کا تخمینہ حاصل کریں۔',
      features: [
        { en: 'Direct units input', ur: 'براہ راست یونٹس' },
        { en: 'Real-time calculation', ur: 'فوری حساب' },
        { en: 'Slab-wise breakdown', ur: 'سلیب کی تفصیل' },
        { en: 'Taxes included', ur: 'ٹیکس سمیت' }
      ],
      color: 'blue',
      example: '500 units = Rs 8,559'
    },
    {
      id: 'calculator',
      icon: FaCalculator,
      titleEn: 'Appliance Calculator',
      titleUr: 'آلات کیلکولیٹر',
      descEn: 'Calculate bill for each appliance separately. Add multiple appliances with quantity and hours.',
      descUr: 'ہر آلے کا الگ بل نکالیں۔ تعداد اور گھنٹوں کے ساتھ کئی آلات شامل کریں۔',
      features: [
        { en: '30+ appliances', ur: '30+ آلات' },
        { en: 'Voice input support', ur: 'آواز سے ان پٹ' },
        { en: 'Monthly consumption', ur: 'ماہانہ استعمال' },
        { en: 'Appliance-wise cost', ur: 'آلے کا الگ خرچ' }
      ],
      color: 'purple',
      example: 'AC 8h/day × 30 days = Rs 4,500'
    },
    {
      id: 'tips',
      icon: FaLightbulb,
      titleEn: 'Smart Tips',
      titleUr: 'سمارٹ مشورے',
      descEn: 'Personalized tips to save electricity and money. Get alerts for peak hours and slab warnings.',
      descUr: 'بجلی اور پیسے بچانے کے ذاتی مشورے۔ پیک اوقات اور سلیب کی تنبیہ۔',
      features: [
        { en: 'Savings calculator', ur: 'بچت کا حساب' },
        { en: 'Peak hour alerts', ur: 'پیک اوقات الرٹ' },
        { en: 'Appliance tips', ur: 'آلات کے مشورے' },
        { en: 'Monthly targets', ur: 'ماہانہ اہداف' }
      ],
      color: 'yellow',
      example: 'Save up to Rs 2,500/month'
    },
    {
      id: 'history',
      icon: FaHistory,
      titleEn: 'History',
      titleUr: 'تاریخ',
      descEn: 'Track all your previous calculations. Compare monthly bills and analyze your usage.',
      descUr: 'اپنے پچھلے تمام حساب دیکھیں۔ ماہانہ بلوں کا موازنہ کریں۔',
      features: [
        { en: 'Save calculations', ur: 'حساب محفوظ کریں' },
        { en: 'Monthly comparison', ur: 'ماہانہ موازنہ' },
        { en: 'Detailed breakdown', ur: 'تفصیلی حساب' },
        { en: 'Export data', ur: 'ڈیٹا برآمد کریں' }
      ],
      color: 'green',
      example: 'Last 3 months: +15% increase'
    },
    {
      id: 'settings',
      icon: FaCog,
      titleEn: 'Settings',
      titleUr: 'سیٹنگز',
      descEn: 'Customize tariff rates, taxes, and charges. Update slabs according to your provider.',
      descUr: 'ٹیرف ریٹس، ٹیکسز اور چارجز تبدیل کریں۔ اپنے فراہم کنندہ کے مطابق سلیب اپ ڈیٹ کریں۔',
      features: [
        { en: 'Edit slab rates', ur: 'سلیب ریٹس تبدیل کریں' },
        { en: 'Tax customization', ur: 'ٹیکس کی تخصیص' },
        { en: 'Language toggle', ur: 'زبان تبدیل' },
        { en: 'Reset to default', ur: 'ڈیفالٹ پر واپس' }
      ],
      color: 'pink',
      example: 'GST: 17% → 18%'
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'purple': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      case 'yellow': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 'green': return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'pink': return 'from-pink-500/20 to-pink-600/20 border-pink-500/30';
      default: return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
    }
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
          className="absolute bottom-20 -right-20 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <FaQuestionCircle className="text-3xl" />
            </div>
          </motion.div>

          {/* Typing Animation Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center flex-wrap"
          >
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
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
              <span className="ml-1 text-green-500 animate-pulse">|</span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t(
              'Complete guide to using FusionX Bill calculator',
              'فیوژن ایکس بل کیلکولیٹر استعمال کرنے کی مکمل رہنما'
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
              {t('User Guide', 'صارف رہنما')}
            </span>
            <FaGem className="text-green-400" />
          </motion.div>
        </motion.div>

        {/* Quick Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center">
              <FaPlayCircle className="text-4xl text-blue-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{t('Quick Start', 'فوری شروع')}</h3>
              <p className="text-sm text-gray-400">{t('5 minutes to master', '5 منٹ میں ماہر')}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 text-center">
              <FaBookOpen className="text-4xl text-green-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{t('Tutorials', 'سبق')}</h3>
              <p className="text-sm text-gray-400">{t('Step by step', 'قدم بہ قدم')}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
            <Card className="relative p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-center">
              <FaHeadset className="text-4xl text-yellow-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{t('Support', 'مدد')}</h3>
              <p className="text-sm text-gray-400">{t('24/7 available', 'ہر وقت')}</p>
            </Card>
          </motion.div>
        </div>

        {/* Sections List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            {t('Detailed Guides', 'تفصیلی رہنما')}
          </h2>

          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${getColorClasses(section.color)} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
                
                <div className={`relative bg-gradient-to-br ${getColorClasses(section.color)} backdrop-blur-sm p-6 rounded-xl border ${section.color === 'blue' ? 'border-blue-500/30' : section.color === 'purple' ? 'border-purple-500/30' : section.color === 'yellow' ? 'border-yellow-500/30' : section.color === 'green' ? 'border-green-500/30' : 'border-pink-500/30'}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gray-800/50 rounded-xl flex items-center justify-center text-3xl">
                      <section.icon className={`text-${section.color}-500`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {language === 'en' ? section.titleEn : section.titleUr}
                        </h3>
                        <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                          {t('Guide', 'رہنما')}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mb-4">
                        {language === 'en' ? section.descEn : section.descUr}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {section.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <FaCheckCircle className={`text-${section.color}-400 text-xs`} />
                            <span>{language === 'en' ? feature.en : feature.ur}</span>
                          </div>
                        ))}
                      </div>

                      {/* Example */}
                      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                        <p className="text-xs text-gray-500 mb-1">{t('Example', 'مثال')}</p>
                        <p className={`text-sm text-${section.color}-400 font-medium`}>{section.example}</p>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                        className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        {selectedSection === section.id 
                          ? t('Show Less', 'کم دکھائیں')
                          : t('View Full Guide', 'مکمل رہنما دیکھیں')}
                        <FaArrowRight className={`text-xs transition-transform ${selectedSection === section.id ? 'rotate-90' : ''}`} />
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {selectedSection === section.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-700/50">
                              <h4 className="text-sm text-gray-300 mb-3">{t('How to use', 'استعمال کا طریقہ')}</h4>
                              <div className="space-y-2 text-sm text-gray-400">
                                <p>• {t('Step 1: Navigate to', 'مرحلہ 1:')} {language === 'en' ? section.titleEn : section.titleUr}</p>
                                <p>• {t('Step 2: Enter your data', 'مرحلہ 2: اپنا ڈیٹا داخل کریں')}</p>
                                <p>• {t('Step 3: Click calculate', 'مرحلہ 3: کیلکولیٹ بٹن دبائیں')}</p>
                                <p>• {t('Step 4: View results', 'مرحلہ 4: نتائج دیکھیں')}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}