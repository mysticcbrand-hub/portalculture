'use client'

import { useState } from 'react'
import CreativeHero from './components/CreativeHero'
import CreativeBenefits from './components/CreativeBenefits'
import WhatYouGet from './components/WhatYouGet'
import CreativeCTA from './components/CreativeCTA'
import Footer from './components/Footer'
import Modal from './components/Modal'
import CustomCursor from './components/CustomCursor'
import LoadingIntro from './components/LoadingIntro'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Loading Intro */}
      <LoadingIntro />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Creative Hero Section */}
      <CreativeHero onCtaClick={openModal} />

      {/* Creative Benefits Section */}
      <CreativeBenefits />

      {/* What You Get Section - NEW */}
      <WhatYouGet />

      {/* Creative CTA Section */}
      <CreativeCTA onCtaClick={openModal} />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
