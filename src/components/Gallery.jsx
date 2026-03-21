import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { models } from '../data/models'
import ModelCard from './ModelCard'
import ModelModal from './ModelModal'

const CATEGORIES = ['הכל', 'טכניק', 'סיטי', 'שער כוכבים', 'ארכיטקטורה']

export default function Gallery() {
  const [active, setActive] = useState('הכל')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'הכל' ? models : models.filter(m => m.category === active)

  return (
    <section id="gallery" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-3"
          style={{ fontFamily: 'Nunito' }}
        >
          הדגמים של גל
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center text-gray-500 mb-10"
        >
          לחץ על דגם לפרטים נוספים
        </motion.p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-bold px-5 py-2 rounded-full border-2 border-[#1A1A1A] transition-all ${
                active === cat
                  ? 'bg-[#1A1A1A] text-white shadow-[3px_3px_0_#E3000B]'
                  : 'bg-white hover:bg-[#FFD700]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      {selected && <ModelModal model={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
