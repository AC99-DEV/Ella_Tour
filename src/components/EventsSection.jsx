import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Compass, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import EventCard from './EventCard'
import ScrollReveal from './ScrollReveal'
import eventsData from '../data/events.json'

export default function EventsSection() {
  const scrollRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFilter = searchParams.get('category')
  const difficultyFilter = searchParams.get('difficulty')
  const priceFilter = searchParams.get('price')

  const hasFilters = categoryFilter || difficultyFilter || priceFilter

  // Filter eventsData
  const filteredEvents = eventsData.filter(event => {
    if (categoryFilter && categoryFilter !== 'All') {
      const cat = categoryFilter.toLowerCase()
      const eventCat = event.category.toLowerCase()
      if (cat === 'hiking' && !eventCat.includes('hiking') && !eventCat.includes('trekking')) return false
      if (cat === 'culture' && !eventCat.includes('culture') && !eventCat.includes('nature')) return false
      if (cat === 'sunset' && !eventCat.includes('sunset')) return false
      if (cat === 'experience' && !eventCat.includes('experience') && !eventCat.includes('tea')) return false
      if (cat !== 'hiking' && cat !== 'culture' && cat !== 'sunset' && cat !== 'experience' && eventCat !== cat) return false
    }

    if (difficultyFilter && difficultyFilter !== 'All') {
      if (event.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) return false
    }

    if (priceFilter && priceFilter !== 'All') {
      const price = event.price
      if (priceFilter === 'under40' && price >= 40) return false
      if (priceFilter === '40to50' && (price < 40 || price > 50)) return false
      if (priceFilter === 'over50' && price <= 50) return false
    }

    return true
  })

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  return (
    <section id="events" className="py-24 bg-beige relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-forest/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-gold" />
                <span className="font-accent text-gold italic text-lg">Plan Your Adventure</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-title">
                {hasFilters ? 'Filtered Experiences' : 'Upcoming Experiences'}
                <br />
                <span className="gradient-text">in Ella</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-4 mt-4">
                <div className="decorative-line" />
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs font-body font-semibold text-gold hover:text-gold-light bg-gold/10 hover:bg-gold/20 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15} direction="left">
            <p className="font-body text-forest/60 max-w-sm text-sm leading-relaxed">
              Hand-crafted adventures led by local experts. Each experience is designed
              to connect you deeply with Ella's landscapes, culture, and people.
            </p>
          </ScrollReveal>
        </div>


        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl border border-forest/10 shadow-sm max-w-xl mx-auto"
          >
            <Compass className="w-12 h-12 text-gold mx-auto mb-4 animate-bounce" />
            <h3 className="font-display font-bold text-forest text-xl mb-2">No Adventures Found</h3>
            <p className="font-body text-forest/60 text-sm max-w-xs mx-auto mb-6">
              We couldn't find any experiences matching your current filters. Try resetting your search search options.
            </p>
            <button
              onClick={clearFilters}
              className="bg-forest text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-gold hover:text-forest-dark transition-colors duration-300"
            >
              Reset All Filters
            </button>
          </motion.div>
        ) : hasFilters ? (
          /* Filtered Results  */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
            <div className="sm:hidden -mx-4 px-4 mt-6">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                {filteredEvents.map((event, i) => (
                  <div key={event.id} className="w-[300px] flex-shrink-0 snap-start">
                    <EventCard event={event} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.slice(0, 3).map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>

            <div className="sm:hidden -mx-4 px-4">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                {eventsData.map((event, i) => (
                  <div key={event.id} className="w-[300px] flex-shrink-0 snap-start">
                    <EventCard event={event} index={i} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 gap-6 mt-6">
              {eventsData.slice(3, 5).map((event, i) => (
                <EventCard key={event.id} event={event} index={i + 3} />
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="flex justify-center mt-12">
                <Link
                  to="/experiences"
                  className="group flex items-center gap-3 border-2 border-forest text-forest font-body font-semibold 
                             px-8 py-3.5 rounded-full hover:bg-forest hover:text-white transition-all duration-300 
                             hover:scale-105 active:scale-95"
                >
                  View All Experiences
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  )
}
