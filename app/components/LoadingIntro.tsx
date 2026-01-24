'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    // Detect iOS/Safari which has strict autoplay policies
    const isIOSorSafari = () => {
      const ua = navigator.userAgent
      const isIOS = /iPhone|iPad|iPod/i.test(ua)
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
      const isWebkit = 'webkitAudioContext' in window
      return isIOS || (isSafari && !('chrome' in window))
    }

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    document.body.classList.add('intro-loading')

    const video = videoRef.current
    let playInterval: NodeJS.Timeout | null = null
    let failureTimeout: NodeJS.Timeout | null = null

    if (video) {
      // Force all attributes
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      // Set volume to 0 as extra measure for Safari
      video.volume = 0
      
      // Track if video actually started playing
      const onPlaying = () => {
        hasPlayedRef.current = true
        if (failureTimeout) clearTimeout(failureTimeout)
      }
      video.addEventListener('playing', onPlaying)

      // Play attempt function
      const playVideo = () => {
        if (hasPlayedRef.current) return
        
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            // NotAllowedError means autoplay was blocked
            if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
              // On iOS/Safari, switch to fallback immediately
              if (isIOSorSafari()) {
                setVideoFailed(true)
              }
            }
          })
        }
      }
      
      // Initial play attempts
      playVideo()
      setTimeout(playVideo, 100)
      setTimeout(playVideo, 200)
      
      // Continuous retry for a short period
      playInterval = setInterval(() => {
        if (video.paused && !hasPlayedRef.current && !videoFailed) {
          playVideo()
        }
      }, 150)

      // If video hasn't played after 500ms, show fallback
      failureTimeout = setTimeout(() => {
        if (!hasPlayedRef.current) {
          setVideoFailed(true)
        }
      }, 500)

      // Hide intro after 2.5 seconds
      const timer = setTimeout(() => {
        if (playInterval) clearInterval(playInterval)
        setIsVisible(false)
        document.body.classList.remove('intro-loading')
        setTimeout(() => {
          document.body.style.overflow = 'unset'
        }, 800)
      }, 2500)

      return () => {
        clearTimeout(timer)
        if (playInterval) clearInterval(playInterval)
        if (failureTimeout) clearTimeout(failureTimeout)
        video.removeEventListener('playing', onPlaying)
        document.body.style.overflow = 'unset'
        document.body.classList.remove('intro-loading')
      }
    }

    // Fallback if no video element
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
  }, [videoFailed])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo Container */}
      <div className="relative flex items-center justify-center logo-wrapper">
        {/* Video - hidden when failed */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`logo-video ${videoFailed ? 'hidden' : ''}`}
          loop
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 280'%3E%3Crect fill='%23000000' width='280' height='280'/%3E%3C/svg%3E"
          // @ts-ignore - webkit-playsinline is needed for older iOS
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          onLoadedMetadata={(e) => {
            const vid = e.currentTarget
            vid.muted = true
            vid.volume = 0
            vid.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            const vid = e.currentTarget
            vid.muted = true
            vid.volume = 0
            vid.play().catch(() => {})
          }}
        >
          <source src="/logo-3d.mp4" type="video/mp4" />
        </video>

        {/* Fallback: Animated Logo for Safari/iOS */}
        {videoFailed && (
          <div className="logo-fallback">
            <div className="logo-circle">
              <div className="logo-inner">
                <span className="logo-text">P</span>
              </div>
              <div className="logo-ring"></div>
              <div className="logo-ring ring-2"></div>
              <div className="logo-glow"></div>
            </div>
          </div>
        )}
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

        .logo-video.hidden {
          display: none;
        }

        /* Fallback Animated Logo */
        .logo-fallback {
          width: clamp(200px, 50vw, 280px);
          height: clamp(200px, 50vw, 280px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-circle {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-inner {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          animation: innerPulse 2s ease-in-out infinite;
        }

        .logo-text {
          font-family: 'VeryVogue', serif;
          font-size: 48px;
          font-weight: 400;
          background: linear-gradient(180deg, #ffffff 0%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShine 2s ease-in-out infinite;
        }

        .logo-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: ringPulse 2s ease-in-out infinite;
        }

        .logo-ring.ring-2 {
          inset: -20px;
          border-color: rgba(255, 255, 255, 0.05);
          animation-delay: 0.3s;
        }

        .logo-glow {
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          animation: glowPulse 2s ease-in-out infinite;
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

        @keyframes innerPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.15);
          }
        }

        @keyframes textShine {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}
