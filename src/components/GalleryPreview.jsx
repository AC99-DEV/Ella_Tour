import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Camera } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import galleryData from '../data/gallery.json'

const previewPhotos = galleryData.slice(0, 8)

const layoutClasses = [
  'col-span-2 row-span-2', // 0
  'col-span-1 row-span-1', // 1
  'col-span-1 row-span-1', // 2
  'col-span-1 row-span-2', // 3
  'col-span-1 row-span-1', // 4
  'col-span-1 row-span-1', // 5
  'col-span-1 row-span-1', // 6
  'col-span-1 row-span-1', // 7
]

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-light/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Camera className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold italic text-lg">Through the Lens</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Ella in Every <span className="gradient-text">Frame</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-white/50 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              Every corner of Ella is a photograph waiting to be taken.
              From misty bridges to golden sunsets, experience it all.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-3 h-[540px]">
            {previewPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${layoutClasses[i] || 'col-span-1 row-span-1'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-gold text-xs font-body font-semibold uppercase tracking-widest">{photo.category}</span>
                  <p className="font-display font-semibold text-white text-sm">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="md:hidden grid grid-cols-2 gap-3">
          {previewPhotos.slice(0, 6).map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />
              <div className="absolute bottom-2 left-3">
                <p className="font-display font-semibold text-white text-xs">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex justify-center mt-10">
            <Link
              to="/gallery"
              className="group flex items-center gap-3 bg-gold/10 border border-gold/30 text-gold font-body font-semibold 
                         px-8 py-3.5 rounded-full hover:bg-gold hover:text-forest-dark hover:border-gold 
                         transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Camera className="w-4 h-4" />
              View Full Gallery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
