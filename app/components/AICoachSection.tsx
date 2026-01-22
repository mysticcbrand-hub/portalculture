'use client'

import { useEffect, useRef, useState } from 'react'

export default function AICoachSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeConversation, setActiveConversation] = useState(0)
  const [chatRotation, setChatRotation] = useState({ x: 0, y: 0 })
  // Scroll ref for marquee
  const scrollRef = useRef<HTMLDivElement>(null)

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
    // Skip 3D effect on mobile/touch devices for better performance
    if (window.matchMedia('(hover: none)').matches) return
    
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
      id="ai-coach"
      className="relative min-h-screen flex items-center justify-center px-5 md:px-6 py-16 md:py-32 overflow-hidden"
    >
      {/* Background - SIMPLIFIED for mobile (no animated blurs) */}
      <div className="absolute inset-0 bg-black">
        {/* Static gradient for mobile, animated for desktop */}
        <div 
          className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full opacity-15 md:opacity-20"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            top: '10%',
            left: '5%',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="hidden md:block absolute w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '5%',
            right: '10%',
            filter: 'blur(120px)',
          }}
        />
        
        {/* Grain texture - only on desktop */}
        <div 
          className="hidden md:block absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Left: Visual Element - Interactive Chat Preview - HIDDEN ON MOBILE */}
          <div 
            className={`hidden lg:block relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Floating orb effect - DESKTOP ONLY */}
            <div 
              className="hidden md:block absolute -inset-40 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Chat interface mockup - HORIZONTAL on mobile for better use of space */}
            <div 
              className="relative bg-white/[0.03] md:bg-white/[0.02] md:backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg md:shadow-2xl max-w-[94%] md:max-w-none mx-auto aspect-[16/9] md:aspect-auto"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${chatRotation.x}deg) rotateY(${chatRotation.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-white/10">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/ai.png" 
                      alt="NOVA AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm md:text-base">NOVA™</h3>
                  <p className="text-[10px] md:text-xs text-white/40">Tu coach personal</p>
                </div>
              </div>

              {/* Messages - scrollable on mobile */}
              <div className="space-y-2 md:space-y-4 flex-1 overflow-y-auto min-h-0 md:min-h-[400px]">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/20 rounded-xl md:rounded-2xl rounded-tr-sm px-3 md:px-4 py-2 md:py-3 max-w-[88%]">
                    <p className="text-xs md:text-sm text-white/90">{conversations[activeConversation].userMessage}</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl rounded-tl-sm px-3 md:px-4 py-2 md:py-3 max-w-[92%]">
                    <div className="text-xs md:text-sm text-white/90 leading-relaxed whitespace-pre-line">
                      {conversations[activeConversation].novaResponse.split(/(\*\*.*?\*\*)/).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
                        }
                        return <span key={i}>{part}</span>
                      })}
                    </div>
                    <span className="inline-block mt-1.5 md:mt-2 text-[9px] md:text-[10px] text-white/30">Hace 1s</span>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="mt-3 md:mt-4 flex items-center gap-2 text-[10px] md:text-xs text-white/40">
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
            <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] font-normal leading-[1.1] tracking-tight mb-4 md:mb-6" style={{ transform: 'scaleY(1.1)' }}>
              <span className="block text-white">Tu coach.</span>
              <span className="block text-white/60">Disponible 24/7.</span>
            </h2>

            {/* Description */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-10 text-white/60 text-sm md:text-lg leading-relaxed">
              <p>
                NOVA™ es tu mentor de desarrollo personal, entrenado con los mejores libros y estrategias.
              </p>
              <p className="hidden md:block">
                Responde con sistemas reales, pasos accionables y la energía que necesitas para transformar tu vida.
              </p>
            </div>

            {/* Features - 2x2 en móvil también */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
              {[
                { icon: '🧠', label: 'Conocimiento científico' },
                { icon: '💪', label: 'Planes personalizados' },
                { icon: '🔥', label: 'Motivación real' },
                { icon: '⚡', label: 'Respuestas al instante' },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <span className="text-xl md:text-2xl">{feature.icon}</span>
                  <span className="text-xs md:text-sm text-white/70">{feature.label}</span>
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

        {/* Knowledge Sources - REDESIGNED for mobile */}
        <div 
          className={`mt-12 md:mt-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[10px] md:text-xs font-mono text-white/30 tracking-wider mb-2">FUENTES DE CONOCIMIENTO</p>
            <h3 className="text-lg md:text-3xl font-bold text-white mb-2">
              Entrenado con lo mejor
            </h3>
            <p className="text-white/50 text-xs md:text-base">
              <span className="text-white/70">10+ libros</span> · <span className="text-white/70">100+ horas</span> · <span className="text-white/70">5 fuentes</span>
            </p>
          </div>

          {/* Books - CSS Animation Marquee (more reliable on mobile) */}
          <div className="relative overflow-hidden py-2">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />

            {/* Marquee container */}
            <div 
              ref={scrollRef}
              className="flex animate-marquee hover:pause-animation"
              style={{
                width: 'max-content',
              }}
            >
              {/* Render books twice for seamless loop */}
              {[0, 1].map((setIndex) => (
                <div key={setIndex} className="flex gap-3 md:gap-5 px-2">
                  {[
                    { title: 'Atomic Habits', emoji: '⚛️' },
                    { title: 'Can\'t Hurt Me', emoji: '🔥' },
                    { title: 'Charisma Myth', emoji: '✨' },
                    { title: 'Win Friends', emoji: '🤝' },
                    { title: 'Superior Man', emoji: '👑' },
                    { title: 'Naval Ravikant', emoji: '🧭' },
                    { title: 'Why We Sleep', emoji: '😴' },
                    { title: 'Zero to One', emoji: '🚀' },
                    { title: 'Huberman Lab', emoji: '🧠' },
                    { title: 'Examine.com', emoji: '🔬' },
                  ].map((book, idx) => (
                    <div
                      key={`${setIndex}-${idx}`}
                      className="flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 
                               rounded-full bg-white/[0.04] border border-white/[0.08]
                               hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300"
                    >
                      <span className="text-base md:text-xl">{book.emoji}</span>
                      <span className="text-[11px] md:text-sm text-white/80 font-medium whitespace-nowrap">{book.title}</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-green-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats - compact for mobile */}
          <div className="flex justify-center items-center gap-6 md:gap-10 mt-8 md:mt-12">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white">10+</div>
              <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Libros</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white">100+</div>
              <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Horas</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white">24/7</div>
              <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
