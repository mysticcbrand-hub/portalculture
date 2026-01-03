'use client'

import { useState, useEffect, FormEvent } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({ email: '', name: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({ email: '', name: '' })
    
    // Validate
    let hasErrors = false
    if (!name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Tu nombre es necesario' }))
      hasErrors = true
    }
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Tu email es necesario' }))
      hasErrors = true
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Email inválido' }))
      hasErrors = true
    }
    
    if (hasErrors) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Success
    alert(`¡Gracias ${name}! Te contactaremos pronto en ${email}`)
    setEmail('')
    setName('')
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4">
            ⚡ PLAZAS LIMITADAS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold chrome-gradient-text mb-3">
            Solicita tu acceso
          </h2>
          <p className="text-base opacity-70">
            El precio aumenta pronto · Asegura tu plaza ahora
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-80">
              Tu nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Ej: Alex García"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-80">
              Tu email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="tu@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-8 
                     font-semibold text-lg text-white magnetic-btn
                     rounded-xl
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>

          <p className="text-center text-sm">
            <span className="text-red-400 font-semibold">⚡ PLAZAS LIMITADAS</span> · <span className="text-yellow-400">Precio sube pronto</span>
          </p>
        </form>
      </div>
    </div>
  )
}
