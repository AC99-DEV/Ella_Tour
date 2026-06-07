import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react'

export default function EventCard({ event, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-forest/10 transition-all duration-500 flex flex-col"
    >
      {/* Image  */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={event.thumbnail || event.image}
          alt={`${event.title} – ${event.category} experience in Ella, Sri Lanka`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {event.tag && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide ${event.tagColor === 'gold'
              ? 'bg-gold text-forest-dark'
              : 'bg-forest text-white'
            }`}>
            {event.tag}
          </div>
        )}

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-black/40 text-white backdrop-blur-sm">
          {event.difficulty}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
          <span className="text-white text-xs font-semibold">{event.rating}</span>
          <span className="text-white/70 text-xs">({event.reviewCount})</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-body font-semibold text-gold uppercase tracking-widest">
            {event.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-forest text-lg leading-snug mb-2 group-hover:text-forest-light transition-colors">
          {event.title}
        </h3>

        <p className="font-body text-forest/60 text-sm leading-relaxed mb-4 flex-1">
          {event.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-forest/50 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>{event.displayDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-forest/50 text-xs">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-forest/50 text-xs">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span className="truncate">Ella, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-1.5 text-forest/50 text-xs">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Max {event.maxGuests}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-forest/10">
          <div>
            <span className="text-xs text-forest/40 font-body">From</span>
            <div className="font-display font-bold text-2xl text-forest leading-none">
              LKR {event.price}
              <span className="text-sm font-body font-normal text-forest/50 ml-1">/ person</span>
            </div>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-2 bg-forest text-white text-sm font-body font-semibold 
                       px-5 py-2.5 rounded-full hover:bg-gold hover:text-forest-dark transition-all duration-300 
                       hover:scale-105 active:scale-95 group/btn"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
