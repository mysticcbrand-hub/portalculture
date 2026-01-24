'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detect mobile/tablet
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < 1024
      return isSmallScreen
    }
    setIsMobile(checkMobile())

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    document.body.classList.add('intro-loading')

    // Hide intro after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.classList.remove('intro-loading')
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 800)
    }, 2800)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('intro-loading')
    }
  }, [])

  // Play video (works for both mobile and desktop)
  useEffect(() => {
    const video = isMobile ? mobileVideoRef.current : videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true
    
    // For iOS, we need to load and play after user gesture or immediately if allowed
    const attemptPlay = async () => {
      try {
        await video.load()
        await video.play()
        setVideoCanPlay(true)
      } catch (e) {
        // If autoplay fails, show video anyway (it will be paused but visible)
        setVideoCanPlay(true)
      }
    }
    
    attemptPlay()
  }, [isMobile])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo Container */}
      <div className="relative flex items-center justify-center logo-wrapper">
        
        {/* DESKTOP: MP4 Video (high quality) */}
        {!isMobile && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className={`logo-media ${videoCanPlay ? 'loaded' : ''}`}
            onCanPlayThrough={() => setVideoCanPlay(true)}
          >
            <source src="/logo-3d.mp4" type="video/mp4" />
          </video>
        )}

        {/* MOBILE: Optimized small MP4 (117KB, instant load) */}
        {isMobile && (
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className={`logo-media ${videoCanPlay ? 'loaded' : ''}`}
            onCanPlayThrough={() => setVideoCanPlay(true)}
            // iOS Safari specific attributes
            webkit-playsinline="true"
          >
            <source src="/logo-3d-mobile.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) 2.8s forwards;
        }

        .logo-wrapper {
          opacity: 0;
          animation: logoRise 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .logo-media {
          width: clamp(200px, 50vw, 300px);
          height: clamp(200px, 50vw, 300px);
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-media.loaded {
          opacity: 1;
        }

        @keyframes logoRise {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(0.98);
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
