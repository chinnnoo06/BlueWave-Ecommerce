import type { TProduct } from "../../types/product.types"

export type TProductProps = {
    product: TProduct ,
    selectedColor: number,
    setSelectedColor?: React.Dispatch<React.SetStateAction<number>>
}