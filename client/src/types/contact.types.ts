import type z from "zod";
import type { ContactFormSchema } from "../schemas/contact.schema";

export type TContactForm = z.infer<typeof ContactFormSchema>

type TStore = {
    name: string,
    ubication: string,
    schedule: string,
    phone: string
}
export type TRegion = {
    region: string,
    stores: TStore[]
}