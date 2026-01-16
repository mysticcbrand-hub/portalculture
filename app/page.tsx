'use client'

import { useState } from 'react'
import HeroPremium from './components/HeroPremium'
import CreativeBenefits from './components/CreativeBenefits'
import AICoachSection from './components/AICoachSection'
import ScrollRevealCourses from './components/ScrollRevealCourses'
import AvatarComparison from './components/AvatarComparison'
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
      
      {/* Hero Section - Premium Glassmorphism */}
      <HeroPremium />

      {/* Creative Benefits Section */}
      <CreativeBenefits />

      {/* Scroll Reveal Courses - 5 Templos */}
      <ScrollRevealCourses />

      {/* AI Coach Section - NOVA */}
      <AICoachSection />

      {/* Avatar Comparison Section */}
      <AvatarComparison />

      {/* Creative CTA Section */}
      <CreativeCTA onCtaClick={openModal} />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
