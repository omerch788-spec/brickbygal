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

const CELL = 19           // px per grid cell
const COLS = 36
const ROWS = 18
const MAP_W = CELL * COLS  // 684px — one full revolution
const MAP_H = CELL * ROWS  // 342px
const GLOBE  = 340         // globe diameter

// ─── LEGO Earth globe ────────────────────────────────────────────────────────
function LegoGlobe() {
  const topOffset = Math.round((GLOBE - MAP_H) / 2) // centre map vertically

  return (
    // drop-shadow wrapper (outside the clip so shadow shows)
    <div style={{ filter: 'drop-shadow(0 0 48px rgba(0,109,183,0.55)) drop-shadow(0 0 16px rgba(0,109,183,0.3))' }}>
      {/* Circular clip + 23° tilt */}
      <div style={{
        width: GLOBE,
        height: GLOBE,
        borderRadius: '50%',
        overflow: 'hidden',
        transform: 'rotate(23deg)',
        position: 'relative',
        border: '2px solid rgba(255,255,255,0.08)',
      }}>

        {/* Scrolling world map — doubled for seamless loop */}
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
                        {/* Brick face */}
                        <rect
                          x={x + 0.5} y={y + 0.5}
                          width={CELL - 1} height={CELL - 1}
                          fill={land ? '#00A850' : '#006DB7'}
                          rx={1.5}
                        />
                        {/* Stud dot */}
                        <circle
                          cx={x + CELL / 2} cy={y + CELL / 2}
                          r={CELL * 0.21}
                          fill={land ? '#00C060' : '#0080CC'}
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

        {/* 3-D lighting overlay: highlight top-left, shadow bottom-right */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background:
            'radial-gradient(circle at 36% 32%, rgba(255,255,255,0.28) 0%, transparent 52%), ' +
            'radial-gradient(circle at 68% 72%, rgba(0,0,0,0.32) 0%, transparent 46%)',
        }} />
      </div>
    </div>
  )
}

// ─── Background floating shapes ───────────────────────────────────────────────
const SHAPES = [
  { x:  5, y: 10, color: '#E3000B', delay: 0,   w: 56, h: 28, r: -8  },
  { x: 88, y: 14, color: '#FFD700', delay: 1.4, w: 40, h: 20, r: 12  },
  { x:  2, y: 42, color: '#FFD700', delay: 0.9, w: 42, h: 21, r:  6  },
  { x: 90, y: 50, color: '#006DB7', delay: 2.8, w: 60, h: 30, r: -12 },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A] pt-16">

      {/* Floating background shapes */}
      {SHAPES.map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.w, height: s.h,
          background: s.color, borderRadius: 3, opacity: 0.08,
          transform: `rotate(${s.r}deg)`,
          animation: `floatBrick ${4 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/*
        Layout (RTL-aware flex row):
          In RTL flex-row the first child sits on the RIGHT, second on the LEFT.
          JSX order → text first (RIGHT) | globe second (LEFT)
          On mobile: flex-col → text on top, globe below.
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20
                      flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Text block (right side on desktop) ── */}
        <div className="flex-1 text-center md:text-right">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FFD700] font-bold tracking-widest uppercase text-sm mb-5"
          >
            LEGO Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white"
            style={{ fontFamily: 'Nunito' }}
          >
            הלגו שלי, העולם שלי.{' '}
            <span className="text-[#FFD700]">כל דגם מספר סיפור.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10"
          >
            גל בונה עולמות מלגו. כל דגם — פרויקט, סיפור, ויצירה.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end"
          >
            <button
              onClick={() => scrollTo('#gallery')}
              className="bg-[#FFD700] text-[#1A1A1A] font-black text-lg px-10 py-4 rounded-xl cursor-pointer border-2 border-[#FFD700] hover:bg-transparent hover:text-[#FFD700] transition-all duration-200"
            >
              צפה בדגמים
            </button>
            <button
              onClick={() => scrollTo('#about')}
              className="bg-transparent text-white font-black text-lg px-10 py-4 rounded-xl cursor-pointer border-2 border-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-200"
            >
              קצת עלי
            </button>
          </motion.div>
        </div>

        {/* ── Globe (left side on desktop) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="flex-shrink-0 flex justify-center
                     scale-[0.62] md:scale-100"
          style={{ transformOrigin: 'center center' }}
        >
          <LegoGlobe />
        </motion.div>

      </div>

      {/* Bounce-down arrow */}
      <button
        onClick={() => scrollTo('#gallery')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl cursor-pointer text-gray-500"
        style={{ animation: 'bounceArrow 2s ease-in-out infinite' }}
        aria-label="גלול למטה"
      >
        ↓
      </button>
    </section>
  )
}
