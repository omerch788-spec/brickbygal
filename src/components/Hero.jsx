import { motion } from 'framer-motion'

// ─── World map: 36 cols (10°/col) × 18 rows (10°/row), 1=land 0=ocean ───────
const WORLD_MAP = [
  '000000000000000000000000000000000000', // 90N–80N
  '000000000000000001110000000000000000', // 80N–70N  Greenland
  '000011000001000011110011001111111000', // 70N–60N  NA / Scandinavia / Russia
  '000111100001100011111011111111111000', // 60N–50N
  '000111100001110011111111111111100000', // 50N–40N
  '000011100000111111111111111111000000', // 40N–30N
  '000011100000011111111111111100000000', // 30N–20N
  '001001100000011111111111111000000000', // 20N–10N  C.America / N.Africa / SE Asia
  '001001000000011111110001110000000001', // 10N–0
  '000110000000011111100001110000000000', // 0–10S
  '000110000000001111100001000000001100', // 10S–20S  S.America / S.Africa / Australia
  '000110000000000111100000000000011110', // 20S–30S
  '000100000000000000000000000000011100', // 30S–40S
  '000000000000000000000000000001000000', // 40S–50S
  '000000000000000000000000000000000000', // 50S–60S
  '000000000011111111100000000000000000', // 60S–70S  Antarctica
  '000000000111111111110000000000000000', // 70S–80S
  '000000000001111111000000000000000000', // 80S–90S
]

const CELL = 19
const COLS = 36
const ROWS = 18
const MAP_W = CELL * COLS  // 684px
const MAP_H = CELL * ROWS  // 342px
const GLOBE  = 340

function LegoGlobe() {
  const topOffset = Math.round((GLOBE - MAP_H) / 2)

  return (
    <div style={{ filter: 'drop-shadow(0 0 48px rgba(37,99,235,0.6)) drop-shadow(0 0 16px rgba(96,165,250,0.3))' }}>
      <div style={{
        width: GLOBE, height: GLOBE, borderRadius: '50%',
        overflow: 'hidden', transform: 'rotate(23deg)',
        position: 'relative', border: '2px solid rgba(96,165,250,0.15)',
      }}>
        <div style={{ position: 'absolute', top: topOffset, left: 0 }}>
          <div style={{ animation: 'globeRotate 12s linear infinite', display: 'flex', width: MAP_W * 2 }}>
            <svg width={MAP_W * 2} height={MAP_H} style={{ display: 'block', flexShrink: 0 }}>
              {[0, 1].flatMap(copy =>
                WORLD_MAP.flatMap((row, r) =>
                  row.split('').map((cell, c) => {
                    const land = cell === '1'
                    const x = copy * MAP_W + c * CELL
                    const y = r * CELL
                    return (
                      <g key={`${copy}-${r}-${c}`}>
                        <rect
                          x={x + 0.5} y={y + 0.5}
                          width={CELL - 1} height={CELL - 1}
                          fill={land ? '#2563EB' : '#1E3A5F'}
                          rx={1.5}
                        />
                        <circle
                          cx={x + CELL / 2} cy={y + CELL / 2}
                          r={CELL * 0.21}
                          fill={land ? '#60A5FA' : '#1a3460'}
                          opacity={0.5}
                        />
                      </g>
                    )
                  })
                )
              )}
            </svg>
          </div>
        </div>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background:
            'radial-gradient(circle at 36% 32%, rgba(255,255,255,0.2) 0%, transparent 52%), ' +
            'radial-gradient(circle at 68% 72%, rgba(0,0,0,0.4) 0%, transparent 46%)',
        }} />
      </div>
    </div>
  )
}

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

      {SHAPES.map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.w, height: s.h,
          background: s.color, borderRadius: 3, opacity: 0.12,
          transform: `rotate(${s.r}deg)`,
          animation: `floatBrick ${4 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20
                      flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Text block ── */}
        <div className="flex-1 text-center md:text-right">
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

        {/* ── Globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="flex-shrink-0 flex justify-center scale-[0.62] md:scale-100"
          style={{ transformOrigin: 'center center' }}
        >
          <LegoGlobe />
        </motion.div>

      </div>

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
