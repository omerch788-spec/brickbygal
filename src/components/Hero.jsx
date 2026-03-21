import { motion } from 'framer-motion'

// ─── World map: 36 cols (10°/col) × 18 rows (10°/row), '1' = land ────────────
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

const CELL  = 19
const COLS  = 36
const MAP_W = CELL * COLS   // 684 — one full revolution
const MAP_H = CELL * 18     // 342

// ─── Geographic color logic ──────────────────────────────────────────────────
function cellColor(land, r, c) {
  if (!land) {
    // Polar seas — lighter
    if (r <= 1 || r >= 16) return '#5090BC'
    // Subtle ocean patches for visual texture
    return (r * 3 + c * 2) % 11 < 2 ? '#2E6DAD' : '#1B4F8C'
  }
  // Antarctica (rows 15–17)
  if (r >= 15) return '#DDE8EE'
  // Arctic ice (rows 0–1) / Greenland interior
  if (r <= 1)                                    return '#C0DCF0'
  if (r === 2 && c >= 6  && c <= 9)             return '#B0CCD8'
  // Sahara / North Africa (rows 5–7, ~0°–40°E)
  if (r >= 5 && r <= 7  && c >= 18 && c <= 22)  return '#8B6914'
  // Arabian Peninsula (rows 6–8, ~35°–65°E)
  if (r >= 6 && r <= 8  && c >= 21 && c <= 26)  return '#9B7520'
  // Central Australia desert (rows 9–12, ~115°–145°E)
  if (r >= 9 && r <= 12 && c >= 29 && c <= 32)  return '#8B6914'
  // Default land — dark green
  return '#2D6A2D'
}

function studColor(land, r, c) {
  const f = cellColor(land, r, c)
  const lighten = {
    '#1B4F8C': '#2860A2', '#2E6DAD': '#3A7ABE', '#5090BC': '#60A0CC',
    '#2D6A2D': '#3A7A3A', '#8B6914': '#A07828', '#9B7520': '#B08830',
    '#DDE8EE': '#EEF5F8', '#C0DCF0': '#D0ECFF', '#B0CCD8': '#C4DCE8',
  }
  return lighten[f] || f
}

// ─── LEGO Globe set 21332 — pixel-art replica ─────────────────────────────────
function LegoGlobe() {
  const GLOBE  = 300                               // sphere diameter
  const gcx    = 175                               // globe centre-x in container
  const gcy    = 165                               // globe centre-y in container
  const ringR  = 156                               // meridian-ring radius
  const topOff = Math.round((GLOBE - MAP_H) / 2)  // -21px (crops polar tips)

  // Ring tick-mark angles (every 30°)
  const ticks = [0,30,60,90,120,150,180,210,240,270,300,330]

  return (
    <div style={{ position: 'relative', width: 350, height: 430, flexShrink: 0 }}>

      {/* ── STAND — rendered behind the globe ── */}
      <svg
        width="350" height="430"
        style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'visible' }}
      >
        {/* Oval wooden base — layered ellipses for depth */}
        <ellipse cx="210" cy="422" rx="115" ry="13" fill="#1A0A04" />
        <ellipse cx="210" cy="416" rx="113" ry="11" fill="#38180A" />
        <ellipse cx="210" cy="411" rx="110" ry="9"  fill="#562A10" />
        <ellipse cx="210" cy="406" rx="106" ry="8"  fill="#7A4018" />
        <ellipse cx="210" cy="402" rx="102" ry="6"  fill="#9A5820" />
        {/* Top surface */}
        <ellipse cx="210" cy="398" rx="98"  ry="5"  fill="#B06828" />
        {/* Wood-grain rings */}
        <ellipse cx="210" cy="398" rx="78"  ry="3.5" fill="none" stroke="#7A4018" strokeWidth="1.5" opacity="0.45" />
        <ellipse cx="210" cy="398" rx="54"  ry="2.5" fill="none" stroke="#7A4018" strokeWidth="1"   opacity="0.35" />
        <ellipse cx="210" cy="398" rx="30"  ry="1.5" fill="none" stroke="#7A4018" strokeWidth="1"   opacity="0.25" />

        {/* Vertical support post */}
        <rect x="204" y="340" width="14" height="62" rx="7" fill="#38180A" />
        <rect x="207" y="342" width="7"  height="58" rx="3" fill="#6B3818" />
        <rect x="210" y="344" width="3"  height="54" rx="1" fill="#B06828" opacity="0.4" />

        {/* Curved arm — shadow layer */}
        <path d="M 211 344 C 206 328 196 318 180 320"
              stroke="#180804" strokeWidth="20" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
        {/* Arm — dark base */}
        <path d="M 211 344 C 206 328 196 318 180 320"
              stroke="#562A10" strokeWidth="14" fill="none" strokeLinecap="round" />
        {/* Arm — mid tone */}
        <path d="M 211 344 C 206 328 196 318 180 320"
              stroke="#7A4018" strokeWidth="9"  fill="none" strokeLinecap="round" />
        {/* Arm — highlight ridge */}
        <path d="M 211 344 C 206 328 196 318 180 320"
              stroke="#C07830" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.55" />
      </svg>

      {/* ── GLOBE SPHERE ── */}
      <div style={{
        position: 'absolute',
        top:  gcy - GLOBE / 2,   // = 15
        left: gcx - GLOBE / 2,   // = 25
        zIndex: 2,
        borderRadius: '50%',
        boxShadow: '0 18px 52px rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          width: GLOBE, height: GLOBE,
          borderRadius: '50%',
          overflow: 'hidden',
          transform: 'rotate(23deg)',
          position: 'relative',
        }}>
          {/* Scrolling world map */}
          <div style={{ position: 'absolute', top: topOff, left: 0 }}>
            <div style={{
              animation: 'globeRotate 20s linear infinite',
              display: 'flex',
              width: MAP_W * 2,
            }}>
              <svg
                width={MAP_W * 2} height={MAP_H}
                style={{ display: 'block', flexShrink: 0 }}
              >
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
                            fill={cellColor(land, r, c)}
                            rx={2}
                          />
                          {/* Stud dot */}
                          <circle
                            cx={x + CELL / 2} cy={y + CELL / 2}
                            r={CELL * 0.22}
                            fill={studColor(land, r, c)}
                            opacity={0.55}
                          />
                        </g>
                      )
                    })
                  )
                )}
              </svg>
            </div>
          </div>

          {/* 3-D lighting: highlight top-left, shadow bottom-right */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
            background:
              'radial-gradient(circle at 33% 28%, rgba(255,255,255,0.26) 0%, transparent 52%), ' +
              'radial-gradient(circle at 68% 72%, rgba(0,0,0,0.52) 0%, transparent 46%)',
          }} />
        </div>
      </div>

      {/* ── GOLD MERIDIAN RING — on top of globe ── */}
      <svg
        width="350" height="430"
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'visible' }}
      >
        {/* Drop-shadow underneath ring */}
        <circle cx={gcx} cy={gcy} r={ringR}
          fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="16" />
        {/* Outer dark edge */}
        <circle cx={gcx} cy={gcy} r={ringR}
          fill="none" stroke="#6B4E10" strokeWidth="13" />
        {/* Main brass surface */}
        <circle cx={gcx} cy={gcy} r={ringR}
          fill="none" stroke="#C9A030" strokeWidth="9" />
        {/* Inner edge */}
        <circle cx={gcx} cy={gcy} r={ringR}
          fill="none" stroke="#A07820" strokeWidth="1.5" />
        {/* Highlight arc — upper-left quadrant */}
        <circle cx={gcx} cy={gcy} r={ringR}
          fill="none" stroke="#F0D878" strokeWidth="4" opacity="0.65"
          strokeDasharray="55 929" strokeDashoffset="-188" />
        {/* Degree tick marks */}
        {ticks.map(deg => {
          const rad = (deg * Math.PI) / 180
          const r1 = ringR - 6, r2 = ringR + 6
          return (
            <line
              key={deg}
              x1={gcx + r1 * Math.cos(rad)} y1={gcy + r1 * Math.sin(rad)}
              x2={gcx + r2 * Math.cos(rad)} y2={gcy + r2 * Math.sin(rad)}
              stroke="#6B4E10" strokeWidth="2"
            />
          )
        })}
      </svg>

    </div>
  )
}

// ─── Floating background shapes ───────────────────────────────────────────────
const SHAPES = [
  { x:  5, y: 10, color: '#2563EB', delay: 0,   w: 56, h: 28, r: -8  },
  { x: 88, y: 14, color: '#60A5FA', delay: 1.4, w: 40, h: 20, r: 12  },
  { x:  2, y: 42, color: '#1E3A5F', delay: 0.9, w: 42, h: 21, r:  6  },
  { x: 90, y: 50, color: '#2563EB', delay: 2.8, w: 60, h: 30, r: -12 },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
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
        RTL flex-row: first child → RIGHT, second child → LEFT
        Text first (RIGHT) | Globe second (LEFT) — matches requested layout
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20
                      flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Text block — right side on desktop ── */}
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

        {/* ── Globe — left side on desktop ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="flex-shrink-0 flex justify-center
                     scale-[0.63] md:scale-100"
          style={{ transformOrigin: 'center center' }}
        >
          <LegoGlobe />
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
