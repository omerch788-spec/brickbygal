import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

function Confetti() {
  const colors = ['#E3000B', '#FFD700', '#006DB7', '#00A850', '#FF6B00']
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
    <section id="contact" className="py-20 px-4 bg-[#F5F5F0]">
      {showConfetti && <Confetti />}
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-3"
          style={{ fontFamily: 'Nunito' }}
        >
          📩 יש לך שאלה?
        </motion.h2>
        <p className="text-center text-gray-500 mb-10">גל שמח לשמוע! כתוב/י לו ישירות.</p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Nunito' }}>ההודעה נשלחה!</h3>
              <p className="text-gray-600">גל יחזור אליך בהקדם 🧱</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-8"
              style={{ border: '3px solid #1A1A1A', boxShadow: '6px 6px 0 #1A1A1A' }}
              noValidate
            >
              {/* Name */}
              <div className="mb-5">
                <label className="block font-bold mb-1">שם מלא</label>
                <input
                  {...register('name', { required: 'שדה חובה' })}
                  className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#006DB7]"
                  placeholder="הכנס/י שם..."
                />
                {errors.name && <p className="text-[#E3000B] text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block font-bold mb-1">אימייל</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'שדה חובה',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'אימייל לא תקין' }
                  })}
                  className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#006DB7]"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-[#E3000B] text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block font-bold mb-1">נושא</label>
                <select
                  {...register('subject')}
                  className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#006DB7] bg-white"
                >
                  <option value="מחמאה">מחמאה</option>
                  <option value="שיתוף פעולה">שיתוף פעולה</option>
                  <option value="שאלה על דגם">שאלה על דגם</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block font-bold mb-1">הודעה</label>
                <textarea
                  {...register('message', {
                    required: 'שדה חובה',
                    minLength: { value: 10, message: 'לפחות 10 תווים' }
                  })}
                  rows={4}
                  className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#006DB7] resize-none"
                  placeholder="כתוב/י כאן..."
                />
                {errors.message && <p className="text-[#E3000B] text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="brutalist w-full bg-[#E3000B] text-white font-black text-lg py-4 rounded-xl cursor-pointer"
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
