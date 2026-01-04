'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
    }
    setIsMobile(checkMobile())

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    
    // Add class to body for content fade-in coordination
    document.body.classList.add('intro-loading')

    // Aggressive video play strategy
    const video = videoRef.current
    if (video) {
      // Force all attributes
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      
      // Multiple play attempts with delays
      const playVideo = () => {
        video.play().catch(() => {
          // Retry after small delay
          setTimeout(() => video.play().catch(() => {}), 50)
        })
      }
      
      // Immediate attempt
      playVideo()
      
      // Retry after 100ms
      setTimeout(playVideo, 100)
      
      // Retry after 200ms
      setTimeout(playVideo, 200)
      
      // Continuous retry every 100ms
      const playInterval = setInterval(() => {
        if (video.paused) {
          playVideo()
        }
      }, 100)

      // Hide intro after 2.5 seconds
      const timer = setTimeout(() => {
        clearInterval(playInterval)
        setIsVisible(false)
        // Remove loading class to trigger content fade-in
        document.body.classList.remove('intro-loading')
        setTimeout(() => {
          document.body.style.overflow = 'unset'
        }, 800)
      }, 2500)

      return () => {
        clearTimeout(timer)
        clearInterval(playInterval)
        document.body.style.overflow = 'unset'
        document.body.classList.remove('intro-loading')
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('intro-loading')
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo - Video */}
      <div className="relative flex items-center justify-center logo-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="logo-video"
          loop
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 280'%3E%3Crect fill='%23000000' width='280' height='280'/%3E%3C/svg%3E"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          onLoadedData={(e) => {
            e.currentTarget.muted = true  
            e.currentTarget.play().catch(() => {})
          }}
          onClick={(e) => {
            // Fallback: if user clicks, play
            e.currentTarget.play().catch(() => {})
          }}
        >
          <source src="/logo-3d.mp4" type="video/mp4" />
        </video>
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 1s cubic-bezier(0.4, 0, 0.2, 1) 2.5s forwards;
        }

        .logo-wrapper {
          opacity: 0;
          animation: logoRise 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }

        .logo-video {
          width: clamp(200px, 50vw, 280px);
          height: clamp(200px, 50vw, 280px);
          object-fit: contain;
        }

        @keyframes logoRise {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          50% {
            opacity: 0.8;
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
          }
        }
      `}</style>
    </div>
  )
}
