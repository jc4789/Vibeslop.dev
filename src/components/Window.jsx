import { useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function Window({ title, icon = '▣', children, className = '', floating = false, onClose }) {
  const [minimized, setMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const origin = useRef(null)
  function move(event) {
    if (!origin.current) return
    const { rect, x, y, startX, startY } = origin.current
    setPosition({ x: x + Math.max(-rect.left + 4, Math.min(window.innerWidth - rect.right - 4, event.clientX - startX)), y: y + Math.max(-rect.top + 4, Math.min(window.innerHeight - rect.bottom - 4, event.clientY - startY)) })
  }
  return <motion.section className={`retro-window ${floating ? 'floating-window' : ''} ${className}`} style={floating ? { x: position.x, y: position.y } : undefined}>
    <div className={`window-title ${floating ? 'draggable' : ''}`} onPointerDown={event => {
      if (!floating || window.innerWidth <= 600 || event.target.closest('button')) return
      origin.current = { ...position, rect: event.currentTarget.parentElement.getBoundingClientRect(), startX: event.clientX, startY: event.clientY }
      event.currentTarget.setPointerCapture(event.pointerId)
    }} onPointerMove={move} onPointerUp={() => { origin.current = null }} onPointerCancel={() => { origin.current = null }}>
      <span>{icon} {title}</span><div className="window-controls"><button type="button" aria-label={`${title}を${minimized ? '開く' : '最小化'}`} onClick={() => setMinimized(!minimized)}>{minimized ? '□' : '−'}</button>{onClose && <button type="button" aria-label={`${title}を閉じる`} onClick={onClose}>×</button>}</div>
    </div>
    <div hidden={minimized} className="window-content">{children}</div>
  </motion.section>
}
