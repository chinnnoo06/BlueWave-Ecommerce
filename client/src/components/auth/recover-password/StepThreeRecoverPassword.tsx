import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../stores/useAppStore";
import type { TNewPasswordToRecoverPassword } from "../../../types/auth.types";
import { NewPasswordToRecoverPasswordSchema } from "../../../schemas/auth.schema";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility";
import { useFormStatus } from "../../../hooks/useFormStatus";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export const StepThreeRecoverPassword = () => {
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading } = useFormStatus();
  const { showPassword, showConfirmPassword, handlePasswordVisibility, handleConfirmPasswordVisibility, inputTypePassword, inputTypeConfirmPassword } = usePasswordVisibility()
  const { saveNewPassword } = useAppStore()
  const { register, handleSubmit, formState: { errors } } = useForm<TNewPasswordToRecoverPassword>({
    resolver: zodResolver(NewPasswordToRecoverPasswordSchema)
  })

  const onSubmit = async ({ newPassword }: TNewPasswordToRecoverPassword) => {
    startLoading()

    try {
      const successToken = await saveNewPassword(newPassword)

      sessionStorage.setItem("passwordRecovered", "true");

      navigate(`/iniciar-sesion?successPasswordUpdated=${successToken}`);
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
      <h4 className='font-semibold text-[#001F3F] text-center text-xl lg:text-2xl'>Ingresa tu nueva contraseña</h4>

      <form className='space-y-10 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="form-group">
            <label htmlFor="newPassword" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={inputTypePassword}
                id="newPassword"
                placeholder="Ingrese su nueva contraseña"
                {...register("newPassword")}
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
              />
              <span className="absolute top-1/2 right-4 -translate-1/2 text-[#001F3F] hover:text-[#001F3F]/80" onClick={handlePasswordVisibility}>
                {showPassword ? (
                  <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                ) : (
                  <Eye className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                )}
              </span>
            </div>

            <div className="flex justify-between mt-1 transition cursor-pointer">
              <div>
                {errors.newPassword && (
                  <span className="text-sm text-red-500">{errors.newPassword?.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPassword" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={inputTypeConfirmPassword}
                id="confirmNewPassword"
                placeholder="Ingrese nuevamente su nueva contraseña"
                {...register("confirmNewPassword")}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
              />
              <span className="absolute top-1/2 right-4 -translate-1/2 text-[#001F3F] hover:text-[#001F3F]/80" onClick={handleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                ) : (
                  <Eye className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                )}
              </span>
            </div>

            <div className="flex justify-between mt-1 transition cursor-pointer">
              <div>
                {errors.confirmNewPassword && (
                  <span className="text-sm text-red-500">{errors.confirmNewPassword?.message}</span>
                )}
              </div>

            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            disabled={loading}
            className='py-1.5 px-5 lg:py-2 text-sm lg:text-base rounded-xl font-medium disabled:opacity-80 
                            text-[#EEEEEF] bg-[#001F3F] flex items-center gap-2 hover:bg-[#0C71E4] transition-all duration-300 shadow-md hover:shadow-lg '
            type="submit"
          >
            {loading ? 'Cargando...' : 'Cambiar Contraseña'}
          </button>
        </div>
      </form>

    </div>
  )
}
