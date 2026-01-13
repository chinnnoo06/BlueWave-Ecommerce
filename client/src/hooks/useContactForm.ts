import { useForm } from "react-hook-form";
import { useAppStore } from "../stores/useAppStore";
import { useFormStatus } from "./useFormStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { TContactForm } from "../types/contact.types";
import { ContactFormSchema } from "../schemas/contact.schema";


export const useContactForm = () => {
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { user, sendEmailContact } = useAppStore()

    const { register, handleSubmit, formState: { errors } } = useForm<TContactForm>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: user?.name || "",
            surname: user?.surname || "",
            email: user?.email || "",
            phone: user?.phone || "",
            subject: "",
            message: ""
        }
    })

    const onSubmit = async (data: TContactForm) => {
        startLoading()
        try {
            await sendEmailContact(data);

            toast.success('Mensaje enviado correctamente', {
                className: 'toast-success',
                toastId: 'emailContact',
            });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        } finally {
            stopLoading()
        }
    }

    return {
        loading,
        errors,
        actions: {
            register,
            handleSubmit,
            onSubmit
        }
    }
}
