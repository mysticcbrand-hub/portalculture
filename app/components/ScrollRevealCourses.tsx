'use client'

import { useEffect, useRef, useState } from 'react'

interface Course {
  id: number
  number: string
  title: string
  description: string
  tags: { text: string; variant: 'new' | 'premium' | 'updated' | 'popular' }[]
  icon: string
}

const courses: Course[] = [
  {
    id: 1,
    number: '01',
    title: 'Templo de Atenas',
    description: 'Invoca tu vida ideal y reconfigura tu mente',
    tags: [{ text: 'Nuevo', variant: 'new' }, { text: 'Esencial', variant: 'premium' }],
    icon: '/icons/ATENAS.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Templo de Ares',
    description: 'Construye un físico de Dios Griego con rutinas y planes nutricionales',
    tags: [{ text: 'Premium', variant: 'premium' }],
    icon: '/icons/ARES.png',
  },
  {
    id: 3,
    number: '03',
    title: 'Templo de Apolo',
    description: 'Eleva tu carisma, haciendo que la gente ame estar contigo',
    tags: [{ text: 'Actualizado', variant: 'updated' }],
    icon: '/icons/APOLO.png',
  },
  {
    id: 4,
    number: '04',
    title: 'Templo de Zeus',
    description: 'Conviértete en ultraproductivo y nunca más te sentirás estancado',
    tags: [{ text: 'Popular', variant: 'popular' }],
    icon: '/icons/ZEUS.png',
  },
  {
    id: 5,
    number: '05',
    title: 'Templo de Adonis',
    description: 'Conviértete en el hombre masculino que atrae a mujeres sin quererlo',
    tags: [{ text: 'Nuevo', variant: 'new' }, { text: 'Premium', variant: 'premium' }],
    icon: '/icons/ADONIS.png',
  },
]

export default function ScrollRevealCourses() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number; spotX: number; spotY: number } }>({})
  const [scrollProgress, setScrollProgress] = useState<{ [key: number]: number }>({})
  
  // Section visibility for smooth reveal
  const [isVisible, setIsVisible] = useState(false)
  
  // Mobile Stories-style carousel state
  const [isMobile, setIsMobile] = useState(false)
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const [progressAnimation, setProgressAnimation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Detect when section is in viewport - for both reveal AND auto-start stories
  const [hasStarted, setHasStarted] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (isMobile && !hasStarted) {
            setHasStarted(true) // Start stories when scrolled into view
          }
        }
      },
      { threshold: 0.15 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [isMobile, hasStarted])
  
  // Auto-advance like Instagram Stories (starts when section is visible)
  useEffect(() => {
    if (!isMobile || isDragging || isPaused || !hasStarted) return
    
    setProgressAnimation(0)
    const duration = 2500 // 2.5 seconds per story
    const interval = 50
    let progress = 0
    
    progressIntervalRef.current = setInterval(() => {
      progress += (interval / duration) * 100
      setProgressAnimation(progress)
      
      if (progress >= 100) {
        if (currentCourseIndex < courses.length - 1) {
          setCurrentCourseIndex(prev => prev + 1)
          progress = 0
          setProgressAnimation(0)
        } else {
          // Reset to first when reaching end
          setCurrentCourseIndex(0)
          progress = 0
          setProgressAnimation(0)
        }
      }
    }, interval)
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isMobile, currentCourseIndex, isDragging, isPaused, hasStarted])

  // Individual card reveal with stagger effect (desktop only)
  useEffect(() => {
    if (isMobile) return
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '-50px',
    })

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [isMobile])

  // Scroll-driven animations (desktop only)
  useEffect(() => {
    if (isMobile) return
    
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          cardsRef.current.forEach((card, index) => {
            if (!card) return

            const rect = card.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const cardCenter = rect.top + rect.height / 2
            const windowCenter = windowHeight / 2

            // Calculate progress: -1 (top of screen) to 1 (bottom of screen)
            const progress = (cardCenter - windowCenter) / windowCenter
            
            // Only animate when card is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              setScrollProgress(prev => ({
                ...prev,
                [index]: progress
              }))
            }
          })
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, courseId: number) => {
    // Skip 3D effect on mobile/touch devices for better performance
    if (window.matchMedia('(hover: none)').matches) return
    
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = x / rect.width
    const yPercent = y / rect.height

    const rotateY = (xPercent - 0.5) * 10
    const rotateX = (0.5 - yPercent) * 10

    const spotX = xPercent * 100
    const spotY = yPercent * 100

    setMousePositions((prev) => ({
      ...prev,
      [courseId]: { x: rotateX, y: rotateY, spotX, spotY },
    }))
  }

  const handleMouseLeave = (courseId: number) => {
    setMousePositions((prev) => ({
      ...prev,
      [courseId]: { x: 0, y: 0, spotX: 50, spotY: 50 },
    }))
  }

  // Touch handlers for carousel - with proper vertical scroll lock
  const swipeDirectionRef = useRef<'horizontal' | 'vertical' | null>(null)
  const startYRef = useRef(0)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    swipeDirectionRef.current = null
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    startYRef.current = e.touches[0].clientY
    setDragOffset(0)
    setIsPaused(true)
    setIsHorizontalSwipe(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - startX
    const deltaY = currentY - startYRef.current
    
    // Determine direction on first significant movement
    if (swipeDirectionRef.current === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        swipeDirectionRef.current = 'horizontal'
        setIsHorizontalSwipe(true)
      } else {
        swipeDirectionRef.current = 'vertical'
      }
    }
    
    // Only handle horizontal swipes
    if (swipeDirectionRef.current === 'horizontal') {
      e.preventDefault()
      e.stopPropagation()
      setDragOffset(deltaX)
    }
  }

  const handleTouchEnd = () => {
    const wasHorizontal = swipeDirectionRef.current === 'horizontal'
    const threshold = 50
    
    if (wasHorizontal && Math.abs(dragOffset) > threshold) {
      if (dragOffset < -threshold) {
        if (currentCourseIndex < courses.length - 1) {
          setCurrentCourseIndex(prev => prev + 1)
        } else {
          setCurrentCourseIndex(0)
        }
        setProgressAnimation(0)
      } else if (dragOffset > threshold) {
        if (currentCourseIndex > 0) {
          setCurrentCourseIndex(prev => prev - 1)
        } else {
          setCurrentCourseIndex(courses.length - 1)
        }
        setProgressAnimation(0)
      }
    }
    
    swipeDirectionRef.current = null
    setIsDragging(false)
    setIsPaused(false)
    setIsHorizontalSwipe(false)
    setDragOffset(0)
  }
  
  // Tap zones - Instagram Stories style with loop
  const handleTapZone = (zone: 'left' | 'right') => {
    setProgressAnimation(0)
    if (zone === 'right') {
      if (currentCourseIndex < courses.length - 1) {
        setCurrentCourseIndex(prev => prev + 1)
      } else {
        // Loop back to first
        setCurrentCourseIndex(0)
      }
    } else if (zone === 'left') {
      if (currentCourseIndex > 0) {
        setCurrentCourseIndex(prev => prev - 1)
      } else {
        // Loop to last
        setCurrentCourseIndex(courses.length - 1)
      }
    }
  }

  const goToCourse = (index: number) => {
    setCurrentCourseIndex(index)
    setDragOffset(0)
    setProgressAnimation(0)
  }

  return (
    <section id="cursos" className="relative py-12 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background */}
      {/* Subtle section accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className={`relative z-10 max-w-7xl mx-auto px-5 md:px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className={`text-center mb-8 md:mb-32 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="font-mono text-[10px] md:text-xs tracking-wider text-white/30 mb-2 md:mb-3 block">/ 03</span>
          <h2 className="text-[clamp(1.6rem,5vw,5rem)] font-bold leading-[1.1] mb-2 md:mb-6">
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Cursos Exclusivos
            </span>
          </h2>
          <p className="text-base md:text-2xl text-white/70 font-light px-4">Diseñados para resolver todos tus problemas</p>
        </div>

        {/* Mobile: Instagram Stories-style Carousel - Desktop: Vertical Stack */}
        {isMobile ? (
          <div className={`relative mb-8 px-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Stories Progress Bars - Top */}
            <div className="flex gap-1.5 mb-5">
              {courses.map((_, index) => (
                <button
                  key={index}
                  className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden transition-all cursor-pointer"
                  onClick={() => goToCourse(index)}
                >
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{
                      width: index < currentCourseIndex 
                        ? '100%' 
                        : index === currentCourseIndex 
                          ? `${progressAnimation}%`
                          : '0%',
                      transition: index === currentCourseIndex && !isDragging 
                        ? 'width 0.05s linear' 
                        : 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Card Container with tap zones */}
            <div 
              className="relative h-[480px] rounded-3xl overflow-hidden bg-black/20"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                clipPath: 'inset(0 0 0 0 round 1.5rem)',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                touchAction: isHorizontalSwipe ? 'pan-x' : 'pan-y',
              }}
            >
              {/* Invisible Tap Zones */}
              <div 
                className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer active:bg-white/3 transition-colors duration-200"
                onClick={() => handleTapZone('left')}
              />
              <div 
                className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer active:bg-white/3 transition-colors duration-200"
                onClick={() => handleTapZone('right')}
              />

              {/* Cards */}
              <div 
                className="flex h-full"
                style={{ 
                  transform: `translateX(calc(-${currentCourseIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                  transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              >
                {courses.map((course, index) => {
                  // Use vertical images for mobile (uppercase filenames)
                  const bgImages: { [key: number]: string } = {
                    1: '/ATENAS_VERTICAL.png',
                    2: '/ARES_VERTICAL.png', 
                    3: '/APOLO_VERTICAL.png',
                    4: '/ZEUS_VERTICAL.png',
                    5: '/ADONIS_VERTICAL.png'
                  }
                  
                  return (
                    <div key={course.id} className="w-full h-full flex-shrink-0 px-1">
                      <div className="relative w-full h-full rounded-3xl overflow-hidden">
                        {/* Background Image - Full screen */}
                        <div className="absolute inset-0">
                          <img 
                            src={bgImages[course.id]} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Glass shine - enhanced */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
                          }}
                        />
                        
                        {/* Border glow */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col p-6">
                          {/* Header with icon */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                <img 
                                  src={course.icon} 
                                  alt={course.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Templo</p>
                                <p className="text-white font-semibold">{course.title.split(' ').pop()}</p>
                              </div>
                            </div>
                            <span 
                              className="text-4xl font-black"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {course.number}
                            </span>
                          </div>

                          {/* Spacer */}
                          <div className="flex-1" />

                          {/* Main content - Bottom */}
                          <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                              {course.title}
                            </h3>
                            <p className="text-base text-white/90 leading-relaxed drop-shadow">
                              {course.description}
                            </p>
                            
                            {/* Tap hint */}
                            <div className="flex items-center justify-center gap-6 pt-4 text-white/40">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-xs">Toca izq</span>
                              </div>
                              <span className="text-xs">·</span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs">Toca der</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Course counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-white/40 font-mono">
                {currentCourseIndex + 1} / {courses.length}
              </span>
            </div>
          </div>
        ) : (
          // Desktop: Vertical stack with scroll-driven 3D animations
          <div className="space-y-32 md:space-y-40 max-w-4xl mx-auto">
            {courses.map((course, index) => {
            const pos = mousePositions[course.id] || { x: 0, y: 0, spotX: 50, spotY: 50 }
            const progress = scrollProgress[index] || 0
            
            // Calculate scroll-driven transforms
            const scrollScale = 1 - Math.abs(progress) * 0.05 // Scale down as it moves away from center
            const scrollOpacity = 1 - Math.abs(progress) * 0.2 // Fade as it moves away (reduced)
            const scrollBlur = Math.abs(progress) > 0.5 ? Math.abs(progress) * 1.5 : 0 // Blur only when far (max 1.5px)
            const scrollY = progress * 30 // Subtle parallax
            const scrollRotateX = progress * -3 // Perspective rotation based on scroll

            return (
              <div
                key={course.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="course-card group"
                onMouseMove={(e) => handleMouseMove(e, course.id)}
                onMouseLeave={() => handleMouseLeave(course.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${pos.x + scrollRotateX}deg) rotateY(${pos.y}deg) scale3d(${scrollScale}, ${scrollScale}, 1) translateY(${scrollY}px) translateZ(0)`,
                  opacity: scrollOpacity,
                  filter: `blur(${scrollBlur}px)`,
                  // @ts-ignore
                  '--spot-x': `${pos.spotX}%`,
                  '--spot-y': `${pos.spotY}%`,
                }}
              >
                {/* Backdrop blur card */}
                <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl md:rounded-3xl p-5 md:p-12 min-h-[180px] md:min-h-[280px] overflow-hidden">
                  {/* Background Images for all courses */}
                  {course.id === 1 && (
                    <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/atenas-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 2 && (
                    <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/ares-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 3 && (
                    <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/apolo-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 4 && (
                    <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/zeus-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 5 && (
                    <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/adonis-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  

                  {/* Big number background */}
                  <div
                    className="absolute top-3 left-4 md:top-6 md:left-8 text-[4rem] md:text-[8rem] font-bold leading-none pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: 0.06,
                    }}
                  >
                    {course.number}
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-20 md:h-20 transition-transform duration-300 group-hover:rotate-6">
                    <img 
                      src={course.icon} 
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-[75%] md:max-w-[70%]">
                    <h3 className="text-lg md:text-3xl font-semibold text-white mb-2 md:mb-4 tracking-tight">{course.title}</h3>
                    <p className="text-sm md:text-lg text-white/65 leading-relaxed mb-3 md:mb-6">{course.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`tag tag-${tag.variant} inline-block px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium border transition-all duration-300`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        )}
      </div>

      <style jsx>{`
        .course-card {
          opacity: 0;
          transform: perspective(1000px) translateY(60px) rotateX(-15deg);
          transition: none;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .course-card.visible {
          opacity: 1;
          transform: perspective(1000px) translateY(0) rotateX(0deg);
          transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .course-card > div {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s;
          box-shadow: 
            0 1px 2px rgba(0,0,0,0.3),
            0 2px 4px rgba(0,0,0,0.3),
            0 4px 8px rgba(0,0,0,0.3),
            0 8px 16px rgba(0,0,0,0.3),
            0 16px 32px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.5' numOctaves='1' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          background-blend-mode: overlay;
        }

        .course-card > div::before {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(1px);
          opacity: 0.5;
          z-index: -1;
          border-radius: inherit;
        }

        .course-card:hover > div {
          box-shadow: 
            0 2px 4px rgba(0,0,0,0.4),
            0 4px 8px rgba(0,0,0,0.4),
            0 8px 16px rgba(0,0,0,0.4),
            0 16px 32px rgba(0,0,0,0.4),
            0 32px 64px rgba(0,0,0,0.4),
            0 0 20px rgba(255,255,255,0.03),
            0 0 40px rgba(255,255,255,0.02),
            0 0 60px rgba(255,255,255,0.01),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .tag {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.8);
        }

        .tag-new {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        .tag-premium {
          background: rgba(234, 179, 8, 0.1);
          border-color: rgba(234, 179, 8, 0.3);
          color: #eab308;
        }

        .tag-updated {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }

        .tag-popular {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
      `}</style>
    </section>
  )
}
