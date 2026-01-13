
import { Schema, Types, model } from "mongoose";
import { TCategory } from "../types/category/category.types";


const CategorySchema = new Schema<TCategory>({
    slug: {
        type: String,
        required: true,
        unique: true
    }, name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export const Category = model<TCategory>("Category", CategorySchema, "categories");