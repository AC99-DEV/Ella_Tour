import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const id = setTimeout(() => {
      if (location.hash) {
        const el = document.getElementById(location.hash.replace('#', ''))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }

      window.scrollTo({ top: 0, left: 0 })
    }, 0)

    return () => clearTimeout(id)
  }, [location.pathname, location.hash])

  return null
}
