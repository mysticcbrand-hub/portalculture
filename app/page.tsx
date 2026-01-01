'use client'

import { useState } from 'react'
import CreativeHero from './components/CreativeHero'
import CreativeBenefits from './components/CreativeBenefits'
import CreativeProcess from './components/CreativeProcess'
import CreativeCTA from './components/CreativeCTA'
import Footer from './components/Footer'
import Modal from './components/Modal'
import CustomCursor from './components/CustomCursor'
import LoadingIntro from './components/LoadingIntro'
import FloatingRocks from './components/FloatingRocks'

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
      
      {/* Floating Rocks - 3D Effect */}
      <FloatingRocks />
      
      {/* Creative Hero Section */}
      <CreativeHero onCtaClick={openModal} />

      {/* Creative Benefits Section */}
      <CreativeBenefits />

      {/* Creative Process Section */}
      <CreativeProcess />

      {/* Creative CTA Section */}
      <CreativeCTA onCtaClick={openModal} />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
