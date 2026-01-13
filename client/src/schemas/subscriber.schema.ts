import z from "zod";

export const SubscriberSchema = z.object({
    _id: z.string(),
    email: z.string().email("Email inválido"),
    createdAt: z.coerce.date(),
})