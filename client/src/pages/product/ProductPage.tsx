import { useEffect, useState } from "react"
import { useAppStore } from "../../stores/useAppStore"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { ProductImg } from "../../components/product/ProductImg";
import { ProductInfo } from "../../components/product/ProductInfo";
import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion";

export const ProductPage = () => {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState(0);

  const slugIdParam = slugId ?? null

  const { getOneProduct, productSelected } = useAppStore()

  useEffect(() => {
    if (slugIdParam) {
      getOneProduct(slugIdParam)
    }
  }, [slugIdParam])

  useEffect(() => {
    if (productSelected === null) {
      navigate('/catalogo/todos/1')
    }
  }, [productSelected])


  if (!productSelected) return <Spinner />

  return (
    <div id="products" className="product-container flex flex-col max-w-[1300px] px-4 mx-auto pb-15 min-h-[50vh]">

      <motion.nav {...slideInBottom} className="mb-6">
        <div className="flex items-center text-sm md:text-base text-[#001F3F]/70 mb-2">
          <Link to="/" className="hover:text-[#0C71E4] transition-colors duration-200">Inicio</Link>

          <span className="mx-2">/</span>

          <Link
            to={`/catalogo/${location.state?.currentCategory || 'todos'}/${location.state?.page || 1}`}
            state={{
              page: location.state?.page || 1,
              currentCategory: location.state?.currentCategory,
              productId: location.state?.productId,
            }}
            className="hover:text-[#0C71E4] transition-colors duration-200"
          >
            Catálogo
          </Link>

          <span className="mx-2">/</span>

          <span className="text-[#001F3F] font-medium truncate max-w-[200px] md:max-w-[300px]">
            {productSelected.name}
          </span>
        </div>

      </motion.nav>

      <div className='flex flex-col lg:flex-row gap-4'>

        <ProductImg product={productSelected} selectedColor={selectedColor} />

        <ProductInfo product={productSelected} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>


    </div>
  )
}
