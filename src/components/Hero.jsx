import { motion } from 'framer-motion'

const SHAPES = [
  { x:  5, y: 10, color: '#2563EB', delay: 0,   w: 56, h: 28, r: -8  },
  { x: 88, y: 14, color: '#60A5FA', delay: 1.4, w: 40, h: 20, r: 12  },
  { x:  2, y: 42, color: '#1E3A5F', delay: 0.9, w: 42, h: 21, r:  6  },
  { x: 90, y: 50, color: '#2563EB', delay: 2.8, w: 60, h: 30, r: -12 },
]

export default function Hero() {
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F1C2E] pt-16">

      {/* Floating background bricks */}
      {SHAPES.map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.w, height: s.h,
          background: s.color, borderRadius: 3, opacity: 0.1,
          transform: `rotate(${s.r}deg)`,
          animation: `floatBrick ${4 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/*
        RTL flex-row (desktop): first child → RIGHT, second child → LEFT
        We use order classes so globe appears on TOP on mobile and LEFT on desktop.
          Globe: order-1 (mobile top) / md:order-2 (desktop left in RTL)
          Text:  order-2 (mobile below) / md:order-1 (desktop right in RTL)
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20
                      flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Text block ── */}
        <div className="flex-1 text-center md:text-right order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white"
            style={{ fontFamily: 'Righteous, cursive' }}
          >
            הלגו שלי, העולם שלי.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl mb-10"
            style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}
          >
            ברוכים הבאים לעולמי, בו כל דגם מספר סיפור
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end"
          >
            <button
              onClick={() => scrollTo('#gallery')}
              className="font-black text-lg px-10 py-4 rounded-xl cursor-pointer transition-all duration-200 text-white"
              style={{ background: '#2563EB', border: '2px solid #2563EB' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
            >
              צפה בדגמים
            </button>
            <button
              onClick={() => scrollTo('#about')}
              className="font-black text-lg px-10 py-4 rounded-xl cursor-pointer transition-all duration-200 text-white"
              style={{ background: 'transparent', border: '2px solid white' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#0F1C2E' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white' }}
            >
              קצת עלי
            </button>
          </motion.div>
        </div>

        {/* ── Globe image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="flex-shrink-0 flex justify-center order-1 md:order-2"
        >
          <img
            src="/brickbygal/globe.jpg"
            alt="LEGO Globe"
            className="w-[220px] h-[220px] md:w-[350px] md:h-[350px]"
            style={{
              objectFit: 'contain',
              animation: 'spinGlobe 25s linear infinite',
              filter: 'drop-shadow(0 20px 60px rgba(37,99,235,0.3))',
            }}
          />
        </motion.div>

      </div>

      {/* Bounce-down arrow */}
      <button
        onClick={() => scrollTo('#gallery')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl cursor-pointer"
        style={{ color: '#94A3B8', animation: 'bounceArrow 2s ease-in-out infinite' }}
        aria-label="גלול למטה"
      >
        ↓
      </button>
    </section>
  )
}
