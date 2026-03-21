import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PALETTE = [
  { color: '#E3000B', name: 'אדום' },
  { color: '#FFD700', name: 'צהוב' },
  { color: '#006DB7', name: 'כחול' },
  { color: '#00A850', name: 'ירוק' },
  { color: '#FF6B00', name: 'כתום' },
  { color: '#9B59B6', name: 'סגול' },
  { color: '#FFFFFF', name: 'לבן' },
  { color: '#1A1A1A', name: 'שחור' },
]

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: PALETTE[i % PALETTE.length].color,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
  }))
  return (
    <>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            background: p.color,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </>
  )
}

function LegoBrick3D({ color }) {
  const dark = color === '#FFFFFF' ? '#ccc' : color + 'aa'
  return (
    <div className="relative inline-block" style={{ width: 120, height: 90 }}>
      {/* Top face */}
      <div
        className="absolute rounded-t-lg"
        style={{
          width: 120, height: 70, background: color,
          border: '3px solid #1A1A1A', top: 0, left: 0,
          boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.2)',
          transition: 'background 0.3s',
        }}
      />
      {/* Studs */}
      {[20, 55, 90].map(x => (
        <div
          key={x}
          className="absolute rounded-full border-2 border-[#1A1A1A]"
          style={{
            width: 22, height: 22, background: color,
            top: -11, left: x,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            transition: 'background 0.3s',
            filter: 'brightness(1.1)',
          }}
        />
      ))}
      {/* Side face */}
      <div
        className="absolute rounded-b-lg"
        style={{
          width: 120, height: 20, background: dark,
          border: '3px solid #1A1A1A', borderTop: 'none',
          top: 67, left: 0,
          transition: 'background 0.3s',
        }}
      />
    </div>
  )
}

export default function BuildChallenge() {
  const [brickColor, setBrickColor] = useState('#E3000B')
  const [colorName, setColorName] = useState('אדום')
  const [selectedColor, setSelectedColor] = useState('#E3000B')
  const [slots, setSlots] = useState(Array(6).fill(null))
  const [showConfetti, setShowConfetti] = useState(false)
  const [done, setDone] = useState(false)

  const pickColor = (c, name) => {
    setBrickColor(c)
    setColorName(name)
    setSelectedColor(c)
  }

  const fillSlot = useCallback((i) => {
    if (done) return
    setSlots(prev => {
      const next = [...prev]
      next[i] = selectedColor
      const allFilled = next.every(Boolean)
      if (allFilled) {
        setShowConfetti(true)
        setDone(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
      return next
    })
  }, [selectedColor, done])

  const reset = () => {
    setSlots(Array(6).fill(null))
    setDone(false)
    setShowConfetti(false)
  }

  return (
    <section id="challenge" className="py-20 px-4 bg-[#1A1A1A] text-white">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-3"
          style={{ fontFamily: 'Nunito' }}
        >
          🎮 אתגר הלגו
        </motion.h2>
        <p className="text-center text-gray-400 mb-12">צבע לבנה, ובנה את הצורה שלך!</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Part A — Brick color mixer */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-[#FFD700]">א. בחר צבע ללבנה שלך</h3>
            <div className="flex justify-center mb-6">
              <LegoBrick3D color={brickColor} />
            </div>
            <p className="text-center text-sm text-gray-400 mb-4">צבע נבחר: <span className="font-bold text-white">{colorName}</span></p>
            <div className="flex flex-wrap justify-center gap-3">
              {PALETTE.map(p => (
                <button
                  key={p.color}
                  onClick={() => pickColor(p.color, p.name)}
                  title={p.name}
                  className="w-10 h-10 rounded-full border-3 transition-transform hover:scale-110"
                  style={{
                    background: p.color,
                    border: selectedColor === p.color ? '3px solid #FFD700' : '3px solid #555',
                    transform: selectedColor === p.color ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Part B — Mini build puzzle */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-[#FFD700]">ב. בנה את הצורה!</h3>

            {done ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-3">🎉</div>
                <p className="text-xl font-black text-[#FFD700]" style={{ fontFamily: 'Nunito' }}>
                  יצרת דגם מיני!<br />כמו גל אמיתי!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {slots.map((color, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fillSlot(i)}
                    className="h-16 rounded-xl border-3 border-dashed flex items-center justify-center text-2xl transition-all"
                    style={{
                      background: color || 'rgba(255,255,255,0.05)',
                      border: color ? `3px solid ${color}` : '3px dashed #555',
                      cursor: 'pointer',
                    }}
                  >
                    {!color && <span className="text-gray-600">+</span>}
                  </motion.button>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-400 text-center mb-4">
              {done ? '' : `בחר צבע משמאל ולחץ על משבצת ריקה (${slots.filter(Boolean).length}/6)`}
            </p>

            <button
              onClick={reset}
              className="w-full py-3 rounded-xl font-bold border-2 border-[#555] text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              התחל מחדש
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
