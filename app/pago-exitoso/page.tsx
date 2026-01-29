import { Suspense } from 'react'
import PagoExitosoClient from './PagoExitosoClient'

export default function PagoExitoso() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
            <p className="text-white/60">Cargando...</p>
          </div>
        </main>
      }
    >
      <PagoExitosoClient />
    </Suspense>
  )
}
