import React from 'react'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'

export default function GalleryImage({ photo, index = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="masonry-item group relative cursor-pointer overflow-hidden rounded-xl"
      onClick={() => onClick && onClick(photo)}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest/20 to-transparent"
        />

        {/* Caption and zoom icon */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-gold text-xs font-body font-semibold uppercase tracking-widest block mb-0.5">
                {photo.category}
              </span>
              <p className="font-display font-semibold text-white text-sm leading-tight">
                {photo.caption}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
