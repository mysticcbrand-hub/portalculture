'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function usePageTransition() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionTo = (url: string, external = false) => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      if (external) {
        window.location.href = url
      } else {
        router.push(url)
      }
    }, 300) // Fade out before navigation
  }

  return { transitionTo, isTransitioning }
}
