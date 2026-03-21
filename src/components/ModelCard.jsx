import { motion } from 'framer-motion'

const CATEGORY_COLORS = {
  'Ideas':   { bg: '#006DB7', text: '#fff' },
  'Icons':   { bg: '#E3000B', text: '#fff' },
  'Technic': { bg: '#FFD700', text: '#1A1A1A' },
}

const BrickIcon = ({ filled }) => (
  <span className={filled ? 'text-[#E3000B]' : 'text-gray-200'} style={{ fontSize: '14px' }}>🧱</span>
)

export default function ModelCard({ model, index, onOpen }) {
  const colors = CATEGORY_COLORS[model.category] || { bg: '#1A1A1A', text: '#fff' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '6px 6px 0 #1A1A1A' }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: '3px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A', transition: 'box-shadow 0.15s, transform 0.15s' }}
      onClick={() => onOpen(model)}
    >
      <div className="relative">
        <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
        <span
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full border-2 border-[#1A1A1A]"
          style={{ background: colors.bg, color: colors.text }}
        >
          {model.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-black text-lg mb-2" style={{ fontFamily: 'Nunito' }}>{model.name}</h3>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>🔩 {model.pieces.toLocaleString()} חלקים</span>
          <span>⏱ {model.buildTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(n => <BrickIcon key={n} filled={n <= model.difficulty} />)}
          </div>
          <button
            className="bg-[#FFD700] font-bold text-sm px-4 py-1.5 rounded-lg border-2 border-[#1A1A1A] hover:bg-[#E3000B] hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); onOpen(model) }}
          >
            פרטים
          </button>
        </div>
      </div>
    </motion.div>
  )
}
