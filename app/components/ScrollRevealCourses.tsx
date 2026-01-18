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
  
  // Mobile carousel state
  const [isMobile, setIsMobile] = useState(false)
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px',
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  // Scroll-driven animations - OPTIMIZED for mobile
  useEffect(() => {
    let ticking = false
    const isMobile = window.matchMedia('(max-width: 768px)').matches

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
            // On mobile, reduce the effect intensity
            const rawProgress = (cardCenter - windowCenter) / windowCenter
            const progress = isMobile ? rawProgress * 0.3 : rawProgress // Reduce effect on mobile
            
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
  }, [])

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

  // Touch handlers for carousel
  const handleTouchStartCarousel = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMoveCarousel = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEndCarousel = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const threshold = 50
    
    if (distance > threshold && currentCourseIndex < courses.length - 1) {
      // Swiped left - next course
      setCurrentCourseIndex(prev => prev + 1)
    }
    
    if (distance < -threshold && currentCourseIndex > 0) {
      // Swiped right - previous course
      setCurrentCourseIndex(prev => prev - 1)
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  const goToCourse = (index: number) => {
    setCurrentCourseIndex(index)
  }

  return (
    <section id="cursos" className="relative py-12 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-32">
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

        {/* Mobile: Horizontal Carousel - Desktop: Vertical Stack */}
        {isMobile ? (
          <div className="relative px-4">
            {/* Carousel */}
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStartCarousel}
              onTouchMove={handleTouchMoveCarousel}
              onTouchEnd={handleTouchEndCarousel}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentCourseIndex * 100}%)` }}
              >
                {courses.map((course) => (
                  <div key={course.id} className="w-full flex-shrink-0 px-2">
                    <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 min-h-[400px] overflow-hidden">
                      {/* Background Image */}
                      {course.id === 1 && (
                        <div className="absolute inset-0 opacity-25">
                          <img src="/atenas-bg.png" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}
                      {course.id === 2 && (
                        <div className="absolute inset-0 opacity-25">
                          <img src="/ares-bg.png" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}
                      {course.id === 3 && (
                        <div className="absolute inset-0 opacity-25">
                          <img src="/apolo-bg.png" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}
                      {course.id === 4 && (
                        <div className="absolute inset-0 opacity-25">
                          <img src="/zeus-bg.png" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}
                      {course.id === 5 && (
                        <div className="absolute inset-0 opacity-25">
                          <img src="/adonis-bg.png" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}

                      {/* Big number background */}
                      <div
                        className="absolute top-4 left-4 text-[5rem] font-bold leading-none pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          opacity: 0.08,
                        }}
                      >
                        {course.number}
                      </div>

                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-12 h-12">
                        <img 
                          src={course.icon} 
                          alt={course.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between pt-16">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{course.title}</h3>
                          <p className="text-base text-white/70 leading-relaxed mb-4">{course.description}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className={`tag tag-${tag.variant} inline-block px-3 py-1.5 rounded-full text-xs font-medium border`}
                              >
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Swipe hint */}
                        {currentCourseIndex < courses.length - 1 && (
                          <div className="flex justify-center items-center gap-2 text-xs text-white/30 mt-6">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Desliza para ver más
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bars (like Instagram Stories) */}
            <div className="flex gap-1 mt-4">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCourse(index)}
                  className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
                >
                  <div 
                    className={`h-full bg-white transition-all duration-300 ${
                      index === currentCourseIndex ? 'w-full' : index < currentCourseIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => currentCourseIndex > 0 && goToCourse(currentCourseIndex - 1)}
                disabled={currentCourseIndex === 0}
                className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-white/50 font-mono">
                {currentCourseIndex + 1} / {courses.length}
              </span>
              <button
                onClick={() => currentCourseIndex < courses.length - 1 && goToCourse(currentCourseIndex + 1)}
                disabled={currentCourseIndex === courses.length - 1}
                className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // Desktop: Vertical stack
          <div className="space-y-6 md:space-y-40 max-w-4xl mx-auto px-1 md:px-0" ref={sectionRef}>
            {courses.map((course, index) => {
            const pos = mousePositions[course.id] || { x: 0, y: 0, spotX: 50, spotY: 50 }
            const progress = scrollProgress[index] || 0
            
            // Check if mobile for simpler transforms
            const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768
            
            // Calculate scroll-driven transforms - SIMPLIFIED for mobile
            const scrollScale = isMobileView ? 1 : 1 - Math.abs(progress) * 0.05
            const scrollOpacity = isMobileView ? 1 : 1 - Math.abs(progress) * 0.2
            const scrollBlur = isMobileView ? 0 : (Math.abs(progress) > 0.5 ? Math.abs(progress) * 1.5 : 0)
            const scrollY = isMobileView ? 0 : progress * 30
            const scrollRotateX = isMobileView ? 0 : progress * -3

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
                  transform: isMobileView 
                    ? 'none' 
                    : `perspective(1000px) rotateX(${pos.x + scrollRotateX}deg) rotateY(${pos.y}deg) scale3d(${scrollScale}, ${scrollScale}, 1) translateY(${scrollY}px) translateZ(0)`,
                  opacity: scrollOpacity,
                  filter: scrollBlur > 0 ? `blur(${scrollBlur}px)` : 'none',
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
          transform: translateY(30px);
          transition: none;
          will-change: transform, opacity;
        }

        .course-card.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        @media (min-width: 768px) {
          .course-card {
            transform: perspective(1000px) translateY(60px) rotateX(-15deg);
            backface-visibility: hidden;
          }
          
          .course-card.visible {
            transform: perspective(1000px) translateY(0) rotateX(0deg);
            transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
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
