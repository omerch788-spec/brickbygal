import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

function Confetti() {
  const colors = ['#2563EB', '#60A5FA', '#1E3A5F', '#93C5FD', '#3B82F6']
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </>
  )
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = () => {
    setSubmitted(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-4" style={{ position: 'relative', zIndex: 1 }}>
      {showConfetti && <Confetti />}
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-3 text-white"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          יש לך שאלה?
        </motion.h2>
        <p className="text-center mb-10" style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>גל שמח לשמוע! כתוב/י לו ישירות.</p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'Varela Round, sans-serif' }}>ההודעה נשלחה!</h3>
              <p style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>גל יחזור אליך בהקדם</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl p-8"
              style={{ background: '#1E3A5F', border: '1px solid rgba(96,165,250,0.2)' }}
              noValidate
            >
              {/* Name */}
              <div className="mb-5">
                <label className="block font-bold mb-1 text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>שם מלא</label>
                <input
                  {...register('name', { required: 'שדה חובה' })}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none text-white"
                  style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.2)', fontFamily: 'Heebo, sans-serif' }}
                  placeholder="הכנס/י שם..."
                />
                {errors.name && <p className="text-sm mt-1" style={{ color: '#F87171' }}>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block font-bold mb-1 text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>אימייל</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'שדה חובה',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'אימייל לא תקין' }
                  })}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none text-white"
                  style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.2)', fontFamily: 'Heebo, sans-serif' }}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-sm mt-1" style={{ color: '#F87171' }}>{errors.email.message}</p>}
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block font-bold mb-1 text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>נושא</label>
                <select
                  {...register('subject')}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none text-white"
                  style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.2)', fontFamily: 'Heebo, sans-serif' }}
                >
                  <option value="מחמאה">מחמאה</option>
                  <option value="שיתוף פעולה">שיתוף פעולה</option>
                  <option value="שאלה על דגם">שאלה על דגם</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block font-bold mb-1 text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>הודעה</label>
                <textarea
                  {...register('message', {
                    required: 'שדה חובה',
                    minLength: { value: 10, message: 'לפחות 10 תווים' }
                  })}
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none resize-none text-white"
                  style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.2)', fontFamily: 'Heebo, sans-serif' }}
                  placeholder="כתוב/י כאן..."
                />
                {errors.message && <p className="text-sm mt-1" style={{ color: '#F87171' }}>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full text-white font-black text-lg py-4 rounded-xl cursor-pointer transition-all duration-150"
                style={{ background: '#2563EB', fontFamily: 'Varela Round, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
              >
                שלח הודעה 🚀
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
