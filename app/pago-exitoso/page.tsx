'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PagoExitoso() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    // Verify payment
    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success')
          // Redirect to app registration after 3 seconds
          setTimeout(() => {
            window.location.href = `https://app-portalculture.vercel.app/registro-directo?email=${data.email}&payment_id=${sessionId}`
          }, 3000)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [sessionId])

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-black">
      {/* Same mesh gradient as /acceso */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div 
            className="absolute w-[900px] h-[900px] rounded-full blur-[140px] opacity-25"
            style={{
              background: 'radial-gradient(circle, #c2410c 0%, transparent 70%)',
              top: '-10%',
              left: '15%',
              animation: 'meshFloat1 20s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-[750px] h-[750px] rounded-full blur-[120px] opacity-28"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              bottom: '0%',
              right: '10%',
              animation: 'meshFloat2 18s ease-in-out infinite',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {status === 'loading' && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <div className="animate-spin w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h1 className="text-3xl font-bold text-white mb-4">Verificando pago...</h1>
            <p className="text-white/60">Un momento por favor</p>
          </div>
        )}

        {status === 'success' && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">¡Pago Exitoso! 🎉</h1>
            <p className="text-xl text-white/80 mb-6">
              Bienvenido a Portal Culture
            </p>
            <p className="text-white/60 mb-8">
              Redirigiendo a completar tu registro...
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-32 mx-auto"></div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-3xl p-12">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Error en la verificación</h1>
            <p className="text-white/60 mb-8">
              Hubo un problema al verificar tu pago. Por favor contacta con soporte.
            </p>
            <Link
              href="/acceso"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
            >
              Volver a intentar
            </Link>
          </div>
        )}
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
      `}</style>
    </main>
  )
}
