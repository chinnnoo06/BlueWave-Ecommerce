import { Types } from "mongoose";

export type TCategory = {
    slug: string,
    name: string,
    description: string,
    image: string
}

export type TCategoryId = { _id: Types.ObjectId };
