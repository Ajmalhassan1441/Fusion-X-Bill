'use client'
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Tip } from '@/lib/tips';
import { FaBell, FaCheck, FaTimes, FaExclamationTriangle, FaLightbulb, FaInfoCircle, FaClock, FaLeaf } from 'react-icons/fa';

interface TipCardProps {
  tip: Tip;
  onDismiss?: () => void;
  onMarkRead?: () => void;
}

export default function TipCard({ tip, onDismiss, onMarkRead }: TipCardProps) {
  const { t, language } = useLanguage();

  const getIcon = () => {
    switch (tip.type) {
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'danger': return <FaTimes className="text-red-500" />;
      case 'success': return <FaCheck className="text-green-500" />;
      default: return <FaLightbulb className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (tip.type) {
      case 'warning': return 'from-yellow-500/20 to-yellow-600/20';
      case 'danger': return 'from-red-500/20 to-red-600/20';
      case 'success': return 'from-green-500/20 to-green-600/20';
      default: return 'from-blue-500/20 to-purple-500/20';
    }
  };

  const getBorderColor = () => {
    switch (tip.type) {
      case 'warning': return 'border-yellow-500/30 hover:border-yellow-500/50';
      case 'danger': return 'border-red-500/30 hover:border-red-500/50';
      case 'success': return 'border-green-500/30 hover:border-green-500/50';
      default: return 'border-blue-500/30 hover:border-blue-500/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className="group relative"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getBgColor()} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
      
      <div className={`relative bg-gradient-to-br ${getBgColor()} backdrop-blur-sm p-5 rounded-xl border ${getBorderColor()} transition-all duration-300`}>
        <div className="flex items-start gap-4">
          {/* Icon with Animation */}
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-2xl border border-white/10"
          >
            {tip.icon || getIcon()}
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="text-white font-semibold">
                {language === 'en' ? tip.titleEn : tip.titleUr}
              </h4>
              {tip.savings && tip.savings > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  <FaLeaf className="text-xs" />
                  {t('Save', 'بچت')} Rs {tip.savings}
                </motion.span>
              )}
            </div>
            
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {language === 'en' ? tip.messageEn : tip.messageUr}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onMarkRead && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onMarkRead}
                  className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                >
                  <FaCheck className="text-xs" />
                  {t('Got it', 'سمجھ آ گیا')}
                </motion.button>
              )}
              {onDismiss && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDismiss}
                  className="text-xs bg-gray-800/50 hover:bg-gray-800 text-gray-400 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {t('Dismiss', 'ہٹائیں')}
                </motion.button>
              )}
            </div>
          </div>

          {/* Time Badge */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FaClock className="text-xs" />
            <span>{t('now', 'ابھی')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}