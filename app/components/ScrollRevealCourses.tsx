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
    description: 'Sabiduría estratégica y toma de decisiones de alto impacto',
    tags: [{ text: 'Nuevo', variant: 'new' }, { text: 'Esencial', variant: 'premium' }],
    icon: '🦉',
  },
  {
    id: 2,
    number: '02',
    title: 'Templo de Ares',
    description: 'Mentalidad de guerrero y resiliencia inquebrantable',
    tags: [{ text: 'Premium', variant: 'premium' }],
    icon: '⚔️',
  },
  {
    id: 3,
    number: '03',
    title: 'Templo de Apolo',
    description: 'Excelencia personal y perfección en la ejecución',
    tags: [{ text: 'Actualizado', variant: 'updated' }],
    icon: '☀️',
  },
  {
    id: 4,
    number: '04',
    title: 'Templo de Zeus',
    description: 'Liderazgo autoritario y poder de influencia',
    tags: [{ text: 'Popular', variant: 'popular' }],
    icon: '⚡',
  },
  {
    id: 5,
    number: '05',
    title: 'Templo de Adonis',
    description: 'Construcción de marca personal y presencia magnética',
    tags: [{ text: 'Nuevo', variant: 'new' }, { text: 'Premium', variant: 'premium' }],
    icon: '✨',
  },
]

export default function ScrollRevealCourses() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number; spotX: number; spotY: number } }>({})

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
          <p className="text-xl md:text-2xl text-white/70 font-light">Formación que transforma</p>
        </div>

        {/* Course Cards */}
        <div className="space-y-32 md:space-y-40 max-w-4xl mx-auto">
          {courses.map((course, index) => {
            const pos = mousePositions[course.id] || { x: 0, y: 0, spotX: 50, spotY: 50 }

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
                  transform: `perspective(1000px) rotateX(${pos.x}deg) rotateY(${pos.y}deg) scale3d(1, 1, 1) translateZ(0)`,
                  // @ts-ignore
                  '--spot-x': `${pos.spotX}%`,
                  '--spot-y': `${pos.spotY}%`,
                }}
              >
                {/* Backdrop blur card */}
                <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-12 min-h-[280px] overflow-hidden">
                  {/* Spotlight effect */}
                  <div className="spotlight" />

                  {/* Chrome border glow */}
                  <div className="chrome-glow" />

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

        .course-card > div {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 rgba(192, 192, 192, 0);
        }

        .course-card:hover > div {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 60px rgba(192, 192, 192, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .spotlight {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(500px circle at var(--spot-x) var(--spot-y), rgba(255, 255, 255, 0.08), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
          pointer-events: none;
        }

        .course-card:hover .spotlight {
          opacity: 1;
        }

        .chrome-glow {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(192, 192, 192, 0.4), rgba(255, 255, 255, 0.6), rgba(192, 192, 192, 0.4));
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s;
          z-index: -1;
        }

        .course-card:hover .chrome-glow {
          opacity: 1;
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
