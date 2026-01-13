import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // doble RAF = DOM listo incluso con Suspense
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [pathname])

  return null
}
