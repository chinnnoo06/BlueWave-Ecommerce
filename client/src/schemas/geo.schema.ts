import { z } from "zod";

export const MunicipalitySchema = z.object({
  name: z.string(),
});

export const StateSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  country: z.literal("MX"),
  municipalities: z.array(MunicipalitySchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
