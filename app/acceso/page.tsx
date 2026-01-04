'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false })

export default function AccesoPage() {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const handleWaitlist = () => {
    // Redirect to app typeform page (same tab)
    window.location.href = 'https://app-portalculture.vercel.app'
  }

  const handleFastPass = () => {
    // Open Whop in new tab
    window.open('https://whop.com/portalculture/acceso-inmediato/', '_blank')
  }

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
        {/* Mesh Gradient Background - Same as landing */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* Blob 1 - Burnt Orange */}
          <div 
            className="absolute w-[900px] h-[900px] rounded-full blur-[140px] opacity-25"
            style={{
              background: 'radial-gradient(circle, #c2410c 0%, transparent 70%)',
              top: '-10%',
              left: '15%',
              animation: 'meshFloat1 20s ease-in-out infinite',
            }}
          />
          
          {/* Blob 2 - Blue */}
          <div 
            className="absolute w-[750px] h-[750px] rounded-full blur-[120px] opacity-28"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              bottom: '0%',
              right: '10%',
              animation: 'meshFloat2 18s ease-in-out infinite',
            }}
          />
          
          {/* Blob 3 - Teal */}
          <div 
            className="absolute w-[650px] h-[650px] rounded-full blur-[100px] opacity-18"
            style={{
              background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
              top: '35%',
              right: '25%',
              animation: 'meshFloat3 22s ease-in-out infinite',
            }}
          />
          
          {/* Blob 4 - Slate Blue */}
          <div 
            className="absolute w-[550px] h-[550px] rounded-full blur-[90px] opacity-20"
            style={{
              background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)',
              bottom: '25%',
              left: '5%',
              animation: 'meshFloat4 24s ease-in-out infinite',
            }}
          />
        </div>
        
        {/* Depth overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-block mb-8 text-white/50 hover:text-white transition-colors text-sm">
            ← Volver
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span
              style={{
                background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Elige tu acceso
            </span>
          </h1>
          <p className="text-xl text-white/60">Dos caminos hacia Portal Culture</p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Option 1: Waitlist */}
          <div
            onMouseEnter={() => setHoveredOption(1)}
            onMouseLeave={() => setHoveredOption(null)}
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:scale-105"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl" />

            <div className="mb-6">
              <span className="text-sm font-mono text-white/40 uppercase tracking-wider">Opción 1</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Lista de Espera</h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">GRATIS</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-white/70">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Completa el cuestionario</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Proceso de selección exclusivo</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
                <span>Acceso sujeto a aprobación</span>
              </li>
            </ul>

            <button
              onClick={handleWaitlist}
              className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
            >
              Unirse a la Lista
            </button>

            <p className="text-xs text-white/40 text-center mt-4">
              Sin compromiso · 100% gratuito
            </p>
          </div>

          {/* Option 2: Fast Pass */}
          <div
            onMouseEnter={() => setHoveredOption(2)}
            onMouseLeave={() => setHoveredOption(null)}
            className="group relative backdrop-blur-xl bg-white/5 border-2 border-white/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-105"
          >

            {/* Strong glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/15 to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-3xl" />

            <div className="mb-6">
              <span className="text-sm font-mono text-yellow-400 uppercase tracking-wider">Opción 2</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Acceso Inmediato</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">7€</span>
                <span className="text-white/50">una vez</span>
              </div>
              <p className="text-sm text-yellow-400 font-semibold">Oferta de lanzamiento · Precio normal: 47€</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-white/90">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold">Acceso instantáneo al Dashboard</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sin esperas ni aprobaciones</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Discord + 5 Cursos desbloqueados al instante</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Acceso de por vida</span>
              </li>
            </ul>

            <button
              onClick={handleFastPass}
              className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 hover:scale-105"
            >
              Acceder Ya →
            </button>

            <p className="text-xs text-white/60 text-center mt-4">
              🔒 Pago seguro con Whop · Valor Infinito
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 text-white/30">
            <span className="text-xs">🔒 Pago Seguro</span>
            <span className="text-xs">⚡ Acceso Instantáneo</span>
            <span className="text-xs">💯 Valor Infinito</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -100px) scale(1.15); }
          66% { transform: translate(-40px, 80px) scale(0.95); }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-80px, 90px) scale(1.1); }
          66% { transform: translate(50px, -60px) scale(0.92); }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(90px, 50px) scale(1.12); }
          66% { transform: translate(-60px, -80px) scale(0.9); }
        }
        
        @keyframes meshFloat4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, -90px) scale(1.18); }
          66% { transform: translate(70px, 60px) scale(0.88); }
        }
      `}</style>
      </main>
    </>
  )
}
