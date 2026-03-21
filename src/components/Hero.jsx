import { motion } from 'framer-motion'

const COLORS = ['#E3000B', '#FFD700', '#006DB7', '#00A850']

const FloatingBrick = ({ x, y, color, delay, size = 40 }) => (
  <div
    className="absolute opacity-20 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, animation: `floatBrick ${3 + delay}s ease-in-out infinite` }}
  >
    <svg width={size} height={size * 0.75} viewBox="0 0 40 30">
      <rect x="0" y="8" width="40" height="22" rx="3" fill={color} />
      <rect x="4" y="2" width="10" height="10" rx="5" fill={color} />
      <rect x="25" y="2" width="10" height="10" rx="5" fill={color} />
    </svg>
  </div>
)

const bricks = [
  { x: 5, y: 10, color: '#E3000B', delay: 0, size: 50 },
  { x: 85, y: 15, color: '#FFD700', delay: 1, size: 35 },
  { x: 15, y: 70, color: '#006DB7', delay: 2, size: 45 },
  { x: 75, y: 65, color: '#00A850', delay: 0.5, size: 40 },
  { x: 50, y: 5, color: '#E3000B', delay: 1.5, size: 30 },
  { x: 92, y: 50, color: '#006DB7', delay: 2.5, size: 55 },
  { x: 3, y: 45, color: '#FFD700', delay: 0.8, size: 38 },
]

export default function Hero() {
  const scrollToGallery = () => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToAbout = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F5F0] pt-16">
      {/* Floating bricks background */}
      {bricks.map((b, i) => <FloatingBrick key={i} {...b} />)}

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-4"
          style={{ fontFamily: 'Nunito' }}
        >
          🧱 בנוי חלק אחד בכל פעם
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-10"
        >
          גל בונה עולמות מלגו. כל דגם — פרויקט, סיפור, ויצירה.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToGallery}
            className="brutalist bg-[#FFD700] text-[#1A1A1A] font-bold text-lg px-8 py-4 rounded-xl cursor-pointer"
          >
            צפה בדגמים
          </button>
          <button
            onClick={scrollToAbout}
            className="brutalist bg-white text-[#1A1A1A] font-bold text-lg px-8 py-4 rounded-xl cursor-pointer"
          >
            קצת עלי
          </button>
        </motion.div>
      </div>

      {/* Bounce arrow */}
      <button
        onClick={scrollToGallery}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl cursor-pointer"
        style={{ animation: 'bounceArrow 2s ease-in-out infinite' }}
        aria-label="גלול למטה"
      >
        ↓
      </button>
    </section>
  )
}
