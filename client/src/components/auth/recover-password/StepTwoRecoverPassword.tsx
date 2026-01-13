import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../../stores/useAppStore";
import type { TStepRecoverPassword } from "./types";
import { CodeToRecoverPasswordSchema } from "../../../schemas/auth.schema";
import type { TCodeToRecoverPassword } from "../../../types/auth.types";
import { useFormStatus } from "../../../hooks/useFormStatus";
import { toast } from "react-toastify";

export const StepTwoRecoverPassword = ({ setStep }: TStepRecoverPassword) => {
  const { loading, startLoading, stopLoading } = useFormStatus();
  const { validateCodeToRecoverPassword } = useAppStore()
  const { register, handleSubmit, formState: { errors } } = useForm<TCodeToRecoverPassword>({
    resolver: zodResolver(CodeToRecoverPasswordSchema)
  })

  const onSubmit = async ({ code }: TCodeToRecoverPassword) => {
    startLoading()

    try {
      await validateCodeToRecoverPassword(code)

      setStep(3)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error inesperado"
      );
    } finally {
      stopLoading()
    }
  }

  return (
    <div className="flex flex-col">
      <h4 className='font-semibold text-[#001F3F] text-center text-xl lg:text-2xl'>Ingresa el código que se le envio a su email</h4>

      <form className='space-y-10 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="code" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
            Código
          </label>
          <input
            type="text"
            id="code"
            placeholder="Escribe el código"
            {...register("code")}
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
          />

          {errors.code && (
            <div className="mt-1"><span className="text-sm text-red-500">{errors.code?.message}</span></div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            disabled={loading}
            className='py-1.5 px-5 lg:py-2 text-sm lg:text-base rounded-lg font-medium disabled:opacity-80 
                            text-[#EEEEEF] bg-[#001F3F] flex items-center gap-2 hover:bg-[#0C71E4] transition-all duration-300 shadow-md hover:shadow-lg '
            type="submit"
          >
            {loading ? 'Cargando...' : 'Validar Código'}
          </button>
        </div>
      </form>

    </div>
  )
}
