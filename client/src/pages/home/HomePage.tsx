import { HomeCategories } from "../../components/home/HomeCategories"
import { HomeExperience } from "../../components/home/HomeExperience"
import { HomeMainContent } from "../../components/home/HomeMainContent"
import { HomeProducts } from "../../components/home/HomeProducts"
import { HomeWhyBlueWave } from "../../components/home/HomeWhyBlueWave"
import { SubscriberCart } from "../../components/subscriber/SubscriberCart"
import { ArticleInitials } from "../../components/article/ArticleInitials"

export const HomePage = () => {

  return (
    <>
      <div id="inicio" className="hero-container pb-15">
        <HomeMainContent />
      </div>

      <div className="home-products-container pb-15">
        <HomeProducts />
      </div>

      <div className="home-categories-container pb-15">
        <HomeCategories />
      </div>

      <div className="home-experience-container py-15 bg-[#e2e4f4]">
        <HomeExperience />
      </div>

      <div className="home-why-blue-wave-container py-15 ">
        <HomeWhyBlueWave />
      </div>

      <div className="subscribe-cart-container py-15 bg-[#e2e4f4]">
        <SubscriberCart />
      </div>

      <div className="home-experience-container py-15">
        <ArticleInitials />
      </div>
    </>

  )
}