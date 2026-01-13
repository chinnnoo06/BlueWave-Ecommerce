import type z from "zod";
import type { EmailSchema } from "../schemas/common.schema";

export type TEmail = z.infer<typeof EmailSchema>

export type TModal = {
    showModal: boolean,
    onClose: () => void
}
