import z from "zod";

export const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

export const AddressFormSchema = z.object({
  street: z.string().min(1, "La calle es obligatoria"),
  number: z.string().regex(/^\d+$/, "Solo números"),
  state: z.string().min(1, "El estado es obligatorio"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  postalCode: z.string().regex(/^\d{5}$/, "CP inválido"),
});

