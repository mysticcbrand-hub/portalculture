'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detect mobile/tablet
    const checkMobile = () => {
      const ua = navigator.userAgent
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      const isIOS = /iPhone|iPad|iPod/i.test(ua)
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
      // Use GIF on mobile, touch devices, iOS, or Safari
      return isTouchDevice || isSmallScreen || isIOS || isSafari
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

  // Try to play video on desktop
  useEffect(() => {
    if (isMobile || !videoRef.current) return

    const video = videoRef.current
    video.muted = true
    video.playsInline = true
    
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoCanPlay(true))
        .catch(() => setVideoCanPlay(false))
    }
  }, [isMobile])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo Container */}
      <div className="relative flex items-center justify-center logo-wrapper">
        
        {/* DESKTOP: MP4 Video (better quality, smaller file) */}
        {!isMobile && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className={`logo-media ${videoCanPlay ? 'loaded' : ''}`}
            onCanPlay={() => setVideoCanPlay(true)}
          >
            <source src="/logo-3d.mp4" type="video/mp4" />
          </video>
        )}

        {/* MOBILE: WebP animado (ligero, autoplay garantizado) */}
        {isMobile && (
          <picture>
            <source srcSet="/logo-3d.webp" type="image/webp" />
            <Image
              src="/logo-3d-small.gif"
              alt="Portal Culture"
              width={480}
              height={480}
              priority
              unoptimized
              className={`logo-media ${isLoaded ? 'loaded' : ''}`}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
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
          transition: opacity 0.4s ease;
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
