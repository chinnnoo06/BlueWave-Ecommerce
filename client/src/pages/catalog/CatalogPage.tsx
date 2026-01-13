import { useEffect } from "react";
import { CatalogHero } from "../../components/catalog/CatalogHero"
import { CatalogMainContent } from "../../components/catalog/catalog-main-content/CatalogMainContent"
import { useParams, useSearchParams } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { Spinner } from "../../components/ui/Spinner";
import { useScrollElementFromLocation } from "../../hooks/useScrollElementFromLocation";

export const CatalogPage = () => {
    const { category, page } = useParams();
    const [searchParams] = useSearchParams()

    const categoryParam = category ?? "todos"
    const pageParam = Number(page ?? "1")
    const searchQuery = searchParams.get("search")

    const { getCategories, getProducts, getProductsBySearch, categories, products } = useAppStore()
    
    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            getProductsBySearch(searchQuery, pageParam)
        } else {
            getProducts(categoryParam, pageParam)
        }
    }, [categoryParam, pageParam, searchQuery])

   useScrollElementFromLocation({ products })

    if (!categories.length || products === null) {
        return <Spinner />
    }
    
    return (
        <div id="catalog" className="catalog-container flex flex-col ">

            <div className="catalog-hero-container pb-15">
                <CatalogHero />
            </div>

            <div className="catalog-main-container pb-15">
                <CatalogMainContent categoryParam={categoryParam} searchQuery={searchQuery} />
            </div>

        </div>
    )
}
