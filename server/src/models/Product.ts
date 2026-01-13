
import { Schema, Types, model } from "mongoose";
import { TColor, TProduct, TPromotion } from "../types/product/product.types";
import mongoosePaginate from "mongoose-paginate-v2";

const ColorSchema = new Schema<TColor>({
    color: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: false
        }
    ],
    hex: {
        type: String,
        required: true
    }
}, { _id: false });

const PromotionSchema = new Schema<TPromotion>({
    active: {
        type: Boolean,
        default: false
    },
    discountPercentage: {
        type: Number,
        default: 0
    }
}, { _id: false });

const ProductSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: [ColorSchema],
        required: true,
        validate: {
            validator: function (val) {
                return val.length >= 1; // al menos un color
            },
            message: '{PATH} debe tener al menos un color'
        }
    },
    promotion: {
        type: PromotionSchema,
        default: {}
    },
}, {
    timestamps: true
})

ProductSchema.plugin(mongoosePaginate);

export const Product = model<TProduct>("Product", ProductSchema, "products");