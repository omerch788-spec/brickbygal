import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ── Face SVG renderers ────────────────────────────────────────────────────────
// Head area: x=62-138, y=32-102. Eyes at y≈60, mouth at y≈78
function FaceRenderer({ type }) {
  switch (type) {
    case 'שמח': return (
      <>
        <circle cx={84} cy={62} r={5} fill="#1A1A1A" />
        <circle cx={116} cy={62} r={5} fill="#1A1A1A" />
        <path d="M82 77 Q100 93 118 77" stroke="#1A1A1A" strokeWidth={3} fill="none" strokeLinecap="round" />
      </>
    )
    case 'מגניב': return (
      <>
        <rect x={69} y={56} width={26} height={13} rx={4} fill="#1A1A1A" />
        <rect x={102} y={56} width={26} height={13} rx={4} fill="#1A1A1A" />
        <line x1={95} y1={63} x2={102} y2={63} stroke="#1A1A1A" strokeWidth={2} />
        <path d="M82 80 Q100 91 118 80" stroke="#1A1A1A" strokeWidth={3} fill="none" strokeLinecap="round" />
      </>
    )
    case 'מופתע': return (
      <>
        <circle cx={84} cy={60} r={5} fill="#1A1A1A" />
        <circle cx={116} cy={60} r={5} fill="#1A1A1A" />
        <ellipse cx={100} cy={82} rx={9} ry={10} fill="#1A1A1A" />
      </>
    )
    case 'עצוב': return (
      <>
        <circle cx={84} cy={62} r={5} fill="#1A1A1A" />
        <circle cx={116} cy={62} r={5} fill="#1A1A1A" />
        <path d="M82 86 Q100 74 118 86" stroke="#1A1A1A" strokeWidth={3} fill="none" strokeLinecap="round" />
      </>
    )
    case 'כועס': return (
      <>
        <line x1={70} y1={52} x2={92} y2={59} stroke="#1A1A1A" strokeWidth={3} strokeLinecap="round" />
        <line x1={108} y1={59} x2={130} y2={52} stroke="#1A1A1A" strokeWidth={3} strokeLinecap="round" />
        <circle cx={84} cy={65} r={5} fill="#1A1A1A" />
        <circle cx={116} cy={65} r={5} fill="#1A1A1A" />
        <line x1={84} y1={82} x2={116} y2={82} stroke="#1A1A1A" strokeWidth={3} strokeLinecap="round" />
      </>
    )
    case 'מצחיק': return (
      <>
        <circle cx={84} cy={60} r={5} fill="#1A1A1A" />
        <circle cx={116} cy={60} r={5} fill="#1A1A1A" />
        <path d="M76 76 Q100 96 124 76" stroke="#1A1A1A" strokeWidth={3} fill="#FFBBBB" strokeLinecap="round" />
        <ellipse cx={100} cy={89} rx={9} ry={7} fill="#FF4444" />
      </>
    )
    default: return null
  }
}

// ── Hat SVG renderers (drawn above head, head top is y=32, stud from y=8) ────
function HatRenderer({ type }) {
  switch (type) {
    case 'ללא': return null
    case 'קסדת לגו': return (
      <>
        <rect x={58} y={4} width={84} height={48} rx={24} fill="#909090" stroke="#666" strokeWidth={1} />
        <rect x={60} y={34} width={80} height={14} fill="#808080" />
        <rect x={60} y={40} width={80} height={8} rx={2} fill="#777" />
      </>
    )
    case 'כובע שף': return (
      <>
        <rect x={78} y={-34} width={44} height={50} rx={12} fill="white" stroke="#E0E0E0" strokeWidth={1.5} />
        <ellipse cx={100} cy={16} rx={30} ry={9} fill="white" stroke="#E0E0E0" strokeWidth={1} />
        <rect x={64} y={10} width={72} height={14} rx={4} fill="#F8F8F8" stroke="#DDD" strokeWidth={1} />
      </>
    )
    case 'כתר': return (
      <>
        <path d="M62 34 L62 6 L76 20 L90 2 L100 15 L110 2 L124 20 L138 6 L138 34 Z"
          fill="#FFD700" stroke="#B8900A" strokeWidth={1.5} />
        <circle cx={76} cy={22} r={4.5} fill="#E3000B" />
        <circle cx={100} cy={13} r={4.5} fill="#006DB7" />
        <circle cx={124} cy={22} r={4.5} fill="#00A850" />
      </>
    )
    case 'כובע בייסבול': return (
      <>
        <ellipse cx={100} cy={22} rx={44} ry={26} fill="#E3000B" />
        <rect x={54} y={32} width={60} height={9} rx={4} fill="#B00000" />
        <rect x={62} y={34} width={76} height={12} rx={2} fill="#CC0000" />
      </>
    )
    case 'כיפה': return (
      <>
        <ellipse cx={100} cy={30} rx={42} ry={16} fill="#2244AA" />
        <ellipse cx={100} cy={30} rx={42} ry={16} fill="none" stroke="#1A3388" strokeWidth={1} />
      </>
    )
    default: return null
  }
}

// ── Accessory SVG renderers (held in right hand, x≈160, y≈165) ───────────────
function AccessoryRenderer({ type }) {
  switch (type) {
    case 'ללא': return null
    case 'חרב': return (
      <>
        <rect x={157} y={138} width={8} height={88} rx={2} fill="#D8D8D8" stroke="#999" strokeWidth={0.5} />
        <polygon points="157,226 165,226 161,246" fill="#C0C0C0" />
        <rect x={146} y={214} width={32} height={8} rx={3} fill="#8B6914" />
        <rect x={158} y={221} width={6} height={20} rx={2} fill="#7B3A0A" />
      </>
    )
    case 'מפתח ברגים': return (
      <>
        <rect x={157} y={168} width={8} height={66} rx={4} fill="#888" />
        <path d="M152 148 C144 142 144 128 152 122 L157 134 L157 158 Z" fill="#888" />
        <path d="M168 148 C176 142 176 128 168 122 L163 134 L163 158 Z" fill="#888" />
        <rect x={152} y={120} width={16} height={12} rx={3} fill="#777" />
      </>
    )
    case 'גיטרה': return (
      <>
        <rect x={158} y={136} width={6} height={54} rx={3} fill="#6B3A1F" />
        <ellipse cx={161} cy={208} rx={20} ry={24} fill="#8B4513" stroke="#5D2E00" strokeWidth={1} />
        <ellipse cx={161} cy={194} rx={14} ry={16} fill="#8B4513" stroke="#5D2E00" strokeWidth={1} />
        <circle cx={161} cy={210} r={5} fill="#5D2E00" />
        <line x1={156} y1={190} x2={156} y2={228} stroke="#DDD" strokeWidth={0.8} />
        <line x1={161} y1={190} x2={161} y2={228} stroke="#DDD" strokeWidth={0.8} />
        <line x1={166} y1={190} x2={166} y2={228} stroke="#DDD" strokeWidth={0.8} />
      </>
    )
    case 'מגן': return (
      <>
        <path d="M144 148 L178 148 L178 194 L161 218 L144 194 Z"
          fill="#006DB7" stroke="#004A8A" strokeWidth={1.5} />
        <path d="M148 152 L174 152 L174 191 L161 211 L148 191 Z" fill="#0058A8" />
        <line x1={161} y1={152} x2={161} y2={209} stroke="#FFD700" strokeWidth={2} />
        <line x1={148} y1={175} x2={174} y2={175} stroke="#FFD700" strokeWidth={2} />
      </>
    )
    case 'כוס קפה': return (
      <>
        <rect x={145} y={168} width={32} height={38} rx={5} fill="white" stroke="#CCC" strokeWidth={1} />
        <path d="M177 177 C192 177 192 198 177 198" fill="none" stroke="#CCC" strokeWidth={2.5} />
        <rect x={143} y={162} width={36} height={9} rx={4} fill="#888" />
        <rect x={147} y={172} width={28} height={28} rx={3} fill="#7B3A0A" opacity={0.25} />
        <path d="M154 156 Q156 147 154 139" stroke="#BBB" strokeWidth={1.5} fill="none" strokeLinecap="round" />
        <path d="M161 154 Q163 145 161 137" stroke="#BBB" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      </>
    )
    default: return null
  }
}

// ── Minifigure SVG ─────────────────────────────────────────────────────────────
function MinifigSVG({ face, shirtColor, hat, legColor, accessory }) {
  const galTextColor = shirtColor === '#FFD700' ? '#1A1A1A' : '#FFFFFF'

  return (
    <svg
      viewBox="0 0 215 305"
      width="215" height="305"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* ── Accessory (behind arm so it looks held) ── */}
      <AccessoryRenderer type={accessory} />

      {/* ── Feet / Boots ── */}
      <rect x={48} y={264} width={52} height={18} rx={5} fill="#111" />
      <rect x={102} y={264} width={52} height={18} rx={5} fill="#111" />
      <rect x={48} y={264} width={52} height={18} rx={5} fill="none" stroke="#000" strokeWidth={0.5} />
      <rect x={102} y={264} width={52} height={18} rx={5} fill="none" stroke="#000" strokeWidth={0.5} />

      {/* ── Legs ── */}
      <rect x={51} y={196} width={47} height={72} rx={5} fill={legColor} />
      <rect x={104} y={196} width={47} height={72} rx={5} fill={legColor} />
      {/* Leg inner shadow (gap between legs) */}
      <rect x={86} y={196} width={12} height={72} fill="rgba(0,0,0,0.25)" />
      {/* Leg right-side depth */}
      <rect x={88} y={196} width={16} height={72} rx={0} fill="rgba(0,0,0,0.12)" />

      {/* ── Hip connector ── */}
      <rect x={53} y={180} width={96} height={20} rx={4} fill="#2A2A2A" />
      <rect x={53} y={180} width={96} height={20} rx={4} fill="none" stroke="#111" strokeWidth={1} />
      <rect x={57} y={183} width={88} height={11} rx={2} fill="#222" />

      {/* ── Torso ── */}
      <rect x={55} y={106} width={92} height={76} rx={5} fill={shirtColor} />
      {/* Right-side depth shading */}
      <rect x={120} y={106} width={27} height={76} rx={5} fill="rgba(0,0,0,0.18)" />
      {/* Torso outline */}
      <rect x={55} y={106} width={92} height={76} rx={5} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={1.5} />
      {/* GAL text */}
      <text
        x={96} y={151}
        textAnchor="middle" fontSize="17" fontWeight="900"
        fontFamily="Righteous, Arial, sans-serif"
        fill={galTextColor} letterSpacing="3" opacity={0.95}
      >
        GAL
      </text>

      {/* ── Left arm ── */}
      <rect x={17} y={108} width={38} height={58} rx={9} fill={shirtColor} />
      <rect x={38} y={108} width={17} height={58} rx={0} fill="rgba(0,0,0,0.15)" />
      <rect x={17} y={108} width={38} height={58} rx={9} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* ── Right arm ── */}
      <rect x={147} y={108} width={38} height={58} rx={9} fill={shirtColor} />
      <rect x={147} y={108} width={17} height={58} rx={0} fill="rgba(0,0,0,0.15)" />
      <rect x={147} y={108} width={38} height={58} rx={9} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* ── Left hand ── */}
      <circle cx={36} cy={172} r={16} fill="#FFD700" />
      <circle cx={36} cy={172} r={16} fill="none" stroke="#C8A000" strokeWidth={1.2} />
      <rect x={36} y={158} width={16} height={28} fill="#FFD700" /> {/* hide right half → C-shape illusion */}

      {/* ── Right hand ── */}
      <circle cx={166} cy={172} r={16} fill="#FFD700" />
      <circle cx={166} cy={172} r={16} fill="none" stroke="#C8A000" strokeWidth={1.2} />
      <rect x={150} y={158} width={16} height={28} fill="#FFD700" /> {/* hide left half */}

      {/* ── Neck ── */}
      <rect x={89} y={100} width={24} height={10} fill="#FFD700" />

      {/* ── Head ── */}
      <rect x={62} y={32} width={78} height={70} rx={12} fill="#FFD700" />
      <rect x={115} y={32} width={25} height={70} rx={12} fill="rgba(0,0,0,0.1)" />
      <rect x={62} y={32} width={78} height={70} rx={12} fill="none" stroke="#C8A000" strokeWidth={1.5} />

      {/* ── Face ── */}
      <FaceRenderer type={face} />

      {/* ── Neck stud ── */}
      <rect x={84} y={8} width={34} height={26} rx={7} fill="#FFD700" stroke="#C8A000" strokeWidth={1} />
      <ellipse cx={101} cy={8} rx={17} ry={6} fill="#C8A000" />

      {/* ── Hat ── */}
      <HatRenderer type={hat} />
    </svg>
  )
}

// ── Options data ──────────────────────────────────────────────────────────────
const COLORS = [
  { hex: '#E3000B', name: 'אדום' },
  { hex: '#006DB7', name: 'כחול' },
  { hex: '#00A850', name: 'ירוק' },
  { hex: '#FFD700', name: 'צהוב' },
  { hex: '#FF6500', name: 'כתום' },
  { hex: '#1A1A1A', name: 'שחור' },
]
const FACES = ['שמח', 'מגניב', 'מופתע', 'עצוב', 'כועס', 'מצחיק']
const HATS  = ['ללא', 'קסדת לגו', 'כובע שף', 'כתר', 'כובע בייסבול', 'כיפה']
const ACCS  = ['ללא', 'חרב', 'מפתח ברגים', 'גיטרה', 'מגן', 'כוס קפה']

const TOTAL = FACES.length * COLORS.length * HATS.length * COLORS.length * ACCS.length

// ── Reusable option button ────────────────────────────────────────────────────
function OptionBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150"
      style={{
        border: `1px solid ${active ? '#2563EB' : 'rgba(96,165,250,0.2)'}`,
        background: active ? '#2563EB' : 'transparent',
        color: active ? 'white' : '#94A3B8',
        boxShadow: active ? '0 0 12px rgba(37,99,235,0.4)' : 'none',
        fontFamily: 'Heebo, sans-serif',
      }}
    >
      {label}
    </button>
  )
}

function ColorBtn({ color, active, onClick }) {
  return (
    <button onClick={onClick} title={color.name} className="flex flex-col items-center gap-1">
      <div
        className="w-10 h-10 rounded-lg transition-all duration-150"
        style={{
          background:  color.hex,
          border: `2px solid ${active ? '#60A5FA' : 'rgba(96,165,250,0.2)'}`,
          boxShadow: active ? '0 0 12px rgba(96,165,250,0.5)' : 'none',
          transform:   active ? 'scale(1.18)' : 'scale(1)',
        }}
      />
      <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>{color.name}</span>
    </button>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function MinifigBuilder() {
  const [face,       setFace]    = useState('שמח')
  const [shirtColor, setShirt]   = useState('#E3000B')
  const [hat,        setHat]     = useState('ללא')
  const [legColor,   setLegs]    = useState('#1A1A1A')
  const [accessory,  setAcc]     = useState('ללא')
  const [spinning,   setSpinning] = useState(false)
  const [copied,     setCopied]  = useState(false)

  const randomize = useCallback(() => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 650)
    setFace(FACES[Math.floor(Math.random() * FACES.length)])
    setShirt(COLORS[Math.floor(Math.random() * COLORS.length)].hex)
    setHat(HATS[Math.floor(Math.random() * HATS.length)])
    setLegs(COLORS[Math.floor(Math.random() * COLORS.length)].hex)
    setAcc(ACCS[Math.floor(Math.random() * ACCS.length)])
  }, [])

  const share = useCallback(() => {
    const shirtName = COLORS.find(c => c.hex === shirtColor)?.name || shirtColor
    const legName   = COLORS.find(c => c.hex === legColor)?.name  || legColor
    const text = `המיניפיג' של גל: פרצוף ${face} + חולצה ${shirtName} + ${hat} + ${accessory} + רגליים ${legName}`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [face, shirtColor, hat, legColor, accessory])

  return (
    <section id="builder" className="py-24 px-4 text-white" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          className="text-4xl font-black text-center mb-3"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          הלבש את גל
        </motion.h2>
        <p className="text-center mb-12" style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>
          עצב את המיניפיג' — <span className="font-bold" style={{ color: '#60A5FA' }}>{TOTAL.toLocaleString()}</span> צירופים אפשריים
        </p>

        <div className="flex flex-col md:flex-row gap-10 items-start justify-center">

          {/* ── Minifigure + buttons ── */}
          <div className="flex flex-col items-center flex-shrink-0 mx-auto md:mx-0">
            <div
              className="rounded-2xl p-6 flex items-center justify-center"
              style={{ background: '#1E3A5F', border: '1px solid rgba(96,165,250,0.2)' }}
            >
              <motion.div
                animate={spinning ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{ duration: 0.65 }}
                style={{ perspective: 800 }}
              >
                <MinifigSVG
                  face={face}
                  shirtColor={shirtColor}
                  hat={hat}
                  legColor={legColor}
                  accessory={accessory}
                />
              </motion.div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={randomize}
                className="px-5 py-2.5 rounded-xl font-bold transition-all duration-150"
                style={{ border: '1px solid #60A5FA', color: '#60A5FA', background: 'transparent', fontFamily: 'Heebo, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#2563EB' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#60A5FA'; e.currentTarget.style.borderColor = '#60A5FA' }}
              >
                🎲 אקראי
              </button>
              <button
                onClick={share}
                className="px-5 py-2.5 rounded-xl font-bold transition-all duration-150"
                style={{ border: '1px solid rgba(96,165,250,0.3)', color: '#94A3B8', background: 'transparent', fontFamily: 'Heebo, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#60A5FA'; e.currentTarget.style.color = '#60A5FA' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'; e.currentTarget.style.color = '#94A3B8' }}
              >
                {copied ? '✅ הועתק!' : '📋 שתף'}
              </button>
            </div>
          </div>

          {/* ── Options panel ── */}
          <div className="flex-1 space-y-6 w-full max-w-sm md:max-w-none">

            {/* Face */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#60A5FA', fontFamily: 'Heebo, sans-serif' }}>😀 פרצוף</p>
              <div className="flex flex-wrap gap-2">
                {FACES.map(f => <OptionBtn key={f} label={f} active={face === f} onClick={() => setFace(f)} />)}
              </div>
            </div>

            {/* Shirt color */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#60A5FA', fontFamily: 'Heebo, sans-serif' }}>🎨 צבע חולצה</p>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(c => <ColorBtn key={c.hex} color={c} active={shirtColor === c.hex} onClick={() => setShirt(c.hex)} />)}
              </div>
            </div>

            {/* Hat */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#60A5FA', fontFamily: 'Heebo, sans-serif' }}>👒 כיסוי ראש</p>
              <div className="flex flex-wrap gap-2">
                {HATS.map(h => <OptionBtn key={h} label={h} active={hat === h} onClick={() => setHat(h)} />)}
              </div>
            </div>

            {/* Leg color */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#60A5FA', fontFamily: 'Heebo, sans-serif' }}>👖 צבע רגליים</p>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(c => <ColorBtn key={c.hex} color={c} active={legColor === c.hex} onClick={() => setLegs(c.hex)} />)}
              </div>
            </div>

            {/* Accessory */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#60A5FA', fontFamily: 'Heebo, sans-serif' }}>🛠️ אביזר ביד</p>
              <div className="flex flex-wrap gap-2">
                {ACCS.map(a => <OptionBtn key={a} label={a} active={accessory === a} onClick={() => setAcc(a)} />)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
