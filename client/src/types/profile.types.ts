import type z from "zod";

import type { ProfileAddressEditFormSchema, ProfileInfoEditFormSchema, ProfilePasswordEditFormSchema, ProfilePasswordEditSchema } from "../schemas/profile.schema";

export type TProfileInfoEditForm = z.infer<typeof ProfileInfoEditFormSchema>

export type TProfilePasswordEditForm = z.infer<typeof ProfilePasswordEditFormSchema>

export type TProfilePasswordEdit = z.infer<typeof ProfilePasswordEditSchema>

export type TProfileAddressEditForm = z.infer<typeof ProfileAddressEditFormSchema>
