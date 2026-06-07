import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Search, ChevronDown, Star, Users, Map, CloudSun, MapPin, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const stats = [
  { icon: Star, value: '4.9', label: 'Avg Rating' },
  { icon: Users, value: '2,400+', label: 'Happy Travelers' },
  { icon: Map, value: '5', label: 'Curated Experiences' },
]

const slides = [
  {
    image: '/assets/hero/nine_arch.jpg',
    title: 'Nine Arch Bridge',
    eyebrow: "Sri Lanka's Jewel of the Hills",
    tagline: 'Witness the sunrise over the misty viaduct'
  },
  {
    image: '/assets/hero/ella_rock.jpg',
    title: 'Ella Rock Summit',
    eyebrow: 'Adventure In The Clouds',
    tagline: 'Conquer the peak that defines the skyline'
  },
  {
    image: '/assets/hero/little_adams.jpg',
    title: 'Little Adam\'s Peak',
    eyebrow: 'Golden Hour Splendor',
    tagline: 'Watch heaven meet the green hill country horizon'
  }
]

export default function HeroSection() {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activity, setActivity] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [priceRange, setPriceRange] = useState('All')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (activity !== 'All') params.set('category', activity)
    if (difficulty !== 'All') params.set('difficulty', difficulty)
    if (priceRange !== 'All') params.set('price', priceRange)

    navigate(`/?${params.toString()}#events`)

    setTimeout(() => {
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] max-h-[1100px] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-[120%] object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-forest/30 to-forest-dark/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/50 via-transparent to-transparent z-10" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-48 z-10 overflow-hidden pointer-events-none">
        <div className="mist-layer mist-1 bottom-0 h-32 opacity-30" />
        <div className="mist-layer mist-2 bottom-0 h-40 opacity-20" />
      </div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/40 z-10"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content  */}
      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20 flex items-center justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className="font-accent text-gold italic text-lg tracking-wide"
              >
                {slides[currentSlide].eyebrow}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-white leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Discover the
            <br />
            <span className="gradient-text">Magic of Ella</span>
          </motion.h1>


          <div className="h-16 mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="font-body text-white/75 text-lg md:text-xl leading-relaxed max-w-xl"
              >
                {slides[currentSlide].tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Filter & Search */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSearch}
            className="glass-card backdrop-blur-lg bg-black/30 border border-white/15 p-4 rounded-3xl max-w-2xl mb-12 shadow-2xl relative z-30"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div className="relative">
                <label className="block text-[10px] font-body font-bold text-gold uppercase tracking-widest ml-3 mb-1">Activity</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-gold/50 finder-select cursor-pointer"
                >
                  <option value="All" className="bg-forest-dark text-white">All Activities</option>
                  <option value="hiking" className="bg-forest-dark text-white">Hiking & Trekking</option>
                  <option value="culture" className="bg-forest-dark text-white">Culture & Nature</option>
                  <option value="sunset" className="bg-forest-dark text-white">Sunset Views</option>
                  <option value="experience" className="bg-forest-dark text-white">Tea Heritage</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-body font-bold text-gold uppercase tracking-widest ml-3 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-gold/50 finder-select cursor-pointer"
                >
                  <option value="All" className="bg-forest-dark text-white">Any Difficulty</option>
                  <option value="easy" className="bg-forest-dark text-white">Easy</option>
                  <option value="moderate" className="bg-forest-dark text-white">Moderate</option>
                  <option value="challenging" className="bg-forest-dark text-white">Challenging</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-body font-bold text-gold uppercase tracking-widest ml-3 mb-1">Budget</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-gold/50 finder-select cursor-pointer"
                >
                  <option value="All" className="bg-forest-dark text-white">Any Budget</option>
                  <option value="under40" className="bg-forest-dark text-white">Under $40</option>
                  <option value="40to50" className="bg-forest-dark text-white">$40 - $50</option>
                  <option value="over50" className="bg-forest-dark text-white">Over $50</option>
                </select>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs font-body">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
                <span>Filters apply to experiences below</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-gold text-forest-dark font-body font-bold text-sm px-8 py-2.5 rounded-full 
                           hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95 
                           shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-gold" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base leading-none">{value}</div>
                  <div className="font-body text-white/50 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hidden lg:block w-80 space-y-6">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card backdrop-blur-md bg-white/10 border border-white/20 p-5 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-white/15 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <CloudSun className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="text-white/60 text-xs font-body uppercase tracking-wider">Ella Live Climate</div>
              <div className="font-display font-bold text-white text-lg">22°C · Fresh Mist</div>
              <div className="font-body text-gold text-xs">Perfect trekking conditions today</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card backdrop-blur-md bg-white/10 border border-white/20 p-5 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-white/15 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-forest-light/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="text-white/60 text-xs font-body uppercase tracking-wider">Top Experience</div>
              <div className="font-display font-bold text-white text-lg">Nine Arch Bridge</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span className="text-white text-xs font-semibold">4.9</span>
                <span className="text-white/50 text-xs">(420+ reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-4 md:right-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-gold w-8 shadow-lg shadow-gold/50' : 'bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group"
        aria-label="Scroll to events"
      >
        <span className="font-body text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center
                     group-hover:border-gold/60 transition-colors duration-200"
        >
          <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  )
}
