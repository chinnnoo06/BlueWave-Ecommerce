import type z from "zod";
import type { CodeToRecoverPasswordSchema, DraftUserFormSchema, DraftUserSchema, LoginResponseSchema, LoginSchema, NewPasswordToRecoverPasswordSchema } from "../schemas/auth.schema";

export type TLogin = z.infer<typeof LoginSchema>

export type TLoginResponse = z.infer<typeof LoginResponseSchema>;

export type TDraftUserForm = z.infer<typeof DraftUserFormSchema>;

export type TDraftUser = z.infer<typeof DraftUserSchema>

export type TCodeToRecoverPassword = z.infer<typeof CodeToRecoverPasswordSchema>

export type TNewPasswordToRecoverPassword = z.infer<typeof NewPasswordToRecoverPasswordSchema>