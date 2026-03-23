import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback, useEffect } from 'react'

function VideoTabs({ videos }) {
  const [active, setActive] = useState(0)

  return (
    <div className="mt-5">
      <div className="flex gap-2 mb-3">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              fontFamily: 'Heebo, sans-serif',
              fontWeight: 700,
              padding: '6px 18px',
              borderRadius: 999,
              fontSize: 14,
              cursor: 'pointer',
              background: active === i ? '#2563EB' : 'transparent',
              color: active === i ? 'white' : '#94A3B8',
              border: `1px solid ${active === i ? '#2563EB' : 'rgba(96,165,250,0.2)'}`,
              transition: 'all 0.2s ease',
            }}
          >
            {`סרטון ${i + 1}`}
          </button>
        ))}
      </div>
      {videos.map((src, i) => (
        <iframe
          key={i}
          src={active === i ? src : ''}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            display: active === i ? 'block' : 'none',
            width: '100%',
            aspectRatio: '9/16',
            borderRadius: 12,
            border: 'none',
          }}
        />
      ))}
    </div>
  )
}

const BrickIcon = ({ filled }) => (
  <span style={{ color: filled ? '#60A5FA' : 'rgba(96,165,250,0.2)' }}>🧱</span>
)

const ZOOM_STEP = 0.25
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3

export default function ModelModal({ model, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [muted, setMuted] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [imgOpacity, setImgOpacity] = useState(1)
  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panStart = useRef({ x: 0, y: 0 })
  const audioRef = useRef(null)

  useEffect(() => {
    if (!model?.audio) return
    const audio = new Audio(model.audio)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    audio.play().catch(() => {})

    const fadeIn = setInterval(() => {
      if (audio.volume < 0.25) audio.volume = Math.min(0.3, audio.volume + 0.05)
      else clearInterval(fadeIn)
    }, 100)

    return () => {
      clearInterval(fadeIn)
      const snapshot = audio.volume
      let vol = snapshot
      const fadeOut = setInterval(() => {
        vol = Math.max(0, vol - 0.05)
        audio.volume = vol
        if (vol <= 0) { audio.pause(); audio.src = ''; clearInterval(fadeOut) }
      }, 100)
    }
  }, [model?.audio])

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted
    setMuted(m => !m)
  }

  const switchImg = (i) => {
    if (i === activeImg) return
    setImgOpacity(0)
    setTimeout(() => {
      setActiveImg(i)
      setZoom(1)
      setPan({ x: 0, y: 0 })
      setImgOpacity(1)
    }, 200)
  }

  if (!model) return null

  const clampZoom = (z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z))

  const zoomIn  = () => { setZoom(z => clampZoom(z + ZOOM_STEP)); if (zoom <= 1) setPan({ x: 0, y: 0 }) }
  const zoomOut = () => { setZoom(z => clampZoom(z - ZOOM_STEP)); if (zoom - ZOOM_STEP <= 1) setPan({ x: 0, y: 0 }) }
  const reset   = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const imgContainerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const activeImgRef = useRef(activeImg)
  activeImgRef.current = activeImg

  useEffect(() => {
    if (!model?.images) return
    const el = imgContainerRef.current
    if (!el) return

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (touchStartX.current === null) return
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
      if (dx > dy && dx > 10) e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return
      const dx = touchStartX.current - e.changedTouches[0].clientX
      touchStartX.current = null
      touchStartY.current = null
      if (Math.abs(dx) < 50) return
      const cur = activeImgRef.current
      const next = dx > 0
        ? Math.min(cur + 1, model.images.length - 1)
        : Math.max(cur - 1, 0)
      switchImg(next)
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [model?.images])

  const onWheel = (e) => {
    e.preventDefault()
    setZoom(z => clampZoom(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)))
  }

  const onMouseDown = (e) => {
    if (zoom <= 1) return
    dragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    panStart.current = { ...pan }
    e.preventDefault()
  }
  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    })
  }, [])
  const onMouseUp = () => { dragging.current = false }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="rounded-2xl max-w-lg w-full"
          style={{ background: '#1E3A5F', border: '1px solid rgba(96,165,250,0.2)', overflowY: 'auto', maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative">
            <div
              ref={imgContainerRef}
              style={{
                overflow: 'hidden',
                background: '#1E3A5F',
                cursor: zoom > 1 ? 'grab' : 'default',
                userSelect: 'none',
              }}
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <img
                src={model.images ? model.images[activeImg] : model.image}
                alt={model.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  background: '#1E3A5F',
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: dragging.current ? 'none' : 'transform 0.2s ease',
                  transformOrigin: 'center center',
                  opacity: imgOpacity,
                }}
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 left-3 rounded-full w-9 h-9 flex items-center justify-center font-bold text-xl transition-colors text-white"
              style={{ background: 'rgba(15,28,46,0.8)', border: '1px solid rgba(96,165,250,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(15,28,46,0.8)'}
            >
              ✕
            </button>

            {model.audio && (
              <button
                onClick={toggleMute}
                className="absolute top-3 rounded-full w-9 h-9 flex items-center justify-center text-lg transition-colors text-white"
                style={{ left: 52, background: 'rgba(15,28,46,0.8)', border: '1px solid rgba(96,165,250,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(15,28,46,0.8)'}
                title={muted ? 'הפעל מוזיקה' : 'השתק מוזיקה'}
              >
                {muted ? '🔇' : '🎵'}
              </button>
            )}
            <span
              className="absolute top-3 right-3 font-bold text-sm px-3 py-1 rounded-full"
              style={{ background: 'rgba(96,165,250,0.15)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.3)', fontFamily: 'Heebo, sans-serif' }}
            >
              {model.category}
            </span>
          </div>

          {/* Thumbnail gallery (only for models with multiple images) */}
          {model.images && (
            <div className="flex gap-2 px-3 py-2" style={{ background: '#0F1C2E' }}>
              {model.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => switchImg(i)}
                  style={{
                    flex: 1,
                    padding: 0,
                    border: `2px solid ${activeImg === i ? '#2563EB' : 'rgba(96,165,250,0.15)'}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                    background: '#1E3A5F',
                  }}
                >
                  <img
                    src={src}
                    alt={`תמונה ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center justify-center gap-2 py-3 px-4" style={{ borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
            <button
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              style={{
                background: zoom <= ZOOM_MIN ? 'rgba(37,99,235,0.3)' : '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                fontSize: 16,
                cursor: zoom <= ZOOM_MIN ? 'default' : 'pointer',
                transition: 'background 0.15s',
              }}
            >🔍-</button>

            <span
              onClick={reset}
              style={{
                color: '#60A5FA',
                fontFamily: 'Heebo, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                minWidth: 46,
                textAlign: 'center',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 8,
                background: 'rgba(96,165,250,0.08)',
                border: '1px solid rgba(96,165,250,0.2)',
              }}
              title="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              style={{
                background: zoom >= ZOOM_MAX ? 'rgba(37,99,235,0.3)' : '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                fontSize: 16,
                cursor: zoom >= ZOOM_MAX ? 'default' : 'pointer',
                transition: 'background 0.15s',
              }}
            >🔍+</button>

            <button
              onClick={reset}
              style={{
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.15s',
                marginRight: 4,
              }}
              title="Reset"
            >↺</button>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'Varela Round, sans-serif' }}>{model.name}</h2>
            <p className="mb-4" style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>{model.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'חלקים', value: model.pieces != null ? model.pieces.toLocaleString() : '~' },
                { label: 'זמן בנייה', value: model.buildTime },
                { label: 'שנת בנייה', value: model.year },
                { label: 'רמת קושי', value: <span>{[1,2,3,4,5].map(n => <BrickIcon key={n} filled={n <= model.difficulty} />)}</span> },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3" style={{ background: '#0F1C2E', border: '1px solid rgba(96,165,250,0.15)' }}>
                  <div className="text-xs mb-1" style={{ color: '#94A3B8', fontFamily: 'Heebo, sans-serif' }}>{s.label}</div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Fun fact */}
            <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.25)' }}>
              <span className="font-black text-sm" style={{ color: '#60A5FA' }}>💡 עובדה מגניבה: </span>
              <span className="font-semibold text-sm text-white" style={{ fontFamily: 'Heebo, sans-serif' }}>{model.funFact}</span>
            </div>

            {/* Videos (only for models with videos) */}
            {model.videos && <VideoTabs videos={model.videos} />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
