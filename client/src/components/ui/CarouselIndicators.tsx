type TCarouselIndicators = {
    total: number,
    activeIndex: number
}

export const CarouselIndicators = ({total, activeIndex} : TCarouselIndicators) => {
    return (
        <div className="flex justify-center gap-2 mt-10 sm:hidden">
            {Array.from({ length: total }).map((_, index) => (
                <span
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300
                                    ${index === activeIndex
                            ? "bg-[#0C71E4] w-6"
                            : "bg-gray-300 w-2"
                        }`}
                />
            ))}
        </div>
    )
}
