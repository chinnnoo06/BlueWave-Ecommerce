import z from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  surname: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono inválido"),
  subject: z.string().min(1, "El tema es obligatorio"),
  message: z.string().min(1, "El mensaje es obligatorio").max(450, "Máximo 250 caracteres"),
});