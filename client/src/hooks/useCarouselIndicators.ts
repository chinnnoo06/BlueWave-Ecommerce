import { useEffect, useRef, useState } from "react"
import type { TCategory } from "../types/category.types"
import type { TProduct } from "../types/product.types"
import { getItemWidth } from "../helpers/utils/layout.utils"

type TUseCarouselIndicatorsProps = {
    items: TCategory[] | TProduct[],
    minValue: number,
    smValue: number,
    lgValue: number
}

export const useCarouselIndicators = ({items, minValue, smValue, lgValue} : TUseCarouselIndicatorsProps) => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0)
    const [itemWidth, setItemWidth] = useState(getItemWidth(minValue, smValue, lgValue))

    useEffect(() => {
        const handleResize = () => {
            setItemWidth(getItemWidth(minValue, smValue, lgValue))
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [minValue, smValue, lgValue])

    useEffect(() => {
        const el = carouselRef.current
        if (!el) return

        const onScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el

            const isAtEnd =
                scrollLeft + clientWidth >= scrollWidth - 2

            if (isAtEnd) {
                setActiveIndex(items.length - 1)
                return
            }

            const index = Math.round(scrollLeft / itemWidth)
            setActiveIndex(index)
        }

        el.addEventListener("scroll", onScroll)
        return () => el.removeEventListener("scroll", onScroll)
    }, [itemWidth, items.length])

    type ScrollDirection = "left" | "right"

    const scroll = (direction: ScrollDirection) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -itemWidth : itemWidth,
                behavior: 'smooth',
            });
        }
    };

    return { carouselRef, itemWidth, activeIndex, scroll}
}
