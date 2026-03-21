import { motion } from 'framer-motion'

const BrickIcon = ({ filled }) => (
  <span style={{ color: filled ? '#60A5FA' : 'rgba(96,165,250,0.2)', fontSize: '14px' }}>🧱</span>
)

export default function ModelCard({ model, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#1E3A5F',
        border: '1px solid rgba(96,165,250,0.2)',
        transition: 'transform 0.15s',
      }}
      onClick={() => onOpen(model)}
    >
      <div className="relative">
        <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
        <span
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{
            background: 'rgba(96,165,250,0.15)',
            color: '#60A5FA',
            border: '1px solid rgba(96,165,250,0.3)',
            fontFamily: 'Rubik, sans-serif',
          }}
        >
          {model.category}
        </span>
      </div>

      <div className="p-5">
        <h3
          className="font-black text-lg mb-2 text-white"
          style={{ fontFamily: 'Righteous, cursive' }}
        >
          {model.name}
        </h3>

        <div className="flex justify-between text-sm mb-3" style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}>
          <span>🔩 {model.pieces.toLocaleString()} חלקים</span>
          <span>⏱ {model.buildTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(n => <BrickIcon key={n} filled={n <= model.difficulty} />)}
          </div>
          <button
            className="font-bold text-sm px-4 py-1.5 rounded-lg text-white transition-all duration-150"
            style={{ background: '#2563EB', border: '1px solid #2563EB', fontFamily: 'Rubik, sans-serif' }}
            onClick={e => { e.stopPropagation(); onOpen(model) }}
            onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
          >
            פרטים
          </button>
        </div>
      </div>
    </motion.div>
  )
}
