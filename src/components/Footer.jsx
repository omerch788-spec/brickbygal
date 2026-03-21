const BrickIcon = ({ color = '#FFD700' }) => (
  <svg width="24" height="18" viewBox="0 0 24 18" className="inline-block">
    <rect x="0" y="5" width="24" height="13" rx="2" fill={color} />
    <rect x="2" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
    <rect x="10" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
    <rect x="16" y="1" width="6" height="6" rx="3" fill={color} opacity="0.7" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <span className="text-sm opacity-70">BrickByGal © 2025</span>

        {/* Center — decorative bricks */}
        <div className="flex gap-2 items-center">
          {['#E3000B', '#FFD700', '#006DB7', '#00A850', '#E3000B'].map((c, i) => (
            <BrickIcon key={i} color={c} />
          ))}
        </div>

        {/* Right — social links */}
        <div className="flex gap-4 items-center">
          <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity text-2xl">📸</a>
          <a href="#" aria-label="YouTube" className="opacity-70 hover:opacity-100 transition-opacity text-2xl">▶️</a>
        </div>
      </div>
      <p className="text-center text-sm opacity-40 mt-4">נבנה עם ❤️ ולגו</p>
    </footer>
  )
}
