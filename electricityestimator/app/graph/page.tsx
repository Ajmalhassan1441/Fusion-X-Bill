'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { loadHistory } from '@/lib/storage';
import { generateGraphData, calculateStats, GraphDataPoint } from '@/lib/graphData';
import Bar3D from '../component/graph/Bar3D';
import StatsCards from '../component/graph/StatsCards';
import Card from '../component/ui/Card';
import { 
  FaChartLine,
  FaCrown,
  FaGem,
  FaHistory,
  FaCalendarAlt
} from 'react-icons/fa';

export default function GraphPage() {
  const { t } = useLanguage();
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Typing Animation States
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);

  const texts = [
    { en: '3D', ur: 'تھری ڈی' },
    { en: 'Graph', ur: 'گراف' }
  ];

  // Typing Animation
  useEffect(() => {
    const currentText = texts[0].en;
    const currentText2 = texts[1].en;
    
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
  }, [typedText1, typedText2]);

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
    const history = loadHistory();
    const data = generateGraphData(history);
    setGraphData(data);
    setStats(calculateStats(data));
  }, []);

  const maxValue = Math.max(...graphData.map(item => item.amount));

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
        {/* Premium Header */}
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
              <FaChartLine className="text-3xl" />
            </div>
          </motion.div>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center flex-wrap"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {typedText1}
            </span>
            {showCursor1 && <span className="ml-1 text-blue-500 animate-pulse">|</span>}
            <span className="mx-2 text-white"> </span>
            <span className="text-white">
              {typedText2}
            </span>
            {showCursor2 && <span className="ml-1 text-purple-500 animate-pulse">|</span>}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t(
              'Visualize your electricity bills in 3D',
              'اپنے بجلی کے بلوں کو تھری ڈی میں دیکھیں'
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
              {t('3D Visualization', 'تھری ڈی ویژولائزیشن')}
            </span>
            <FaGem className="text-blue-400" />
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* 3D Graph */}
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-blue-500" />
            <h2 className="text-xl font-bold text-white">
              {t('Monthly Comparison', 'ماہانہ موازنہ')}
            </h2>
          </div>

          {graphData.length > 0 ? (
            <div className="flex items-end justify-center gap-2 min-h-[300px] overflow-x-auto pb-4">
              {graphData.map((_, index) => (
                <Bar3D
                  key={index}
                  data={graphData}
                  maxValue={maxValue}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">{t('No data available', 'کوئی ڈیٹا نہیں')}</p>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs text-gray-400">{t('Monthly Bill', 'ماہانہ بل')}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400 text-xs" />
              <span className="text-xs text-gray-400">{t('Last 12 months', 'پچھلے 12 ماہ')}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}