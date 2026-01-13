import { AboutOurStory } from "../../components/about/AboutOurStory"
import { AboutOurValues } from "../../components/about/AboutOurValues"
import { AboutStats } from "../../components/about/AboutStats"
import { HomeExperience } from "../../components/home/HomeExperience"

export const AboutPage = () => {
  return (
    <div id="about" className="about-container flex flex-col">

      <div className="about-our-story-container pb-15">
        <AboutOurStory />
      </div>

      <div className="about-stats-container pb-15">
        <AboutStats />
      </div>

      <div className="about-experience-container py-15 bg-[#e2e4f4]">
        <HomeExperience />
      </div>

      <div className="about-our-values-container py-15">
        <AboutOurValues />
      </div>

    </div>
  )
}
