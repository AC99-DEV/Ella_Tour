import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mountain, Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight, Heart } from 'lucide-react'

const footerLinks = {
  Explore: [
    { label: 'One Day Hike Ella', href: '/events/one-day-hike-ella' },
    { label: 'Waterfall Ride', href: '/events/waterfall-ride' },
    { label: 'Sunrise Hike', href: '/events/sunrise-hike' },
    { label: 'Natural Pools', href: '/events/natural-pools' },
    { label: 'Custom Trails', href: '/events/ella-trails' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
    { label: 'Cancellation Policy', href: '/' },
    { label: 'Cookie Policy', href: '/' },
  ],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-forest-dark relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-2 bg-gold/20 rounded-xl">
                <Mountain className="w-5 h-5 text-gold" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Ella <span className="text-gold">Hiking Trails</span>
              </span>
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Providing premium guided hiking and tracking services in the Ella area since 2010.
              Connecting travelers to the Central Highlands' ultimate trails.
            </p>

            <div className="flex gap-3 justify-center lg:justify-start">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 
                             hover:bg-gold/20 hover:text-gold transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white text-sm tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-white/50 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-widest uppercase mb-4">
              Contact
            </h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@ellahikingtrails.lk" className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@ellahikingtrails.lk
              </a>
              <a href="tel:+94712345678" className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +94 71 234 5678
              </a>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Ella, Badulla District, Sri Lanka
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-semibold text-white text-lg mb-1">
                Get Hiking Tips in Your Inbox
              </h4>
              <p className="text-white/40 text-sm font-body">
                Exclusive trail guides, safety news, and stunning photography delivered weekly.
              </p>
            </div>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-gold/20 text-gold px-6 py-3 rounded-full font-body text-sm"
              >
                <Heart className="w-4 h-4 fill-current" />
                You're subscribed! Thank you.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 
                             text-white placeholder-white/30 text-sm font-body 
                             focus:outline-none focus:border-gold focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="bg-gold text-forest-dark font-semibold text-sm px-6 py-2.5 rounded-full 
                             hover:bg-gold-light transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/30 text-xs">
            © 2026 Ella Hiking Trails. All rights reserved.
          </p>
          <p className="font-body text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-gold fill-gold" /> for Ella, Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
