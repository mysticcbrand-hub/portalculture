'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    document.body.classList.add('intro-loading')

    // Hide intro after animation completes (2.5s display + 1s fade)
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.classList.remove('intro-loading')
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 800)
    }, 2500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('intro-loading')
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo Container */}
      <div className="relative flex items-center justify-center logo-wrapper">
        {/* GIF Logo - Works on ALL browsers including Safari/iOS */}
        <div className="logo-gif-container">
          <Image
            src="/logo-3d.gif"
            alt="Portal Culture"
            width={280}
            height={280}
            priority
            unoptimized // Important: don't optimize GIF to preserve animation
            className={`logo-gif ${isLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 1s cubic-bezier(0.4, 0, 0.2, 1) 2.5s forwards;
        }

        .logo-wrapper {
          opacity: 0;
          animation: logoRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }

        .logo-gif-container {
          width: clamp(180px, 45vw, 280px);
          height: clamp(180px, 45vw, 280px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        :global(.logo-gif) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        :global(.logo-gif.loaded) {
          opacity: 1;
        }

        @keyframes logoRise {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
}
