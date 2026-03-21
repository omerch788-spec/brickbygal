import { motion } from 'framer-motion'

const FloatingShape = ({ x, y, color, delay, w, h, rotation }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: w,
      height: h,
      background: color,
      borderRadius: 3,
      opacity: 0.1,
      transform: `rotate(${rotation}deg)`,
      animationDelay: `${delay}s`,
      animation: `floatBrick ${4 + delay}s ease-in-out infinite`,
    }}
  />
)

const shapes = [
  { x: 5,  y: 10, color: '#E3000B', delay: 0,   w: 56, h: 28, rotation: -8  },
  { x: 82, y: 12, color: '#FFD700', delay: 1.2, w: 40, h: 20, rotation: 12  },
  { x: 12, y: 68, color: '#006DB7', delay: 2,   w: 48, h: 24, rotation: -5  },
  { x: 74, y: 62, color: '#00A850', delay: 0.6, w: 44, h: 22, rotation: 8   },
  { x: 48, y: 5,  color: '#E3000B', delay: 1.8, w: 36, h: 18, rotation: 3   },
  { x: 90, y: 48, color: '#006DB7', delay: 2.8, w: 60, h: 30, rotation: -12 },
  { x: 2,  y: 42, color: '#FFD700', delay: 0.9, w: 42, h: 21, rotation: 6   },
]

export default function Hero() {
  const scrollToGallery = () => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToAbout   = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A] pt-16">
      {shapes.map((s, i) => <FloatingShape key={i} {...s} />)}

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#FFD700] font-bold tracking-widest uppercase text-sm mb-6"
        >
          LEGO Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-tight mb-6 text-white"
          style={{ fontFamily: 'Nunito' }}
        >
          בנוי חלק אחד בכל פעם
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12"
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
            className="bg-[#FFD700] text-[#1A1A1A] font-black text-lg px-10 py-4 rounded-xl cursor-pointer border-2 border-[#FFD700] hover:bg-transparent hover:text-[#FFD700] transition-all duration-200"
          >
            צפה בדגמים
          </button>
          <button
            onClick={scrollToAbout}
            className="bg-transparent text-white font-black text-lg px-10 py-4 rounded-xl cursor-pointer border-2 border-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-200"
          >
            קצת עלי
          </button>
        </motion.div>
      </div>

      <button
        onClick={scrollToGallery}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl cursor-pointer text-gray-500"
        style={{ animation: 'bounceArrow 2s ease-in-out infinite' }}
        aria-label="גלול למטה"
      >
        ↓
      </button>
    </section>
  )
}
