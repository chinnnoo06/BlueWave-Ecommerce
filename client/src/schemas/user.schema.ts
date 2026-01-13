import z from "zod";
import { AddressSchema } from "./address.schema";

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  favorites: z.array(z.string()),
  address: AddressSchema.optional(),
  searches: z.array(z.string()),
  role: z.enum(["admin", "client"]),
  isVerified: z.boolean()
});

