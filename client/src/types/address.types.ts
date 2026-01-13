import type z from "zod";
import type { AddressSchema } from "../schemas/address.schema";

export type TAddress = z.infer<typeof AddressSchema>;