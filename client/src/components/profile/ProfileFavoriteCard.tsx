import { ArrowRight, Trash2 } from "lucide-react"
import type { TFavorite } from "../../types/favorite.types"
import { toast } from "react-toastify"
import { useAppStore } from "../../stores/useAppStore"
import { useFormStatus } from "../../hooks/useFormStatus"
import { Link } from "react-router-dom"
import { discountPrice, isNewProduct } from "../../helpers/utils/product.utils"
import { GlobalImageProduct } from "../../helpers/config/env"

type TProfileFavoriteCard = {
  product: TFavorite,
  index: number
}

export const ProfileFavoriteCard = ({ product, index }: TProfileFavoriteCard) => {
  const { user, removeFavorite } = useAppStore()
  const { loading, startLoading, stopLoading } = useFormStatus();

  const length = user?.favorites.length

  const handleRemoveFavorite = async (idProduct: TFavorite['_id']) => {
    startLoading()
    try {
      await removeFavorite(idProduct)

      toast.success('Producto eliminado de favoritos correctamente', {
        className: 'toast-success',
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error inesperado"
      );
    } finally {
      stopLoading()
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-5 rounded-lg sm:items-center  ${length != undefined && index < length - 1 && 'mb-10'}`} >

      <div className="relative w-full sm:w-40 h-40 rounded-lg flex items-center justify-center ">
        {(product.promotion.active || isNewProduct(product.createdAt)) && (
          <span
            className='absolute top-1 left-1 text-[#EEEEEF] text-xs font-semibold px-2 py-0.5 rounded z-10
                                                bg-linear-to-r from-[#001F3F] to-[#0C71E4]'
          >
            {product.promotion.active ? `${product.promotion.discountPercentage}% OFF` : 'Nuevo'}
          </span>
        )}
        <img
          src={`${GlobalImageProduct.url}${product.colors[0].images[0]}`}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col">

        <div className="flex-1 flex flex-col md:flex-row md:gap-5">

          <div className="flex-1">
            <p className="font-semibold leading-tight line-clamp-1 opacity-65 mb-1 text-sm lg:text-base">
              {product.category}
            </p>
            <h3 className="leading-tight line-clamp-2 mb-3 text-base lg:text-lg text-[#001F3F] ">
              {product.name}
            </h3>
            <div className='flex gap-2 mb-4'>
              {product.colors.map((c, index) => (
                <button
                  key={index}
                  className='w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 transition-all
                                            border-gray-200 hover:border-gray-300'
                  style={{ backgroundColor: c.hex || '#ccc' }}
                >
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            {product.promotion.active ? (
              <div className="flex flex-col xs:flex-row md:flex-col gap-0 xs:gap-2 md:gap-0">
                <p className="text-[#001F3F] font-semibold text-sm lg:text-base">
                  MXN {discountPrice(product.price, product.promotion.discountPercentage).toFixed(2)}
                </p>
                <p className="text-[#001F3F] font-semibold line-through opacity-65 text-sm lg:text-base">
                  MXN {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-[#001F3F] font-semibold text-sm lg:text-base">
                MXN {product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 mt-4 lg:mt-0 border-t border-[#001F3F]/25">
          <div className="flex gap-5">
            <Link to={`/producto/${product.slug}--${product._id}`}>
              <button
                className="ccursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
              >
                <ArrowRight size={16} />
                Ver producto
              </button>
            </Link>

            <button
              disabled={loading}
              onClick={() => handleRemoveFavorite(product._id)}
              className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm lg:text-base transition-colors"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
