'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { 
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, 
  FaHeart, FaArrowUp, 
  FaHome, FaCalculator, FaLightbulb, FaHistory, FaCog, FaQuestionCircle, FaChartLine,
} from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, language } = useLanguage()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [typedText, setTypedText] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { nameEn: 'Home', nameUr: 'ہوم', path: '/', icon: FaHome },
    { nameEn: 'Calculator', nameUr: 'کیلکولیٹر', path: '/calculator', icon: FaCalculator },
    { nameEn: 'Tips', nameUr: 'مشورے', path: '/tips', icon: FaLightbulb },
    { nameEn: 'History', nameUr: 'تاریخ', path: '/history', icon: FaHistory },
    { nameEn: 'Settings', nameUr: 'سیٹنگز', path: '/settings', icon: FaCog },
    { nameEn: 'Help', nameUr: 'مدد', path: '/help', icon: FaQuestionCircle },
    { nameEn: '3D Graph', nameUr: 'تھری ڈی گراف', path: '/graph', icon: FaChartLine },
    
  ]

  // Typing animation on hover
  useEffect(() => {
    if (!hoveredIcon) {
      setTypedText('')
      return
    }

    let index = 0
    setTypedText('')
    
    const typingInterval = setInterval(() => {
      if (index < hoveredIcon.length) {
        setTypedText(hoveredIcon.substring(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [hoveredIcon])

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Brand */}
          <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl text-white">⚡</span>
            </div>
            <h4 className="text-white font-semibold mb-2 text-center">FusionX<span className="text-blue-500">Bill</span></h4>
            <p className="text-gray-500 text-sm text-center">{t('Accurate calculator', 'درست کیلکولیٹر')}</p>
            {/* Underline */}
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Card 2: Quick Links with Icons */}
          <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group">
            <h4 className="text-white font-semibold mb-4 text-center">
              {t('Quick Links', 'فوری روابط')}
            </h4>
            <div className="flex justify-center gap-4 flex-wrap">
              {quickLinks.map((item) => {
                const Icon = item.icon
                const linkName = language === 'en' ? item.nameEn : item.nameUr
                
                return (
                  <div key={item.path} className="relative">
                    <Link
                      href={item.path}
                      onMouseEnter={() => setHoveredIcon(linkName)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      className="group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        <Icon size={20} />
                      </div>
                    </Link>
                    
                    {/* Typing tooltip on hover */}
                    {hoveredIcon === linkName && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50"
                      >
                        <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30 shadow-lg">
                          {typedText}
                          <span className="animate-pulse ml-0.5 text-blue-400">|</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
            {/* Underline */}
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Card 3: Developed By */}
          <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl text-white">🚀</span>
            </div>
            <h4 className="text-white font-semibold mb-2 text-center">
              <span className="text-blue-400">P.M.S</span> <span className="text-white">Graphic</span>
            </h4>
            <p className="text-gray-400 text-sm text-center group-hover:text-blue-400 transition-colors">
              {t('Creative Studio', 'کری ایٹو اسٹوڈیو')}
            </p>
            <p className="text-gray-500 text-xs text-center mt-2">© {currentYear}</p>
            {/* Underline */}
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            {t('Built with', 'محبت سے بنایا')} 
            <FaHeart className="text-red-500 mx-1 animate-pulse" /> 
            {t('by PMS Graphic', 'بذریعہ پی ایم ایس گرافک')}
          </p>
          <button 
            onClick={scrollToTop} 
            className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all group"
            aria-label={t('Scroll to top', 'اوپر جائیں')}
          >
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}