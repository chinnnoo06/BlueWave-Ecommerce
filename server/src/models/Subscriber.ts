
import { Schema, Types, model } from "mongoose";
import { TSubscriber } from "../types/communication";

const SubscriberSchema = new Schema<TSubscriber>({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true })

export const Subscriber = model<TSubscriber>("Subscriber", SubscriberSchema, "subscribers");