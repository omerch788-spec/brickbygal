import { useEffect, useRef } from 'react'

const COLORS = [
  { top: '#e3000b', side: '#a30008', front: '#c20009' },  // red
  { top: '#f5c400', side: '#b38f00', front: '#d9ac00' },  // yellow
  { top: '#006db7', side: '#004f85', front: '#005f9e' },  // blue
  { top: '#00a650', side: '#007538', front: '#008f46' },  // green
]

const BRICK_CONFIGS = [
  { cols: 2, rows: 1 },
  { cols: 4, rows: 2 },
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
]

const UNIT = 18   // px per stud unit
const H    = 11   // brick height
const SIDE = 5    // right face width (perspective)

function createBrick(container) {
  const cfg   = BRICK_CONFIGS[Math.floor(Math.random() * BRICK_CONFIGS.length)]
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const scale = 0.5 + Math.random() * 0.9

  const W = cfg.cols * UNIT
  const D = cfg.rows * UNIT

  const wrapper = document.createElement('div')
  wrapper.style.cssText = `
    position: absolute;
    width: ${W + SIDE}px;
    height: ${H + D}px;
    transform-style: preserve-3d;
    transform: scale(${scale});
    transform-origin: center bottom;
  `

  // Top face
  const top = document.createElement('div')
  top.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    width: ${W}px;
    height: ${D}px;
    background: ${color.top};
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
  `
  // Studs on top
  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      const stud = document.createElement('div')
      const sw = UNIT * 0.55
      const sh = UNIT * 0.35
      stud.style.cssText = `
        position: absolute;
        width: ${sw}px;
        height: ${sh}px;
        left: ${c * UNIT + (UNIT - sw) / 2}px;
        top:  ${r * UNIT + (UNIT - sh) / 2}px;
        background: ${color.top};
        border-radius: 50%;
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 0 1.5px rgba(0,0,0,0.18);
      `
      top.appendChild(stud)
    }
  }
  wrapper.appendChild(top)

  // Front face
  const front = document.createElement('div')
  front.style.cssText = `
    position: absolute;
    left: 0;
    top: ${D}px;
    width: ${W}px;
    height: ${H}px;
    background: ${color.front};
    box-shadow: inset 0 -3px 6px rgba(0,0,0,0.2);
  `
  wrapper.appendChild(front)

  // Right face
  const right = document.createElement('div')
  right.style.cssText = `
    position: absolute;
    left: ${W}px;
    top: ${SIDE * 0.5}px;
    width: ${SIDE}px;
    height: ${H + D - SIDE * 0.5}px;
    background: ${color.side};
    clip-path: polygon(0 0, ${SIDE}px ${-SIDE * 0.5}px, ${SIDE}px ${H + D - SIDE}px, 0 ${H + D - SIDE * 0.5}px);
    box-shadow: inset -2px 0 6px rgba(0,0,0,0.3);
  `
  wrapper.appendChild(right)

  // Top-right slant
  const slant = document.createElement('div')
  slant.style.cssText = `
    position: absolute;
    left: ${W}px;
    top: 0;
    width: ${SIDE}px;
    height: ${SIDE * 0.5}px;
    background: ${color.side};
    clip-path: polygon(0 ${SIDE * 0.5}px, ${SIDE}px 0, ${SIDE}px 0, 0 ${SIDE * 0.5}px);
  `
  wrapper.appendChild(slant)

  // Position & animate
  const startX = Math.random() * 110 - 5   // vw
  const duration = 12 + Math.random() * 20  // s
  const delay = Math.random() * -30          // s (negative = start mid-way)
  const drift = (Math.random() - 0.5) * 15  // vw horizontal drift
  const rotStart = Math.random() * 360
  const rotEnd = rotStart + (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 270)

  wrapper.style.left = startX + 'vw'
  wrapper.style.bottom = '-120px'

  const anim = wrapper.animate([
    { transform: `scale(${scale}) translateX(0vw) rotate(${rotStart}deg)`, opacity: 0,   bottom: '-120px' },
    { opacity: 0.45, offset: 0.05 },
    { opacity: 0.45, offset: 0.9 },
    { transform: `scale(${scale}) translateX(${drift}vw) rotate(${rotEnd}deg)`, opacity: 0, bottom: '110vh' },
  ], {
    duration: duration * 1000,
    delay: delay * 1000,
    iterations: Infinity,
    easing: 'linear',
    fill: 'both',
  })

  container.appendChild(wrapper)
  return { el: wrapper, anim }
}

export default function LegoBg() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const bricks = []
    const count = Math.min(22, Math.floor(window.innerWidth / 60))
    for (let i = 0; i < count; i++) bricks.push(createBrick(container))
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
