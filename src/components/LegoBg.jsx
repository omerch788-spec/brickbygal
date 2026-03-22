import { useEffect, useRef } from 'react'

const IMAGES = [
  '/brickbygal/brickred.png',
  '/brickbygal/brickyellow.png',
  '/brickbygal/brickblue.png',
  '/brickbygal/brickgreen.png',
]

function createBrick(container, isMobile) {
  const src   = IMAGES[Math.floor(Math.random() * IMAGES.length)]
  const scale = isMobile
    ? 0.5 + Math.random() * 0.7          // 0.5–1.2 on mobile
    : 0.5 + Math.random() * 0.9          // 0.5–1.4 on desktop

  const img = document.createElement('img')
  img.src = src
  img.style.cssText = `
    position: absolute;
    width: 80px;
    height: auto;
    image-rendering: auto;
    user-select: none;
    pointer-events: none;
  `

  const startX  = Math.random() * 110 - 5
  const duration = 12 + Math.random() * 20
  const delay    = Math.random() * -30
  const drift    = (Math.random() - 0.5) * (isMobile ? 6 : 15)
  const rotStart = Math.random() * 360
  const rotEnd   = rotStart + (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 270)

  img.style.left   = startX + 'vw'
  img.style.bottom = '-120px'

  const anim = img.animate([
    { transform: `scale(${scale}) translateX(0vw) rotate(${rotStart}deg)`, opacity: 0,    bottom: '-120px' },
    { opacity: 0.5, offset: 0.05 },
    { opacity: 0.5, offset: 0.9 },
    { transform: `scale(${scale}) translateX(${drift}vw) rotate(${rotEnd}deg)`, opacity: 0, bottom: '110vh' },
  ], {
    duration: duration * 1000,
    delay: delay * 1000,
    iterations: Infinity,
    easing: 'linear',
    fill: 'both',
  })

  container.appendChild(img)
  return { el: img, anim }
}

export default function LegoBg() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const isMobile  = window.innerWidth < 768
    const count     = isMobile
      ? 13                                          // fixed 13 on mobile
      : Math.min(22, Math.floor(window.innerWidth / 60))
    const bricks = []
    for (let i = 0; i < count; i++) bricks.push(createBrick(container, isMobile))
    return () => bricks.forEach(b => { b.anim.cancel(); b.el.remove() })
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  )
}
