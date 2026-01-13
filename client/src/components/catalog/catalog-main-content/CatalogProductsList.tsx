import { AlertCircle } from "lucide-react"
import { useAppStore } from "../../../stores/useAppStore"
import { ProductCart } from "../../product/ProductCart"

type TCatalogProductsProps = {
    currentCategory: string,
}

export const CatalogProductsList = ({currentCategory} : TCatalogProductsProps) => {
    const { products, pagination } = useAppStore()

    return (
        <div className="lg:pl-4 w-full flex justify-center">
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 w-full">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            data-product-id={product._id}
                            className="relative w-full bg-transparent flex flex-col items-center transition-all duration-200 group"
                        >
                            <ProductCart product={product} currentCategory={currentCategory} page={pagination.page}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center text-[#001F3F]'>
                    <AlertCircle className="w-16 h-16 md:w-24 md:h-24 mb-2" />
                    <h3 className="font-semibold text-xl lg:text-2xl">No hay resultados</h3>
                </div>
            )}

        </div>
    )
}
