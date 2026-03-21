import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { models } from '../data/models'
import ModelCard from './ModelCard'
import ModelModal from './ModelModal'

const CATEGORIES = ['הכל', 'Ideas', 'Icons', 'Technic', 'Harry Potter']

export default function Gallery() {
  const [active, setActive] = useState('הכל')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'הכל' ? models : models.filter(m => m.category === active)

  return (
    <section id="gallery" className="py-24 px-4" style={{ background: '#0F1C2E' }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-3 text-white"
          style={{ fontFamily: 'Righteous, cursive' }}
        >
          הדגמים של גל
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center mb-10"
          style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}
        >
          לחץ על דגם לפרטים נוספים
        </motion.p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-bold px-5 py-2 rounded-full transition-all"
              style={{
                fontFamily: 'Rubik, sans-serif',
                background: active === cat ? '#2563EB' : 'transparent',
                color: active === cat ? 'white' : '#94A3B8',
                border: `1px solid ${active === cat ? '#2563EB' : 'rgba(96,165,250,0.2)'}`,
              }}
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
