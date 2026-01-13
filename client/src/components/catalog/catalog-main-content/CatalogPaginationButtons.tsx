import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../stores/useAppStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TCatalogPaginationButtonsProps = {
    categoryParam: string
    bool: boolean
}

export const CatalogPaginationButtons = ({ categoryParam, bool }: TCatalogPaginationButtonsProps) => {
    const navigate = useNavigate();
    const { pagination } = useAppStore()

    const goToPage = (pageNumber: number) => {
        if (pageNumber < 1) pageNumber = 1;
        else if (pageNumber > pagination.pages) pageNumber = pagination.pages;
        navigate(`/catalogo/${categoryParam}/${pageNumber}`)

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500)
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage, endPage;

        if (pagination.pages <= 5) {
            // Si hay 5 páginas o menos, mostrar todas
            startPage = 1;
            endPage = pagination.pages;
        } else {
            // Más de 5 páginas → mover el rango
            if (pagination.page <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (pagination.page + 2 >= pagination.pages) {
                startPage = pagination.pages - 4;
                endPage = pagination.pages;
            } else {
                startPage = pagination.page - 2;
                endPage = pagination.page + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`
                        relative px-3 py-1.5 lg:px-3.5 lg:py-2  
                        text-xs md:text-sm font-medium rounded-full transition-all duration-200
                        ${pagination.page === i
                            ? 'bg-[#0C71E4] text-white shadow-inner shadow-white/20'
                            : 'bg-[#001F3F]/5 text-[#001F3F] hover:bg-[#0C71E4]/10 hover:text-[#0C71E4]'
                        }
                        min-w-10 md:min-w-12
                    `}
                >
                    {i}
                    {pagination.page === i && (
                        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></span>
                    )}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            {bool && (
                <div className="flex flex-col items-center gap-6 ">

                    <div className="text-center">
                        <p className="text-xs lg:text-sm opacity-65 font-medium">
                            Página <span className="text-[#0C71E4] font-semibold">{pagination.page}</span> de{" "}
                            <span className="font-semibold">{pagination.pages}</span>
                        </p>
                        <p className="text-xs lg:text-sm opacity-65 mt-1">
                            {pagination.total} productos en total
                        </p>
                    </div>


                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => goToPage(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className={`
                                flex items-center justify-center px-2.5 py-1 lg:px-3 lg:py-1.5 
                                rounded-lg transition-all duration-300
                                ${pagination.page === 1
                                    ? 'bg-[#F5F5F5] text-[#001F3F]/30 cursor-not-allowed border border-[#001F3F]/10'
                                    : 'bg-white text-[#001F3F] border border-[#001F3F]/20 hover:border-[#0C71E4] hover:text-[#0C71E4] hover:shadow-md hover:shadow-[#001F3F]/5 hover:-translate-x-0.5'
                                }
                            `}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                        </button>


                        <div className="flex items-center gap-2">
                            {renderPageNumbers()}
                        </div>

                        <button
                            onClick={() => goToPage(pagination.page + 1)}
                            disabled={pagination.page === pagination.pages}
                            className={`
                                flex items-center justify-center px-2.5 py-1 lg:px-3 lg:py-1.5 
                                rounded-lg transition-all duration-300
                                ${pagination.page === pagination.pages
                                    ? 'bg-[#F5F5F5] text-[#001F3F]/30 cursor-not-allowed border border-[#001F3F]/10'
                                    : 'bg-white text-[#001F3F] border border-[#001F3F]/20 hover:border-[#0C71E4] hover:text-[#0C71E4] hover:shadow-md hover:shadow-[#001F3F]/5 hover:translate-x-0.5'
                                }
                            `}
                            aria-label="Página siguiente"
                        >
                            <ChevronRight className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
