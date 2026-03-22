import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BrickLogo = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
    <rect x="0" y="8" width="32" height="16" rx="3" fill="#2563EB" />
    <rect x="3" y="4" width="7" height="7" rx="3.5" fill="#1D4ED8" />
    <rect x="13" y="4" width="7" height="7" rx="3.5" fill="#1D4ED8" />
    <rect x="23" y="4" width="7" height="7" rx="3.5" fill="#1D4ED8" />
  </svg>
)

const links = [
  { href: '#gallery', label: 'גלריה' },
  { href: '#about', label: 'אודות' },
  { href: '#builder', label: 'מיניפיג\'' },
  { href: '#contact', label: 'צור קשר' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 left-0 z-50"
          style={{ background: '#0F1C2E', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollTo('#root')} className="flex items-center gap-2">
              <BrickLogo />
              <span className="font-black text-xl text-white" style={{ fontFamily: 'Varela Round, sans-serif' }}>BrickByGal</span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex gap-6">
              {links.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="font-semibold pb-0.5 border-b-2 border-transparent transition-all"
                  style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = '#60A5FA' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderBottomColor = 'transparent' }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="תפריט"
            >
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: '#0F1C2E' }}
              >
                {links.map(l => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className="block w-full text-right px-6 py-4 font-semibold text-lg transition-colors"
                    style={{ color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Heebo, sans-serif' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = '#1E3A5F' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent' }}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
