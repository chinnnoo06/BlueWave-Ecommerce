import z from "zod";
import { AddressFormSchema } from "./address.schema";

export const ProfileInfoEditFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  surname: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono inválido")
});

export const ProfilePasswordEditFormSchema = z.object({
  oldPassword: z.string().min(6, "Mínimo 6 caracteres"),
  newPassword: z.string().min(6, "Mínimo 6 caracteres"),
  confirmNewPassword: z.string().min(6, "Mínimo 6 caracteres"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"],
});

export const ProfilePasswordEditSchema = ProfilePasswordEditFormSchema.omit({
  confirmNewPassword: true,
});

export const ProfileAddressEditFormSchema = AddressFormSchema;