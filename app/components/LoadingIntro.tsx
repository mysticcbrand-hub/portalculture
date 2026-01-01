'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    
    // Add class to body for content fade-in coordination
    document.body.classList.add('intro-loading')

    // Try to play video immediately
    if (videoRef.current) {
      const playVideo = () => {
        const video = videoRef.current
        if (video) {
          video.play().catch(() => {
            // Retry after a short delay
            setTimeout(() => video.play().catch(() => {}), 50)
          })
        }
      }
      
      // Multiple attempts to ensure playback
      playVideo()
      setTimeout(playVideo, 100)
      setTimeout(playVideo, 200)
    }

    // Hide intro after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Remove loading class to trigger content fade-in
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
      {/* Logo 3D Video - Centered */}
      <div className="relative flex items-center justify-center logo-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="logo-video"
          loop
          defaultMuted
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          onLoadedMetadata={(e) => {
            // Play as soon as metadata is loaded
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            // Play when can play
            e.currentTarget.play().catch(() => {})
          }}
          onLoadedData={(e) => {
            console.log('Video loaded and playing')
            // Force play on mobile
            const playPromise = e.currentTarget.play()
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.log('Autoplay prevented, retrying...', error)
                setTimeout(() => e.currentTarget.play().catch(() => {}), 100)
              })
            }
          }}
          onError={(e) => console.error('Video error:', e)}
        >
          <source src="/logo-3d.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
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
