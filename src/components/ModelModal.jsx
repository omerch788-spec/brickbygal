import { motion, AnimatePresence } from 'framer-motion'

const BrickIcon = ({ filled }) => (
  <span className={filled ? 'text-[#E3000B]' : 'text-gray-300'}>🧱</span>
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
        style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl border-3 border-[#1A1A1A] max-w-lg w-full overflow-hidden"
          style={{ border: '3px solid #1A1A1A', boxShadow: '8px 8px 0 #1A1A1A' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative">
            <img src={model.image} alt={model.name} className="w-full h-52 object-cover" />
            <button
              onClick={onClose}
              className="absolute top-3 left-3 bg-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-xl border-2 border-[#1A1A1A] hover:bg-[#FFD700] transition-colors"
            >
              ✕
            </button>
            <span className="absolute top-3 right-3 bg-[#FFD700] text-[#1A1A1A] font-bold text-sm px-3 py-1 rounded-full border-2 border-[#1A1A1A]">
              {model.category}
            </span>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'Nunito' }}>{model.name}</h2>
            <p className="text-gray-600 mb-4">{model.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'חלקים', value: model.pieces.toLocaleString() },
                { label: 'זמן בנייה', value: model.buildTime },
                { label: 'שנת בנייה', value: model.year },
                { label: 'רמת קושי', value: <span>{[1,2,3,4,5].map(n => <BrickIcon key={n} filled={n <= model.difficulty} />)}</span> },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className="font-bold">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Fun fact */}
            <div className="bg-[#FFD700] rounded-xl px-4 py-3 border-2 border-[#1A1A1A]">
              <span className="font-black text-sm">💡 עובדה מגניבה: </span>
              <span className="font-semibold text-sm">{model.funFact}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
