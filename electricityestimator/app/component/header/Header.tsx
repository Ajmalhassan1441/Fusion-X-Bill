'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion' // ✅ Variants import کرو
import { 
  FaBolt, FaBars, FaTimes, FaCalculator, FaLightbulb, 
  FaHistory, FaCog, FaQuestionCircle
} from 'react-icons/fa'
import LanguageToggle from '../ui/LanguageToggle'
import { useLanguage } from '@/lib/LanguageContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { nameEn: 'Home', nameUr: 'ہوم', path: '/', icon: FaBolt, color: 'from-blue-500 to-cyan-500' },
    { nameEn: 'Calculator', nameUr: 'کیلکولیٹر', path: '/calculator', icon: FaCalculator, color: 'from-purple-500 to-pink-500' },
    { nameEn: 'Tips', nameUr: 'مشورے', path: '/tip', icon: FaLightbulb, color: 'from-yellow-500 to-orange-500' },
    { nameEn: 'History', nameUr: 'تاریخ', path: '/history', icon: FaHistory, color: 'from-green-500 to-emerald-500' },
    { nameEn: 'Settings', nameUr: 'سیٹنگز', path: '/setting', icon: FaCog, color: 'from-gray-500 to-slate-500' },
    { nameEn: 'Help', nameUr: 'مدد', path: '/help', icon: FaQuestionCircle, color: 'from-red-500 to-rose-500' },
  ]

  // ✅ صحیح variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  const logoVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0
    }
  }

  const navContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  const toggleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }} // ✅ transition یہاں لگاؤ
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-gray-950/90 backdrop-blur-xl py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="group relative">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    <FaBolt className="text-white" />
                  </div>
                </motion.div>
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-bold text-white"
                  >
                    FusionX<span className="text-blue-500">Bill</span>
                  </motion.span>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs text-gray-400"
                  >
                    {t('Electricity Estimator', 'بجلی کا اندازہ')}
                  </motion.p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="flex items-center gap-1 bg-gray-800/50 backdrop-blur-sm p-1 rounded-2xl border border-gray-700/50">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.path
                const itemName = t(item.nameEn, item.nameUr)
                
                return (
                  <motion.div
                    key={item.path}
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredItem(item.nameEn)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.path}
                      className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 overflow-hidden group ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {/* Hover/Active Background */}
                      <motion.div
                        className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        initial={false}
                        animate={isActive ? { opacity: 0.3 } : {}}
                      />
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      
                      {/* Icon */}
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : {}}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className={`relative z-10 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} size={16} />
                      </motion.div>
                      
                      {/* Text */}
                      <span className="relative z-10">{itemName}</span>

                      {/* Hover Tooltip */}
                      <AnimatePresence>
                        {hoveredItem === item.nameEn && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                          >
                            <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30 shadow-lg">
                              {itemName}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.nav>

          {/* Toggles */}
          <motion.div
            variants={toggleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LanguageToggle />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaTimes size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaBars size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-6 pb-4 grid grid-cols-2 gap-2"
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path
                  const itemName = t(item.nameEn, item.nameUr)
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative group flex flex-col items-center gap-2 p-4 rounded-xl transition-all overflow-hidden ${
                          isActive 
                            ? 'bg-linear-to-br from-blue-500/20 to-purple-500/20 text-blue-500' 
                            : 'bg-gray-800/30 text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        {/* Hover effect */}
                        <motion.div
                          className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-10`}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`w-10 h-10 rounded-lg bg-linear-to-br ${item.color} bg-opacity-20 flex items-center justify-center`}
                        >
                          <Icon className="text-xl" />
                        </motion.div>
                        <span className="text-xs font-medium">{itemName}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}