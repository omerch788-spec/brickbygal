import { motion } from 'framer-motion'

// ─── World map: 36 cols × 18 rows, '1' = land ────────────────────────────────
const WORLD_MAP = [
  '000000000000000000000000000000000000', // 90N–80N
  '000000000000000001110000000000000000', // 80N–70N  Greenland
  '000011000001000011110011001111111000', // 70N–60N
  '000111100001100011111011111111111000', // 60N–50N
  '000111100001110011111111111111100000', // 50N–40N
  '000011100000111111111111111111000000', // 40N–30N
  '000011100000011111111111111100000000', // 30N–20N
  '001001100000011111111111111000000000', // 20N–10N
  '001001000000011111110001110000000001', // 10N–0
  '000110000000011111100001110000000000', // 0–10S
  '000110000000001111100001000000001100', // 10S–20S
  '000110000000000111100000000000011110', // 20S–30S
  '000100000000000000000000000000011100', // 30S–40S
  '000000000000000000000000000001000000', // 40S–50S
  '000000000000000000000000000000000000', // 50S–60S
  '000000000011111111100000000000000000', // 60S–70S  Antarctica
  '000000000111111111110000000000000000', // 70S–80S
  '000000000001111111000000000000000000', // 80S–90S
]

const CELL  = 10               // px per block
const COLS  = 36
const MAP_W = CELL * COLS      // 360  — one full rotation
const MAP_H = CELL * 18        // 180

// ─── Geographic cell colours ─────────────────────────────────────────────────
function cellColor(land, r, c) {
  if (!land) {
    if (r <= 1 || r >= 16) return '#5090BC'
    return (r * 3 + c * 2) % 11 < 2 ? '#2E6DAD' : '#1B4F8C'
  }
  if (r >= 16) return '#C8D8E8'                                    // Antarctica
  if (r <= 1)  return '#C8D8E8'                                    // Arctic
  if (r >= 5 && r <= 8  && c >= 18 && c <= 25) return '#8B6914'   // Sahara / Arabia
  if (r >= 9 && r <= 12 && c >= 29 && c <= 32) return '#8B6914'   // Australia
  if (c <= 9 || c >= 33)                        return '#3A7A3A'   // Americas
  return '#2D6A2D'                                                  // Europe / Asia / Africa
}

function studColor(land, r, c) {
  const map = {
    '#1B4F8C': '#2860A2', '#2E6DAD': '#3A7ABE', '#5090BC': '#60A0CC',
    '#2D6A2D': '#3A7A3A', '#3A7A3A': '#4A8A4A',
    '#8B6914': '#A07828', '#C8D8E8': '#D8E8F4',
  }
  return map[cellColor(land, r, c)] || '#999'
}

// ─── Latitude / longitude grid lines (static, rendered over the map) ─────────
function GridLines({ gcx, gcy, r }) {
  const lines = []
  // Horizontals every 3 rows (30°) — we draw them at fixed y positions inside the globe
  for (let row = 1; row < 6; row++) {
    const frac = row / 6
    const y = gcy - r + frac * r * 2
    lines.push(<line key={`h${row}`} x1={gcx - r} y1={y} x2={gcx + r} y2={y}
      stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />)
  }
  // Verticals every 6 columns (60°) — fixed arcs approximated as lines
  for (let col = 1; col < 6; col++) {
    const x = gcx - r + (col / 6) * r * 2
    lines.push(<line key={`v${col}`} x1={x} y1={gcy - r} x2={x} y2={gcy + r}
      stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />)
  }
  return <>{lines}</>
}

// ─── Animated LEGO-style globe ────────────────────────────────────────────────
function LegoGlobe() {
  const GCX = 155                      // globe centre-x
  const GCY = 165                      // globe centre-y
  const R   = 132                      // radius → diameter 264 ≈ 280
  const topOff = (R * 2 - MAP_H) / 2  // (264-180)/2 = 42  — centres map vertically

  // Arch arm cubic bezier endpoints
  const armLx = 74,  armLy = 372   // left foot
  const armRx = 246, armRy = 372   // right foot
  const armPx = GCX, armPy = 25    // peak (above globe top)

  return (
    <svg
      viewBox="0 0 320 430"
      width="320" height="430"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Clip globe to circle */}
        <clipPath id="globeClip">
          <circle cx={GCX} cy={GCY} r={R} />
        </clipPath>

        {/* 3-D lighting overlay */}
        <radialGradient id="globeLight" cx="34%" cy="30%" r="58%">
          <stop offset="0%"   stopColor="white"  stopOpacity="0.22" />
          <stop offset="100%" stopColor="black"  stopOpacity="0.42" />
        </radialGradient>

        {/* Gold gradient for ring/base details */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F0D060" />
          <stop offset="100%" stopColor="#A07020" />
        </linearGradient>
      </defs>

      {/* ══════════════════════════════════════════════════════════════════════
           STAND — 100% static, drawn first (behind globe)
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Arch arm — shadow */}
      <path
        d={`M ${armLx} ${armLy} C ${armLx - 30} 200 ${armPx - 80} 40 ${armPx} ${armPy}
            C ${armPx + 80} 40 ${armRx + 30} 200 ${armRx} ${armRy}`}
        stroke="#1A0806" strokeWidth="20" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arch arm — dark base */}
      <path
        d={`M ${armLx} ${armLy} C ${armLx - 30} 200 ${armPx - 80} 40 ${armPx} ${armPy}
            C ${armPx + 80} 40 ${armRx + 30} 200 ${armRx} ${armRy}`}
        stroke="#4A2518" strokeWidth="14" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arch arm — mid brown */}
      <path
        d={`M ${armLx} ${armLy} C ${armLx - 30} 200 ${armPx - 80} 40 ${armPx} ${armPy}
            C ${armPx + 80} 40 ${armRx + 30} 200 ${armRx} ${armRy}`}
        stroke="#6B3A2A" strokeWidth="9" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arch arm — gold LEGO-brick segments (dashed) */}
      <path
        d={`M ${armLx} ${armLy} C ${armLx - 30} 200 ${armPx - 80} 40 ${armPx} ${armPy}
            C ${armPx + 80} 40 ${armRx + 30} 200 ${armRx} ${armRy}`}
        stroke="#C9A030" strokeWidth="4" fill="none"
        strokeLinecap="round" strokeDasharray="10 14" strokeDashoffset="5"
      />
      {/* Arch arm — thin highlight ridge */}
      <path
        d={`M ${armLx} ${armLy} C ${armLx - 30} 200 ${armPx - 80} 40 ${armPx} ${armPy}
            C ${armPx + 80} 40 ${armRx + 30} 200 ${armRx} ${armRy}`}
        stroke="#A06040" strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeDasharray="10 14" strokeDashoffset="0"
        opacity="0.55"
      />

      {/* ══════════════════════════════════════════════════════════════════════
           GLOBE — clipped circle with animated scrolling world map
         ══════════════════════════════════════════════════════════════════════ */}

      <g clipPath="url(#globeClip)">
        {/* Ocean fill */}
        <rect x={GCX - R} y={GCY - R} width={R * 2} height={R * 2} fill="#1B4F8C" />

        {/* Scrolling world map
            The outer <g> translates the map's top-left to the globe's top-left + topOff.
            The inner <g> carries the CSS animation (pure horizontal scroll). */}
        <g transform={`translate(${GCX - R}, ${GCY - R + topOff})`}>
          <g style={{ animation: 'spinGlobe 20s linear infinite' }}>
            {/* Doubled map for seamless loop */}
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
                        fill={cellColor(land, r, c)} rx={1.5}
                      />
                      <circle
                        cx={x + CELL / 2} cy={y + CELL / 2}
                        r={CELL * 0.21}
                        fill={studColor(land, r, c)} opacity={0.5}
                      />
                    </g>
                  )
                })
              )
            )}
          </g>
        </g>

        {/* Lat / lon grid (static — drawn over the scrolling map) */}
        <GridLines gcx={GCX} gcy={GCY} r={R} />

        {/* 3-D lighting overlay */}
        <circle cx={GCX} cy={GCY} r={R} fill="url(#globeLight)" />
      </g>

      {/* Globe ring border */}
      <circle cx={GCX} cy={GCY} r={R} fill="none" stroke="#1A3A6A" strokeWidth="2.5" />

      {/* ══════════════════════════════════════════════════════════════════════
           STAND continued — base and details (drawn in front of globe)
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Oval base — layered for 3-D depth */}
      <ellipse cx="162" cy="418" rx="125" ry="14" fill="#1A0806" />
      <ellipse cx="162" cy="413" rx="123" ry="12" fill="#2E1008" />
      <ellipse cx="162" cy="408" rx="120" ry="10" fill="#4A2518" />
      <ellipse cx="162" cy="404" rx="117" ry="8"  fill="#6B3A2A" />
      <ellipse cx="162" cy="400" rx="113" ry="6"  fill="#7B4A32" />
      {/* Top surface */}
      <ellipse cx="162" cy="397" rx="109" ry="5"  fill="#8B5A3A" />
      {/* Wood-grain rings */}
      <ellipse cx="162" cy="397" rx="88"  ry="3.5" fill="none" stroke="#5A2A18" strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="162" cy="397" rx="62"  ry="2.5" fill="none" stroke="#5A2A18" strokeWidth="1"   opacity="0.4" />
      <ellipse cx="162" cy="397" rx="36"  ry="1.5" fill="none" stroke="#5A2A18" strokeWidth="1"   opacity="0.3" />

      {/* LEGO studs on base top */}
      {[[-50,0],[-25,0],[0,0],[25,0],[50,0],[-37,-8],[37,-8]].map(([dx, dy], i) => (
        <g key={i}>
          <ellipse cx={162 + dx} cy={395 + dy} rx="7" ry="3.5"
            fill="#7B4A32" stroke="#5A2A18" strokeWidth="0.8" />
        </g>
      ))}

      {/* Green nameplate */}
      <rect x="133" y="398" width="58" height="10" rx="3" fill="#1A5C2A" />
      <rect x="135" y="399.5" width="54" height="7"  rx="2" fill="#238A3A" />
      <text x="162" y="406.5" textAnchor="middle" fontSize="5"
        fill="#A0FFB0" fontFamily="Righteous, cursive" letterSpacing="1">
        GAL
      </text>

      {/* Gold brass rings at arm-base junction */}
      <circle cx={armLx + 10} cy={armLy - 8} r="9" fill="url(#goldGrad)" stroke="#8B7020" strokeWidth="1" />
      <circle cx={armLx + 10} cy={armLy - 8} r="5" fill="#C9A030" />
      <circle cx={armRx - 10} cy={armRy - 8} r="9" fill="url(#goldGrad)" stroke="#8B7020" strokeWidth="1" />
      <circle cx={armRx - 10} cy={armRy - 8} r="5" fill="#C9A030" />

      {/* Gold cap knob at arch peak */}
      <circle cx={armPx} cy={armPy + 2} r="10" fill="url(#goldGrad)" stroke="#8B7020" strokeWidth="1.5" />
      <circle cx={armPx} cy={armPy + 2} r="5"  fill="#F0D878" opacity="0.8" />
    </svg>
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
        RTL flex-row: first child → RIGHT, second child → LEFT.
        order-1 md:order-2 puts globe first on mobile (top) and second (LEFT) on desktop.
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20
                      flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Text (right side desktop, bottom mobile) ── */}
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

        {/* ── Globe (left side desktop, top mobile) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="flex-shrink-0 flex justify-center order-1 md:order-2
                     scale-[0.65] md:scale-100"
          style={{ transformOrigin: 'center center' }}
        >
          <img
            src="/brickbygal/globe.png"
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
