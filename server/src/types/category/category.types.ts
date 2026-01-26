import { Document } from "mongoose"

export type TCategory = {
    slug: string,
    name: string,
    description: string,
    image: string
}

export type TCategoryDocument = Document & TCategory
