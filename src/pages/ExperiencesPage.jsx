import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import EventCard from '../components/EventCard'
import ScrollReveal from '../components/ScrollReveal'
import eventsData from '../data/events.json'
import CustomDropdown from '../components/CustomDropdown'

const difficultyOptions = [
  { value: 'All', label: 'Any Difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'challenging', label: 'Challenging' }
]

const priceOptions = [
  { value: 'All', label: 'Any Budget' },
  { value: 'under11000', label: 'Under LKR 11000' },
  { value: '11000 to 14000', label: 'LKR 11000 - LKR 14000' },
  { value: 'over15000', label: 'Over LKR 15000' }
]
const categories = ['All', ...Array.from(new Set(eventsData.map(e => e.category)))]

export default function ExperiencesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'All')
  const [budget, setBudget] = useState(searchParams.get('price') || 'All')

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All')
    setDifficulty(searchParams.get('difficulty') || 'All')
    setBudget(searchParams.get('price') || 'All')
  }, [searchParams])

  const isCategoryActive = (cat) => {
    if (activeCategory === cat) return true
    const activeLower = activeCategory.toLowerCase()
    const catLower = cat.toLowerCase()
    if (activeLower === 'hiking' && catLower === 'hiking & trekking') return true
    if (activeLower === 'culture' && catLower === 'cultural trails') return true
    return false
  }

  // Filter experiences
  const filtered = eventsData.filter(event => {
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (activeCategory !== 'All') {
      const cat = activeCategory.toLowerCase()
      const eventCat = event.category.toLowerCase()
      if (cat === 'hiking' && !eventCat.includes('hiking') && !eventCat.includes('trekking')) return false
      if (cat === 'culture' && !eventCat.includes('culture') && !eventCat.includes('cultural') && !eventCat.includes('nature')) return false
      if (cat === 'sunset' && !eventCat.includes('sunset') && !event.title.toLowerCase().includes('sunset') && !event.title.toLowerCase().includes('sunrise') && !event.shortDescription.toLowerCase().includes('sunset') && !event.shortDescription.toLowerCase().includes('sunrise')) return false
      if (cat === 'experience' && !eventCat.includes('experience') && !eventCat.includes('tea') && !event.title.toLowerCase().includes('tea') && !event.shortDescription.toLowerCase().includes('tea') && !event.highlights.some(h => h.toLowerCase().includes('tea'))) return false
      if (cat !== 'hiking' && cat !== 'culture' && cat !== 'sunset' && cat !== 'experience' && eventCat !== cat) return false
    }

    if (difficulty !== 'All' && event.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false
    }

    if (budget !== 'All') {
      const price = event.price
      if (budget === 'under11000' && price >= 11000) return false
      if (budget === '11000 to 14000' && (price < 11000 || price > 14000)) return false
      if (budget === 'over15000' && price < 15000) return false
    }

    return true
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSearchParams(new URLSearchParams())
  }

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    setSearchParams(params)
  }

  const handleDifficultyChange = (diff) => {
    const params = new URLSearchParams(searchParams)
    if (diff === 'All') {
      params.delete('difficulty')
    } else {
      params.set('difficulty', diff)
    }
    setSearchParams(params)
  }

  const handleBudgetChange = (bgt) => {
    const params = new URLSearchParams(searchParams)
    if (bgt === 'All') {
      params.delete('price')
    } else {
      params.set('price', bgt)
    }
    setSearchParams(params)
  }

  return (
    <PageTransition>
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507499244229-be438d3c06d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGVsbGElMjBzcmklMjBsYW5rYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Panoramic landscape of Ella Sri Lanka hills and trails"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest/40 to-forest/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-1.5 text-gold text-xs font-body font-semibold uppercase tracking-wider mb-3 hover:text-gold-light transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Compass className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold italic text-lg">Our Services</span>
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl">
              Ella Trails & <span className="gradient-text">Experiences</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <ScrollReveal>
            <div className="glass-card bg-white/70 border border-forest/10 p-6 rounded-3xl shadow-sm mb-8 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                <div className="relative md:col-span-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by trail name, landmark, waterfall..."
                    className="w-full bg-white border border-forest/15 rounded-xl pl-11 pr-4 py-3 text-sm text-forest font-body placeholder-forest/35 focus:outline-none focus:border-gold transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-forest/5 hover:bg-forest/10 flex items-center justify-center text-forest/60 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="md:col-span-3">
                  <CustomDropdown
                    value={difficulty}
                    onChange={handleDifficultyChange}
                    options={difficultyOptions}
                    variant="light"
                  />
                </div>

                <div className="md:col-span-3">
                  <CustomDropdown
                    value={budget}
                    onChange={handleBudgetChange}
                    options={priceOptions}
                    variant="light"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between pt-4 border-t border-forest/5">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all duration-200 ${isCategoryActive(cat)
                          ? 'bg-forest text-white shadow-sm'
                          : 'bg-white text-forest/70 hover:bg-forest/10 hover:text-forest border border-forest/10'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {(searchTerm || activeCategory !== 'All' || difficulty !== 'All' || budget !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs font-body font-semibold text-gold hover:text-gold-light bg-gold/5 hover:bg-gold/10 px-4 py-2 rounded-full border border-gold/25 transition-colors self-end lg:self-auto"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                )}
              </div>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="font-body text-forest/50 text-sm mb-6">
              Found <span className="font-semibold text-forest">{filtered.length}</span> hiking trails & experiences matching your criteria
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 bg-white rounded-3xl border border-forest/10 shadow-sm max-w-xl mx-auto"
              >
                <Compass className="w-12 h-12 text-gold mx-auto mb-4 animate-bounce" />
                <h3 className="font-display font-bold text-forest text-xl mb-2">No Adventures Found</h3>
                <p className="font-body text-forest/60 text-sm max-w-xs mx-auto mb-6">
                  We couldn't find any experiences matching your current search parameters. Try resetting your search filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-forest text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-gold hover:text-forest-dark transition-colors duration-300"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="results-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </PageTransition>
  )
}
