import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Compass } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function WhyEllaSection() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, transparent 55%, #F5F0E6 55%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-2/5 flex-shrink-0">
            <ScrollReveal direction="left">
              <div className="relative">
                {/* Main image */}
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-forest/20">
                  <img
                    src="https://images.unsplash.com/photo-1559038297-2008397bad17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxlbGxhJTIwc3JpJTIwbGFua2F8ZW58MHx8MHx8fDA%3D"
                    alt="Breathtaking view of Ella hill country at sunset"
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 max-w-[140px]"
                >
                  <div className="font-display font-bold text-forest text-2xl">Since 2010</div>
                  <div className="font-body text-forest/60 text-xs">Guiding Adventures</div>
                </motion.div>
                {/* Second small image */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -top-4 -left-4 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1775479788897-c5ec08cb7fb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgzfHxlbGxhJTIwc3JpJTIwbGFua2F8ZW58MHx8MHx8fDA%3D"
                    alt="Lush green tea plants in Ella"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:w-3/5">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-gold" />
                <span className="font-accent text-gold italic text-lg">Who We Are</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-title mb-4">
                Our Heritage &
                <br />
                <span className="gradient-text">Adventure Mission</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="font-body text-forest/75 text-sm md:text-base leading-relaxed mb-8">
                Hiking Bar and Restaurant, a successful business in the Ella area, has been providing hiking trails and tracking related services in the Ella area since 2010. This Ella Hiking Trails and tracking web application serves as our digital service platform. It makes it easier for travelers to access all premier tracking trails and outdoor services in the Ella region.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ScrollReveal delay={0.2}>
                <div className="bg-beige/65 border border-forest/5 p-5 rounded-2xl hover:bg-beige hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors mb-3">
                    <Target className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-display font-bold text-forest text-base mb-2">Our Mission</h4>
                  <p className="font-body text-forest/65 text-xs leading-relaxed flex-1">
                    We exist to fuel the spirit of adventure—leading hikers to breathtaking destinations with trusted guidance, immersive experiences, and a commitment to sustainable, responsible exploration.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="bg-beige/65 border border-forest/5 p-5 rounded-2xl hover:bg-beige hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors mb-3">
                    <Eye className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-display font-bold text-forest text-base mb-2">Our Vision</h4>
                  <p className="font-body text-forest/65 text-xs leading-relaxed flex-1">
                    To become the region’s leading provider of safe, sustainable, and transformative outdoor activities empowering people of all backgrounds to explore nature with confidence and respect.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
