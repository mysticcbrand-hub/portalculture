'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Smooth cursor follow
    const animateCursor = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY
      
      cursorX += dx * 0.2
      cursorY += dy * 0.2
      
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      
      requestAnimationFrame(animateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create trail effect
      createTrail(e.clientX, e.clientY)
    }

    // Trail ultra optimizado - sin bugs
    let trailQueue: HTMLElement[] = []
    let lastTrailTime = 0
    const MAX_TRAILS = 10
    
    const createTrail = (x: number, y: number) => {
      const now = Date.now()
      if (now - lastTrailTime < 60) return
      lastTrailTime = now

      // Cleanup old trails
      if (trailQueue.length >= MAX_TRAILS) {
        const oldTrail = trailQueue.shift()
        if (oldTrail?.parentNode) {
          oldTrail.remove()
        }
      }

      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      trail.style.cssText = `left: ${x}px; top: ${y}px; opacity: 0.6;`
      document.body.appendChild(trail)
      trailQueue.push(trail)

      requestAnimationFrame(() => {
        trail.style.opacity = '0'
        trail.style.transform = 'scale(1.5)'
      })

      setTimeout(() => {
        if (trail.parentNode) {
          trail.remove()
        }
        const idx = trailQueue.indexOf(trail)
        if (idx > -1) trailQueue.splice(idx, 1)
      }, 500)
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || !(target instanceof HTMLElement)) return
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('benefit-card')
      ) {
        document.body.classList.add('cursor-hover')
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || !(target instanceof HTMLElement)) return
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('benefit-card')
      ) {
        document.body.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  )
}
