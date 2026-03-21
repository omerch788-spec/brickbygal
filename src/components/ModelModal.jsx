import { motion, AnimatePresence } from 'framer-motion'

const BrickIcon = ({ filled }) => (
  <span style={{ color: filled ? '#60A5FA' : 'rgba(96,165,250,0.2)' }}>🧱</span>
)

export default function ModelModal({ model, onClose }) {
  if (!model) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="rounded-2xl max-w-lg w-full overflow-hidden"
          style={{ background: '#1E3A5F', border: '1px solid rgba(96,165,250,0.2)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative">
            <img src={model.image} alt={model.name}
              style={{ width: '100%', maxHeight: 350, objectFit: 'contain', background: '#1E3A5F' }} />
            <button
              onClick={onClose}
              className="absolute top-3 left-3 rounded-full w-9 h-9 flex items-center justify-center font-bold text-xl transition-colors text-white"
              style={{ background: 'rgba(15,28,46,0.8)', border: '1px solid rgba(96,165,250,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(15,28,46,0.8)'}
            >
              ✕
            </button>
            <span
              className="absolute top-3 right-3 font-bold text-sm px-3 py-1 rounded-full"
              style={{ background: 'rgba(96,165,250,0.15)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.3)', fontFamily: 'Rubik, sans-serif' }}
            >
              {model.category}
            </span>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'Righteous, cursive' }}>{model.name}</h2>
            <p className="mb-4" style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}>{model.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'חלקים', value: model.pieces.toLocaleString() },
                { label: 'זמן בנייה', value: model.buildTime },
                { label: 'שנת בנייה', value: model.year },
                { label: 'רמת קושי', value: <span>{[1,2,3,4,5].map(n => <BrickIcon key={n} filled={n <= model.difficulty} />)}</span> },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3" style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.15)' }}>
                  <div className="text-xs mb-1" style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}>{s.label}</div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Fun fact */}
            <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.25)' }}>
              <span className="font-black text-sm" style={{ color: '#60A5FA' }}>💡 עובדה מגניבה: </span>
              <span className="font-semibold text-sm text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>{model.funFact}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
