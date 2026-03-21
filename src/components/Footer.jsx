const BrickIcon = ({ color = '#60A5FA' }) => (
  <svg width="24" height="18" viewBox="0 0 24 18" className="inline-block">
    <rect x="0" y="5" width="24" height="13" rx="2" fill={color} />
    <rect x="2" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
    <rect x="10" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
    <rect x="16" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="py-8 px-4 text-white" style={{ background: '#0F1C2E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'Rubik, sans-serif' }}>BrickByGal © 2025</span>

        {/* Center — decorative bricks */}
        <div className="flex gap-2 items-center">
          {['#2563EB', '#60A5FA', '#1E3A5F', '#60A5FA', '#2563EB'].map((c, i) => (
            <BrickIcon key={i} color={c} />
          ))}
        </div>

        {/* Right — social links */}
        <div className="flex gap-4 items-center">
          <a href="#" aria-label="Instagram" className="text-2xl transition-opacity" style={{ opacity: 0.6 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
          >📸</a>
          <a href="#" aria-label="YouTube" className="text-2xl transition-opacity" style={{ opacity: 0.6 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
          >▶️</a>
        </div>
      </div>
      <p className="text-center text-sm mt-4" style={{ color: '#94A3B8', opacity: 0.5, fontFamily: 'Rubik, sans-serif' }}>נבנה עם ❤️ ולגו</p>
    </footer>
  )
}
