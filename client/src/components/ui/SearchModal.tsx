import { Search } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useFormStatus } from "../../hooks/useFormStatus"
import { useForm } from "react-hook-form"
import type { TSearchForm } from "../../types/search.types"
import { SearchFormSchema } from "../../schemas/search.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore"
import ReactDOM from 'react-dom';
import { fadeOverlay, slideInBottom } from "../../helpers/animations/motion"

type TSearchModalProps = {
    open: boolean
    onClose: () => void
}

export const SearchModal = ({ open, onClose }: TSearchModalProps) => {
    const navigate = useNavigate()
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { getSearches, addSearch } = useAppStore()

    const searches = getSearches()

    const { register, handleSubmit, watch, reset, clearErrors, formState: { errors } } = useForm<TSearchForm>({
        resolver: zodResolver(SearchFormSchema)
    })
    const searchValue = watch("search")

    useEffect(() => {
        if (open) {
            reset()
            clearErrors()
        }
    }, [open, reset, clearErrors])

    const onSubmit = async (data: TSearchForm) => {
        startLoading()
        try {
            addSearch(data.search)

            navigate(
                `/catalogo/todos/1?search=${encodeURIComponent(data.search)}`
            )

            onClose()
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        } finally {
            stopLoading()
        }
    }

    return ReactDOM.createPortal(
        <AnimatePresence>
            {open && (
                <motion.div {...fadeOverlay}
                    className="fixed top-0 left-0 right-0 bottom-0 z-999 flex items-start justify-center bg-black/50 backdrop-blur-sm">

                    <motion.div {...slideInBottom} className="w-full max-w-3xl mt-24 px-4">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white rounded-full shadow-xl px-4 py-2 lg:px-5 lg:py-3"
                        >
                            <div className="flex items-center">
                                <Search className="w-4 h-4 lg:w-5 lg:h-5 opacity-65 mr-3 shrink-0" />

                                <input
                                    {...register("search")}
                                    autoFocus
                                    placeholder="Buscar"
                                    className="flex-1 min-w-0 outline-none placeholder-black/65 text-sm lg:text-base"
                                />

                                <button
                                    type={searchValue?.trim() ? "submit" : "button"}
                                    onClick={!searchValue?.trim() ? onClose : undefined}
                                    className="ml-3 shrink-0 whitespace-nowrap text-sm lg:text-base font-semibold opacity-65 hover:opacity-85"
                                >
                                    {loading ? "..." : searchValue?.trim() ? "Buscar" : "Cancelar"}
                                </button>
                            </div>

                        </form>


                        {errors.search && (
                            <p className="mt-2 text-sm text-red-500 px-2">
                                {errors.search.message}
                            </p>
                        )}


                        <div className="mt-6">
                            <p className="text-base lg:text-lg font-semibold text-white mb-3">
                                Historial de búsqueda reciente
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {searches.map((item, index) => (
                                    <button
                                        onClick={() => onSubmit({
                                            search: item
                                        })}
                                        key={index}
                                        className="cursor-pointer px-3 py-1 lg:px-4 lg:py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-300 text-[#001F3F]"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.getElementById('modal-root')!
    )
}
