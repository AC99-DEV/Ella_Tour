import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, MapPin, Clock, Users, Star,
  CheckCircle, ChevronRight, Phone, Mail, Shield, Zap, Heart
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import EventCard from '../components/EventCard'
import ScrollReveal from '../components/ScrollReveal'
import eventsData from '../data/events.json'

export default function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = eventsData.find(e => e.id === id)
  const suggestions = eventsData.filter(e => e.id !== id).slice(0, 3)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center">
          <h2 className="font-display text-3xl text-forest mb-4">Experience Not Found</h2>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[400px] flex items-end overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={event.image}
            alt={`${event.title} – ${event.category} experience in Ella, Sri Lanka`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest/30 to-transparent" />
        </motion.div>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 bg-white/15 backdrop-blur-md 
                     text-white px-4 py-2 rounded-full text-sm font-body font-medium 
                     hover:bg-white/25 transition-all duration-200 z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-gold text-forest-dark text-xs font-body font-semibold px-3 py-1 rounded-full">
                {event.category}
              </span>
              {event.tag && (
                <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-body px-3 py-1 rounded-full">
                  {event.tag}
                </span>
              )}
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-body px-3 py-1 rounded-full">
                {event.difficulty}
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}>
              {event.title}
            </h1>
            <p className="font-accent text-white/70 italic text-xl">{event.subtitle}</p>
          </motion.div>
        </div>
      </section>


      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, label: 'Date', value: event.displayDate },
                    { icon: Clock, label: 'Duration', value: event.duration },
                    { icon: Users, label: 'Max Group', value: `${event.maxGuests} people` },
                    { icon: Star, label: 'Rating', value: `${event.rating} (${event.reviewCount})` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                      <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <div className="text-xs font-body text-forest/50 mb-0.5">{label}</div>
                      <div className="font-display font-semibold text-forest text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display font-bold text-forest text-2xl mb-5">About This Experience</h2>
                  <p className="font-body text-forest/70 text-base leading-relaxed mb-5">{event.description1}</p>
                  <p className="font-body text-forest/70 text-base leading-relaxed">{event.description2}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display font-bold text-forest text-2xl mb-5">Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        <span className="font-body text-forest/75 text-sm">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-forest rounded-3xl p-8">
                  <h2 className="font-display font-bold text-white text-2xl mb-5">What's Included</h2>
                  <div className="space-y-3">
                    {event.included.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-gold" />
                        </div>
                        <span className="font-body text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display font-bold text-forest text-2xl mb-6">Itinerary</h2>
                  <div className="relative">
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gold/20" />
                    <div className="space-y-6">
                      {event.itinerary.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-4 relative"
                        >
                          <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0 relative z-10">
                            <span className="font-display font-bold text-gold text-xs">{i + 1}</span>
                          </div>
                          <div className="pt-1.5">
                            <span className="font-body font-semibold text-gold text-sm">{step.time}</span>
                            <p className="font-body text-forest/70 text-sm mt-0.5">{step.activity}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>


              {event.gallery && (
                <ScrollReveal delay={0.1}>
                  <div>
                    <h2 className="font-display font-bold text-forest text-2xl mb-5">Photo Gallery</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {event.gallery.map((src, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden aspect-square img-zoom shadow-sm">
                          <img
                            src={src}
                            alt={`${event.title} photo ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <ScrollReveal direction="left">
                  <div className="bg-white rounded-3xl shadow-xl shadow-forest/10 overflow-hidden">
                    <div className="bg-forest p-6">
                      <div className="text-white/60 text-xs font-body uppercase tracking-wider mb-1">Estimated Cost</div>
                      <div className="flex items-end gap-2">
                        <span className="font-display font-bold text-white text-4xl">LKR {event.price}</span>
                        <span className="text-white/50 font-body text-sm pb-1">/ person</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-white font-body text-sm font-semibold">{event.rating}</span>
                        <span className="text-white/50 font-body text-sm">({event.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="p-6 border-b border-forest/10 space-y-4 bg-beige/30">
                      <h3 className="font-display font-bold text-forest text-lg">Trail Parameters</h3>

                      <div className="grid grid-cols-2 gap-4 text-xs font-body text-forest/80">
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">Start Time</span>
                          <span className="font-semibold">{event.time}</span>
                        </div>
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">End Time</span>
                          <span className="font-semibold">{event.id === 'one-day-hike-ella' ? '03:00 PM' : 'Flexible'}</span>
                        </div>
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">Duration</span>
                          <span className="font-semibold">{event.duration}</span>
                        </div>
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">Distance</span>
                          <span className="font-semibold">{event.id === 'one-day-hike-ella' ? '15.4 km Loop' : 'Custom'}</span>
                        </div>
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">Trek Guide</span>
                          <span className="font-semibold text-gold">Skilled Local Guide</span>
                        </div>
                        <div>
                          <span className="block text-forest/40 uppercase tracking-widest text-[9px] font-bold mb-0.5">Emergency Unit</span>
                          <span className="font-semibold text-gold">Ready & Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-display font-bold text-forest text-base">Inquire & Book Trail</h3>
                      <p className="font-body text-forest/60 text-xs leading-relaxed">
                        To arrange this trail, contact us directly or visit our **Hiking Bar & Restaurant** in Ella. We offer fully guided, safe, and custom tracking options.
                      </p>

                      <div className="space-y-2">
                        <a
                          href="tel:+94712345678"
                          className="w-full flex items-center justify-center gap-2 bg-forest text-white font-body font-semibold py-3.5 rounded-xl hover:bg-forest-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
                        >
                          <Phone className="w-4 h-4 text-gold" />
                          Call: +94 71 234 5678
                        </a>
                        <a
                          href="mailto:hello@ellahikingtrails.lk"
                          className="w-full flex items-center justify-center gap-2 border border-forest text-forest font-body font-semibold py-3.5 rounded-xl hover:bg-forest/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
                        >
                          <Mail className="w-4 h-4 text-gold" />
                          Email Booking Query
                        </a>
                      </div>

                      <div className="text-center pt-2 border-t border-forest/10">
                        <span className="text-[10px] text-forest/40 uppercase font-body tracking-wider">Hiking Bar & Restaurant since 2010</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2} direction="left">
                  <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-body font-semibold text-forest text-sm">{event.location}</div>
                      <div className="font-body text-forest/50 text-xs mt-0.5">
                        Meeting point shared upon trail confirmation
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <ChevronRight className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold italic text-lg">You Might Also Love</span>
            </div>
            <h2 className="section-title mb-10">More Trails & Adventures</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((evt, i) => (
              <EventCard key={evt.id} event={evt} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
