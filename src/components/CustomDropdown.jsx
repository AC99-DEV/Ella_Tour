import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

export default function CustomDropdown({ value, onChange, options, variant = 'dark', label }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value) || options[0]

  const handleSelect = (val) => {
    onChange(val)
    setIsOpen(false)
  }

  const isDark = variant === 'dark'

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className={`block text-[10px] font-body font-bold uppercase tracking-widest ml-3 mb-1 ${
          isDark ? 'text-gold' : 'text-forest/60'
        }`}>
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border rounded-xl px-4 py-2.5 text-sm font-body transition-all duration-300 text-left ${
          isDark
            ? 'bg-white/10 border-white/10 text-white hover:bg-white/15 focus:border-gold/50'
            : 'bg-white border-forest/15 text-forest hover:bg-forest/5 focus:border-gold'
        }`}
      >
        <span className="truncate">{selectedOption?.label || selectedOption?.value || value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
          isDark ? 'text-gold' : 'text-forest/60'
        } ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-[100] left-0 right-0 mt-2 rounded-xl border shadow-xl overflow-hidden ${
              isDark
                ? 'bg-forest-dark/95 backdrop-blur-md border-white/10 text-white'
                : 'bg-white border-forest/15 text-forest'
            }`}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((opt) => {
                const isSelected = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm font-body text-left transition-colors duration-150 ${
                      isSelected
                        ? isDark ? 'bg-gold/20 text-gold font-semibold' : 'bg-forest/10 text-forest font-semibold'
                        : isDark ? 'hover:bg-white/5 hover:text-gold' : 'hover:bg-forest/5 hover:text-gold'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
