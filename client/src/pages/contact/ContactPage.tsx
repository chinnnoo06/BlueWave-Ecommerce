import { ContactFindStore } from "../../components/contact/contact-find-store/ContactFindStore"
import { ContactUs } from "../../components/contact/contact-us/ContactUs"
import { ContactFrequentlyQuestions } from "../../components/contact/ContactFrequentlyQuestions"


export const ContactPage = () => {
    return (
        <div id="contact" className="contact-container flex flex-col">

            <div className="contact-us-container pb-15">
                <ContactUs />
            </div>

            <div className="contact-find-store-container pb-15 ">
                <ContactFindStore />
            </div>

            <div className="contact-commun-questions-container py-15  bg-[#e2e4f4]">
                <ContactFrequentlyQuestions />
            </div>

        </div>
    )
}
