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
    icon: '🧠',
  },
  {
    id: 2,
    number: '02',
    title: 'Templo de Ares',
    description: 'Construye un físico de Dios Griego con rutinas y planes nutricionales',
    tags: [{ text: 'Premium', variant: 'premium' }],
    icon: '💪',
  },
  {
    id: 3,
    number: '03',
    title: 'Templo de Apolo',
    description: 'Eleva tu carisma, haciendo que la gente ame estar contigo',
    tags: [{ text: 'Actualizado', variant: 'updated' }],
    icon: '🗣️',
  },
  {
    id: 4,
    number: '04',
    title: 'Templo de Zeus',
    description: 'Conviértete en ultraproductivo y nunca más te sentirás estancado',
    tags: [{ text: 'Popular', variant: 'popular' }],
    icon: '⚡',
  },
  {
    id: 5,
    number: '05',
    title: 'Templo de Adonis',
    description: 'Conviértete en el hombre masculino que atrae a mujeres sin quererlo',
    tags: [{ text: 'Nuevo', variant: 'new' }, { text: 'Premium', variant: 'premium' }],
    icon: '🧲',
  },
]

export default function ScrollRevealCourses() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number; spotX: number; spotY: number } }>({})
  const [scrollProgress, setScrollProgress] = useState<{ [key: number]: number }>({})

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

  // Scroll-driven animations
  useEffect(() => {
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
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, courseId: number) => {
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

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-32">
          <span className="font-mono text-xs tracking-wider text-white/30 mb-4 block">/ 03</span>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] mb-6">
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
          <p className="text-xl md:text-2xl text-white/70 font-light">Diseñados para resolver todos tus problemas</p>
        </div>

        {/* Course Cards */}
        <div className="space-y-32 md:space-y-40 max-w-4xl mx-auto" ref={sectionRef}>
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
                <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-12 min-h-[280px] overflow-hidden">
                  {/* Background Images for all courses */}
                  {course.id === 1 && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/atenas-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 2 && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/ares-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 3 && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/apolo-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 4 && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/zeus-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  {course.id === 5 && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img src="/adonis-bg.png" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  

                  {/* Big number background */}
                  <div
                    className="absolute top-6 left-8 text-[6rem] md:text-[8rem] font-bold leading-none pointer-events-none"
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
                  <div className="absolute top-8 right-8 text-5xl md:text-6xl transition-transform duration-300 group-hover:rotate-6">
                    {course.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-[70%]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">{course.title}</h3>
                    <p className="text-base md:text-lg text-white/65 leading-relaxed mb-6">{course.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`tag tag-${tag.variant} inline-block px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300`}
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

        .course-card {
          position: relative;
        }

        .course-card::after {
          content: '';
          position: absolute;
          inset: -40px;
          border-radius: 40px;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          filter: blur(40px);
          z-index: -1;
        }

        .course-card:hover::after {
          opacity: 1;
        }

        .course-card > div {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, background-color 0.3s, box-shadow 0.5s;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        .course-card:hover > div {
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 4px 20px rgba(0, 0, 0, 0.5);
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
