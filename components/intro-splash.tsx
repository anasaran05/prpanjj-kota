'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Diamond } from 'lucide-react'

interface IntroSplashProps {
  onComplete?: () => void
  onStartExit?: () => void
}

export function IntroSplash({ onComplete, onStartExit }: IntroSplashProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hold until BUILDER finishes (1.8s) + 0.5s pause = 2.3s, then zoom-fade exit
    const timer = setTimeout(() => {
      onStartExit?.()
      setIsVisible(false)
    }, 2300)

    return () => clearTimeout(timer)
  }, [onStartExit])

  const handleSkip = () => {
    onStartExit?.()
    setIsVisible(false)
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(6px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
          }}
          className="intro-overlay"
          aria-live="polite"
        >
          {/* Subtle diamond ambient glint background */}
          <div className="intro-bg-glint" aria-hidden="true" />

          <div className="intro-content">
            {/* Top decorative diamond spark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.75, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="intro-icon-wrap"
            >
              <Diamond size={20} className="intro-diamond-icon" />
            </motion.div>

            {/* Name with smooth hardware-accelerated zoom-out */}
            <div className="intro-title-wrap">
              <motion.h1
                initial={{ scale: 1.16, opacity: 0, y: 8 }}
                animate={{ scale: 1.0, opacity: 1, y: 0 }}
                transition={{
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1], // buttery smooth ease-out
                }}
                className="intro-title"
              >
                PRAPANJJ KOTA
              </motion.h1>
            </div>

            {/* Sub-label: Sequential one-by-one reveal */}
            <div className="intro-subtitle">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                FOUNDER
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.65, ease: 'easeOut' }}
                className="dot"
              >
                •
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                DIAMANTAIRE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.15, ease: 'easeOut' }}
                className="dot"
              >
                •
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              >
               Investor
              </motion.span>
            </div>

            {/* Subtle luxury progress line indicating the hold time */}
            <div className="intro-progress-track">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.25, ease: 'linear' }}
                className="intro-progress-bar"
              />
            </div>
          </div>

          {/* Quick skip trigger */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleSkip}
            className="intro-skip-btn"
            aria-label="Skip introduction"
          >
            Skip [esc]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


