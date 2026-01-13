import z from "zod";

import { UserSchema } from "./user.schema";

export const LoginSchema = z.object({
  email: z.string().min(1, "El correo electrónico es obligatorio").email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria").min(6, "Mínimo 6 caracteres"),
});

export const LoginResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    user: UserSchema
  }),
  z.object({
    status: z.literal("unverified"),
    email: z.string().email()
  })
]);

export const DraftUserFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  surname: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const DraftUserSchema = DraftUserFormSchema.omit({
  confirmPassword: true,
});

export const CodeToRecoverPasswordSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "El código debe ser de 6 dígitos"),
})

export const NewPasswordToRecoverPasswordSchema = z.object({
  newPassword: z.string().min(6, "Mínimo 6 caracteres"),
  confirmNewPassword: z.string().min(6, "Mínimo 6 caracteres"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"],
});