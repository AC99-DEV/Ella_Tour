import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Star } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@ellahikingtrails.lk', href: 'mailto:hello@ellahikingtrails.lk' },
  { icon: Phone, label: 'Call Us', value: '+94 71 234 5678', href: 'tel:+94712345678' },
  { icon: MapPin, label: 'Find Us', value: 'Ella, Badulla District, Sri Lanka', href: '#' },
  { icon: Clock, label: 'Working Hours', value: 'Daily: 6:00 AM – 8:00 PM', href: '#' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', date: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 bg-beige relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-forest/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold italic text-lg">Get in Touch</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">
              Start Your <span className="gradient-text">Trail Journey</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-forest/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Have questions about our trails? Our local team in Ella is here 7 days
              a week to help plan your outdoor trek.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Contact form */}
          <ScrollReveal delay={0.1} className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-forest/5 p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-forest text-2xl mb-2">Message Sent!</h3>
                  <p className="font-body text-forest/60 text-sm max-w-xs">
                    Thank you! Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', date: '', message: '' }) }}
                    className="mt-6 text-sm text-gold hover:text-gold-dark font-body underline transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body font-semibold text-forest/60 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold text-forest/60 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-forest/60 uppercase tracking-wider mb-1.5">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-forest/60 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your dream Ella adventure…"
                      className="input-field resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-forest text-white font-body font-semibold 
                               py-4 rounded-xl hover:bg-forest-light transition-all duration-300 
                               hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>


          <div className="md:col-span-2 space-y-5">

            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <ScrollReveal key={label} delay={0.15 + i * 0.07} direction="left">
                <a
                  href={href}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-gold" size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-body font-semibold text-forest/50 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="font-body text-forest font-medium text-sm">{value}</div>
                  </div>
                </a>
              </ScrollReveal>
            ))}

            {/* Map  */}
            <ScrollReveal delay={0.45} direction="left">
              <div className="relative rounded-2xl overflow-hidden h-44 bg-forest/10 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"
                  alt="Map location of Ella, Sri Lanka in the central highlands"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest/40 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gold mx-auto mb-1" />
                    <span className="font-body font-semibold text-white text-sm">Ella, Sri Lanka</span>
                    <p className="text-white/60 text-xs font-body">Badulla District, Central Highlands</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5} direction="left">
              <div className="flex items-center gap-3 bg-gold/5 border border-gold/20 rounded-2xl p-4">
                <Star className="w-5 h-5 text-gold fill-gold flex-shrink-0" />
                <div>
                  <div className="font-display font-bold text-forest text-sm">Rated #1 in Ella</div>
                  <div className="font-body text-forest/50 text-xs">TripAdvisor 2024 · 2,400+ reviews</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
