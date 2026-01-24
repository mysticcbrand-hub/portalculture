'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Play video on desktop only
  useEffect(() => {
    if (isMobile || !videoRef.current) return

    const video = videoRef.current
    video.muted = true
    video.playsInline = true
    
    const attemptPlay = async () => {
      try {
        await video.play()
        setVideoCanPlay(true)
      } catch (e) {
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
        
        {/* DESKTOP: MP4 Video (high quality, animated) */}
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

        {/* MOBILE: Static image (no friction, instant load) */}
        {isMobile && (
          <Image
            src="/logo-3d-frame.png"
            alt="Portal Culture"
            width={400}
            height={400}
            priority
            className={`logo-media ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
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

        .logo-media,
        :global(.logo-media) {
          width: clamp(200px, 50vw, 300px);
          height: clamp(200px, 50vw, 300px);
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-media.loaded,
        :global(.logo-media.loaded) {
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
