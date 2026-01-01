'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function FloatingRocks() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Roca Grande - Top Right */}
      <div
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px] opacity-60"
        style={{
          transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5 + scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Image
          src="/roca_grande.png"
          alt=""
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Roca Pequeña 1 - Left Middle */}
      <div
        className="absolute top-[40%] left-[8%] w-[250px] h-[250px] opacity-50"
        style={{
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1 + scrollY * 0.15}px) rotate(${-scrollY * 0.03}deg)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <Image
          src="/roca_pequeña.png"
          alt=""
          fill
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* Roca Pequeña 2 - Bottom Right */}
      <div
        className="absolute bottom-[15%] right-[15%] w-[200px] h-[200px] opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2 + scrollY * 0.08}px) rotate(${scrollY * 0.04}deg)`,
          transition: 'transform 0.35s ease-out',
        }}
      >
        <Image
          src="/roca_pequeña2.png"
          alt=""
          fill
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* Roca Pequeña (repetida) - Top Left para balance */}
      <div
        className="absolute top-[25%] left-[2%] w-[180px] h-[180px] opacity-30"
        style={{
          transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5 + scrollY * 0.12}px) rotate(${-scrollY * 0.06}deg)`,
          transition: 'transform 0.45s ease-out',
        }}
      >
        <Image
          src="/roca_pequeña2.png"
          alt=""
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
    </div>
  )
}
