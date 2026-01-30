'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export default function AccesoClient() {
  useEffect(() => {
    // Track page view para analytics
    trackEvent.viewedAcceso()
  }, [])
  const [selectedOption, setSelectedOption] = useState<'premium' | 'waitlist' | null>(null)

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Link 
            href="/"
            className="inline-block text-white/60 hover:text-white mb-8 transition-colors"
          >
            ← Volver
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Elige tu{' '}
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Camino
            </span>
          </h1>
          
          <p className="text-xl text-white/70">
            Dos formas de entrar al Portal. Mismo contenido, mismas oportunidades.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Opción 1: Acceso Inmediato */}
          <div 
            className={`relative p-8 rounded-2xl border transition-all duration-300 ${
              selectedOption === 'premium' 
                ? 'border-white/30 bg-white/5' 
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
            onClick={() => setSelectedOption('premium')}
          >
            {/* Badge */}
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-semibold mb-6">
              ⚡ RECOMENDADO
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Acceso Inmediato</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold">7€</span>
              <span className="text-white/60">pago único</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Acceso instantáneo</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">5 Templos completos</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">NOVA AI Coach</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Discord exclusivo</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Acceso de por vida</span>
              </li>
            </ul>
            
            <a
              href="https://whop.com/portalculture/acceso-inmediato/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent.clickedPremium()}
              className="block w-full py-4 px-6 text-center font-semibold bg-white text-black rounded-xl hover:bg-white/90 transition-all"
            >
              Acceder Ya →
            </a>
          </div>

          {/* Opción 2: Lista de Espera */}
          <div 
            className={`relative p-8 rounded-2xl border transition-all duration-300 ${
              selectedOption === 'waitlist' 
                ? 'border-white/30 bg-white/5' 
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
            onClick={() => setSelectedOption('waitlist')}
          >
            <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm font-semibold mb-6">
              ✓ GRATIS
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Lista de Espera</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold">Gratis</span>
              <span className="text-white/60">siempre</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Completa el cuestionario</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Revisión manual</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Todo el contenido</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">100% gratuito</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Tiempo de espera variable</span>
              </li>
            </ul>
            
            <a
              href="https://app-portalculture.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent.clickedWaitlist()}
              className="block w-full py-4 px-6 text-center font-semibold bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Unirse a la Lista →
            </a>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">¿Qué incluye Portal Culture?</h3>
              <p className="text-white/70">
                Acceso completo a 5 Templos (Atenas, Ares, Apolo, Zeus, Adonis), NOVA AI Coach personalizado, 
                comunidad Discord exclusiva, desafíos semanales y networking con jóvenes ambiciosos.
              </p>
            </div>
            
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">¿Cuál es la diferencia entre las opciones?</h3>
              <p className="text-white/70">
                El contenido es exactamente el mismo. Con el acceso inmediato entras hoy por 7€. 
                Con la lista de espera es 100% gratis pero requiere aprobación manual.
              </p>
            </div>
            
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">¿Es un pago único o recurrente?</h3>
              <p className="text-white/70">
                Es un pago único de 7€. Acceso de por vida, sin suscripciones ni pagos mensuales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
