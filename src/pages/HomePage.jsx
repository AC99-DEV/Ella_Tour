import React from 'react'
import PageTransition from '../components/PageTransition'
import HeroSection from '../components/HeroSection'
import EventsSection from '../components/EventsSection'
import GalleryPreview from '../components/GalleryPreview'
import ContactSection from '../components/ContactSection'
import WhyEllaSection from '../components/WhyEllaSection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <WhyEllaSection />
      <EventsSection />
      <GalleryPreview />
      <ContactSection />
    </PageTransition>
  )
}
