import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, Grid3X3, LayoutGrid } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import GalleryImage from '../components/GalleryImage'
import ScrollReveal from '../components/ScrollReveal'
import galleryData from '../data/gallery.json'

const categories = ['All', ...Array.from(new Set(galleryData.map(p => p.category)))]

const INITIAL_COUNT = 12

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(p => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)

  const openLightbox = useCallback((photo) => setLightbox(photo), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const navigateLightbox = useCallback((dir) => {
    const idx = filtered.findIndex(p => p.id === lightbox.id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }, [filtered, lightbox])

  // Keyboard support
  React.useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigateLightbox(1)
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, navigateLightbox])

  return (
    <PageTransition>
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588247045941-caf3f818b2fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGVsbGElMjBzcmklMjBsYW5rYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Panoramic landscape of Ella Sri Lanka hills at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest/40 to-forest/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Camera className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold italic text-lg">Photo Gallery</span>
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl">
              Ella Through <span className="gradient-text">Our Lens</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setVisibleCount(INITIAL_COUNT)
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-forest text-white shadow-md shadow-forest/20'
                      : 'bg-white text-forest/70 hover:bg-forest/10 hover:text-forest'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Count */}
          <ScrollReveal delay={0.05}>
            <p className="font-body text-forest/50 text-sm mb-6">
              Showing <span className="font-semibold text-forest">{visible.length}</span> of <span className="font-semibold text-forest">{filtered.length}</span> photos
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-grid"
            >
              {visible.map((photo, i) => (
                <GalleryImage
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onClick={openLightbox}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {visibleCount < filtered.length && (
            <ScrollReveal delay={0.1}>
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(c => c + 8)}
                  className="group flex items-center gap-3 border-2 border-forest text-forest font-body font-semibold 
                             px-8 py-3.5 rounded-full hover:bg-forest hover:text-white transition-all duration-300 
                             hover:scale-105 active:scale-95"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Load More Photos
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace('w=800', 'w=1200')}
                alt={lightbox.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-gold text-xs font-body font-semibold uppercase tracking-widest">{lightbox.category}</span>
                <p className="font-display font-semibold text-white text-lg">{lightbox.caption}</p>
              </div>
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                         flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 
                         hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 
                         hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={(e) => { e.stopPropagation(); setLightbox(p) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    p.id === lightbox.id ? 'bg-gold w-4' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
