import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import type { TProduct } from '../types/product.types';

type TUseScrollElementFromLocationProps = {
    products: TProduct[] | null
}

export const useScrollElementFromLocation = ({products} : TUseScrollElementFromLocationProps) => {
    const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const productId = location.state?.productId
    if (!productId || !products || products.length === 0) return

    let cancelled = false

    const attemptScroll = () => {
      if (cancelled) return

      const el = document.querySelector(
        `[data-product-id="${productId}"]`
      ) as HTMLElement | null

      if (el) {
        el.scrollIntoView({
          behavior: "auto",
          block: "center",
        })

        // Limpia el state para que no vuelva a dispararse
        navigate(location.pathname + location.search, { replace: true })
        return
      }

      requestAnimationFrame(attemptScroll)
    }

    requestAnimationFrame(attemptScroll)

    return () => {
      cancelled = true
    }
  }, [products, location.state, location.pathname, location.search, navigate])
}
