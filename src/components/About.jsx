import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { icon: '🧱', value: 8, suffix: '+', label: 'דגמים' },
  { icon: '🔩', value: 19000, suffix: '+', label: 'חלקים' },
  { icon: '📅', value: 10, suffix: '+', label: 'שנות ניסיון' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const steps = 40
          const step = target / steps
          let current = 0
          const interval = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(interval)
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-black text-center mb-12"
          style={{ fontFamily: 'Nunito' }}
        >
          מי אני?
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex-shrink-0"
          >
            <img
              src="/brickbygal/gal.jpg"
              alt="גל"
              style={{ width: 250, height: 250, borderRadius: '50%', objectFit: 'cover', border: '5px solid #FFD700', boxShadow: '6px 6px 0 #1A1A1A' }}
            />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-lg leading-relaxed font-medium"
            >
              התחלתי להרכיב לגו בגיל 10-11. קנו לי מכונית לגו והתחלתי לאהוב את זה משם.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
              className="text-lg leading-relaxed font-medium"
            >
              מה שגרם לי לאהוב את התחביב הוא שזו עבודה מתאימה לכל גיל.
              יש לו הרבה יתרונות שעוזרים לי כמו: מוטוריקה עדינה, ריכוז, דיוק, סבלנות,
              עבודה מול תוכנית — וכל מבנה מרשים בפני עצמו.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 + i * 0.1 }}
              className="bg-[#F5F5F0] rounded-2xl p-5 text-center"
              style={{ border: '3px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A' }}
            >
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black" style={{ fontFamily: 'Nunito' }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-gray-600 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
