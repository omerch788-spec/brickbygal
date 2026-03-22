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
    <section id="gallery" className="py-24 px-4" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-2 text-white"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          הדגמים של גל
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center mb-7"
          style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif', fontSize: '1rem', opacity: 0.8 }}
        >
          לחץ על דגם לפרטים נוספים
        </motion.p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center mb-10" style={{ gap: '12px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-bold px-5 py-2 rounded-full"
              style={{
                fontFamily: 'Heebo, sans-serif',
                background: active === cat ? '#2563EB' : 'transparent',
                color: active === cat ? 'white' : '#94A3B8',
                border: `1px solid ${active === cat ? '#2563EB' : 'rgba(96,165,250,0.2)'}`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (cat !== active) {
                  e.currentTarget.style.borderColor = '#2563EB'
                  e.currentTarget.style.color = '#2563EB'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (cat !== active) {
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)'
                  e.currentTarget.style.color = '#94A3B8'
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }
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
