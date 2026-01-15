import { Types } from "mongoose";

export type TColor = {
    color: string,
    images?: string[],
    hex: string,
};

export type TPromotion = {
    active: boolean,
    discountPercentage: number
}

export type TProduct = {
    name: string,
    slug: string,
    category: Types.ObjectId,
    description: string,
    price: number,
    colors: TColor[],
    promotion?: TPromotion
};

export type TProductwithID = TProduct & { _id: Types.ObjectId }

export type TProductId = { _id: Types.ObjectId };

