'use client'

import { useEffect, useRef, useState } from 'react'

export default function AICoachSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeConversation, setActiveConversation] = useState(0)
  const [chatRotation, setChatRotation] = useState({ x: 0, y: 0 })
  const [bookRotations, setBookRotations] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 25
    const rotateY = (centerX - x) / 25

    setChatRotation({ x: rotateX, y: rotateY })
  }

  const handleCardMouseLeave = () => {
    setChatRotation({ x: 0, y: 0 })
  }

  const handleBookMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 30 // Más sutil (antes /20)
    const rotateY = (centerX - x) / 30 // Más sutil (antes /20)

    setHoveredBookIndex(index)
    setBookRotations(prev => ({
      ...prev,
      [index]: { x: rotateX, y: rotateY }
    }))
  }

  const handleBookMouseLeave = (index: number) => {
    setHoveredBookIndex(null)
    setBookRotations(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }))
  }

  const conversations = [
    {
      id: 1,
      scenario: 'Construcción de músculo',
      userMessage: 'Oye Nova, ¿cómo puedo ganar músculo rápido?',
      novaResponse: `Escucha bien 👉 ¡Olvídate de los atajos! Ganar músculo rápido existe, pero requiere un enfoque BRUTAL y consistente. No es magia, es ciencia y disciplina. 😤

La verdad directa es que necesitas un triple ataque: entrenamiento INTENSO, nutrición CALCULADA y descanso PRIORITARIO. ¿Estás dispuesto a comprometerte con los tres? 💥

Aquí tienes el protocolo de choque en 5 pasos:

**Entrenamiento de Fuerza:** 3-4 veces por semana. Enfócate en ejercicios compuestos (sentadillas, peso muerto, press de banca, dominadas). Sobrecarga progresiva SEMANAL. Aumenta el peso, las repeticiones o las series. 💪`
    },
    {
      id: 2,
      scenario: 'Hábitos y disciplina',
      userMessage: '¿Cómo construyo disciplina real? Siempre empiezo motivado pero abandono...',
      novaResponse: `Ahí está el problema 👉 Estás esperando MOTIVACIÓN cuando necesitas SISTEMAS! La motivación es basura. La disciplina es el músculo que entrenas cada día. 🔥

Mira, según Atomic Habits de James Clear, no cambias construyendo disciplina. Cambias construyendo IDENTIDAD:

**No digas:** "Voy a intentar ir al gym"
**Di:** "Soy alguien que entrena" 💪

El truco brutal:
1. Empieza RIDÍCULAMENTE pequeño → 2 flexiones, no 100
2. Hazlo a la misma hora SIEMPRE
3. Stack de hábitos: Después de [hábito existente] hago [nuevo hábito]

¿Qué hábito quieres? Dame uno y te armo el sistema HOY. 😤`
    },
    {
      id: 3,
      scenario: 'Mentalidad y confianza',
      userMessage: 'Siento que no soy suficiente. ¿Cómo desarrollo confianza real?',
      novaResponse: `Escucha esto 👉 La confianza NO viene de "sentirte bien". Viene de EVIDENCIA. De probar que puedes cumplir lo que te propones. 🧠

La verdad que nadie te dice: La inseguridad no se va hablando bonito. Se va HACIENDO cosas que te asustan y sobreviviendo. ⚡

Protocolo Huberman para rewirear tu cerebro:

**Paso 1:** Compromiso micro → Haz 1 cosa difícil HOY
**Paso 2:** Registra la victoria (tu cerebro necesita DATA)
**Paso 3:** Repite 30 días → Neuroplasticidad real

No necesitas sentirte seguro para actuar. Actúas y LUEGO viene la seguridad. Pregúntate: ¿Qué harías HOY si no tuvieras miedo? 💥

Hazlo. Ahora. 🔥`
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-32 md:py-40 overflow-hidden"
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle animated gradient orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            top: '20%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        {/* Gradiente azul arriba a la derecha (área de la card, no del scroll) */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '5%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Visual Element - Interactive Chat Preview */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Floating orb effect */}
            <div 
              className="absolute -inset-40 opacity-50 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                animation: 'glow 4s ease-in-out infinite',
              }}
            />


            {/* Chat interface mockup */}
            <div 
              className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-transform duration-200 ease-out"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${chatRotation.x}deg) rotateY(${chatRotation.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/ai.png" 
                      alt="NOVA AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">NOVA™</h3>
                  <p className="text-xs text-white/40">Tu coach personal</p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 min-h-[400px]">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-white/90">{conversations[activeConversation].userMessage}</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                    <div className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                      {conversations[activeConversation].novaResponse.split(/(\*\*.*?\*\*)/).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
                        }
                        return <span key={i}>{part}</span>
                      })}
                    </div>
                    <span className="inline-block mt-2 text-[10px] text-white/30">Hace 1s</span>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>NOVA está escribiendo...</span>
              </div>

              {/* Navigation */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/30 font-mono">
                  {conversations[activeConversation].scenario}
                </span>
                
                <div className="flex items-center gap-4">
                  {/* Previous arrow */}
                  <button
                    onClick={() => setActiveConversation((prev) => (prev - 1 + conversations.length) % conversations.length)}
                    className="group p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    aria-label="Conversación anterior"
                  >
                    <svg 
                      className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dots navigation */}
                  <div className="flex gap-2">
                    {conversations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveConversation(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeConversation
                            ? 'bg-white w-6'
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Ver conversación ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next arrow */}
                  <button
                    onClick={() => setActiveConversation((prev) => (prev + 1) % conversations.length)}
                    className="group p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    aria-label="Conversación siguiente"
                  >
                    <svg 
                      className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Label */}
            <div className="mb-6">
              <span className="font-mono text-xs tracking-wider text-white/30">/ 04</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-tight mb-6" style={{ transform: 'scaleY(1.1)' }}>
              <span className="block text-white">Tu coach.</span>
              <span className="block text-white/60">Disponible 24/7.</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-10 text-white/60 text-lg leading-relaxed">
              <p>
                NOVA™ no es un bot cualquiera. Es tu mentor del desarrollo colectivo entrenado con libros y cientos de horas de conocimiento con las mejores estrategias para ti.
              </p>
              <p>
                Responde con sistemas reales, pasos accionables y la energía que necesitas para transformar tu vida.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: '🧠', label: 'Conocimiento científico' },
                { icon: '💪', label: 'Planes personalizados' },
                { icon: '🔥', label: 'Motivación en tiempo real' },
                { icon: '⚡', label: 'Respuestas instantáneas' },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm text-white/70">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/acceso"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-medium overflow-hidden rounded-full
                       bg-white/5 border border-white/10 hover:border-white/20
                       transition-all duration-500 hover:scale-[1.02]"
            >
              <span className="relative z-10">Accede a NOVA™</span>
              <svg 
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 opacity-0 group-hover:opacity-60
                            transition-opacity duration-700 -z-10 scale-150" />
            </a>

            {/* Social proof */}
            <p className="mt-6 text-xs text-white/30 font-mono tracking-wide">
              +1,000 conversaciones transformadoras
            </p>
          </div>
        </div>

        {/* Knowledge Sources - Interactive Section */}
        <div 
          className={`mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Conocimiento de élite
            </h3>
            <p className="text-white/60">
              Entrenado con más de <span className="text-white font-semibold">10 libros</span> y{' '}
              <span className="text-white font-semibold">100+ horas</span> de contenido verificado
            </p>
          </div>

          {/* Books - Infinite Horizontal Scroll */}
          <div className="relative py-16">
            {/* Blur gradients on edges - Seamless con fondo */}
            <div className="absolute left-0 top-0 bottom-0 w-40 md:w-48 z-20 pointer-events-none"
                 style={{
                   background: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.6) 60%, transparent 100%)'
                 }} />
            <div className="absolute right-0 top-0 bottom-0 w-40 md:w-48 z-20 pointer-events-none"
                 style={{
                   background: 'linear-gradient(to left, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.6) 60%, transparent 100%)'
                 }} />

            {/* Scroll container with proper overflow handling */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 animate-infinite-scroll will-change-transform"
                style={{ 
                  width: 'max-content',
                  animationPlayState: isPaused ? 'paused' : 'running',
                  paddingTop: '2rem',
                  paddingBottom: '2rem'
                }}
              >
                {/* Render books twice for seamless infinite loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-6">
                    {[
                      { title: 'Atomic Habits', author: 'James Clear', color: 'from-blue-500/20 to-cyan-500/20' },
                      { title: 'Can\'t Hurt Me', author: 'David Goggins', color: 'from-red-500/20 to-orange-500/20' },
                      { title: 'The Charisma Myth', author: 'Olivia Fox Cabane', color: 'from-purple-500/20 to-pink-500/20' },
                      { title: 'Win Friends and Influence People', author: 'Dale Carnegie', color: 'from-green-500/20 to-emerald-500/20' },
                      { title: 'The Way of the Superior Man', author: 'David Deida', color: 'from-amber-500/20 to-yellow-500/20' },
                      { title: 'The Almanack of Naval Ravikant', author: 'Naval Ravikant', color: 'from-indigo-500/20 to-blue-500/20' },
                      { title: 'Why We Sleep', author: 'Matthew Walker', color: 'from-violet-500/20 to-purple-500/20' },
                      { title: 'Zero to One', author: 'Peter Thiel', color: 'from-teal-500/20 to-cyan-500/20' },
                      { title: 'Huberman Lab Protocols', author: 'Andrew Huberman', color: 'from-rose-500/20 to-pink-500/20' },
                      { title: 'Examine.com Research', author: 'Evidence-Based', color: 'from-lime-500/20 to-green-500/20' },
                    ].map((book, idx) => {
                      const globalIndex = setIndex * 10 + idx
                      const isHovered = hoveredBookIndex === globalIndex
                      const rotation = bookRotations[globalIndex] || { x: 0, y: 0 }

                      return (
                        <div
                          key={globalIndex}
                          className="group relative flex-shrink-0 w-48"
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => {
                            setIsPaused(false)
                            handleBookMouseLeave(globalIndex)
                          }}
                          onMouseMove={(e) => handleBookMouseMove(e, globalIndex)}
                        >
                          <div
                            className="relative p-6 rounded-2xl border border-white/10 
                                     bg-white/[0.03] backdrop-blur-xl
                                     hover:border-white/30
                                     transition-all duration-300 ease-out cursor-pointer
                                     flex flex-col justify-between h-full"
                            style={{
                              minHeight: '11rem',
                              transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.08 : 1}) translateZ(${isHovered ? '20px' : '0px'})`,
                              transformStyle: 'preserve-3d',
                              zIndex: isHovered ? 30 : 1,
                              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease',
                            }}
                          >
                            {/* Gradient glow on hover - More intense */}
                            <div 
                              className={`absolute -inset-2 bg-gradient-to-br ${book.color} 
                                       opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 -z-10 rounded-2xl scale-110`}
                            />

                            {/* Subtle inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Book icon */}
                            <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">📖</div>

                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-white mb-2 leading-tight transition-all duration-300 group-hover:text-white/90">
                                {book.title}
                              </h4>
                              <p className="text-xs text-white/50 group-hover:text-white/60 transition-colors duration-300">
                                {book.author}
                              </p>
                            </div>

                            {/* Checkmark badge */}
                            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/30">
                              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats below */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-white/50">Libros premium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-sm text-white/50">Horas de contenido</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5</div>
              <div className="text-sm text-white/50">Fuentes científicas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
