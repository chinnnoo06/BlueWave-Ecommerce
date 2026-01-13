import { useAppStore } from "../stores/useAppStore";
import { useForm } from "react-hook-form";
import { useFormStatus } from "./useFormStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TEmail } from "../types/common.types";
import { EmailSchema } from "../schemas/common.schema";
import { toast } from "react-toastify";


export const useAddSubscriberForm = () => {
  const { loading, startLoading, stopLoading } = useFormStatus();
  const { addSubscriber } = useAppStore()
  const { register, handleSubmit, formState: { errors } } = useForm<TEmail>({
    resolver: zodResolver(EmailSchema)
  })

  const onSubmit = async (data: TEmail) => {
    startLoading()
    try {
      await addSubscriber(data.email);

      toast.success('Te has unido correctamente', {
        className: 'toast-success',
        toastId: 'addSubscriber',
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
