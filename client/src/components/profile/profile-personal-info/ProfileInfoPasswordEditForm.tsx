import { useForm } from "react-hook-form";
import { useFormStatus } from "../../../hooks/useFormStatus";
import { useAppStore } from "../../../stores/useAppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TProfileInfoPasswordProps } from "./types";
import { toast } from "react-toastify";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ProfilePasswordEditFormSchema } from "../../../schemas/profile.schema";
import type { TProfilePasswordEditForm } from "../../../types/profile.types";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility";
import { inputProfileBase } from "../../../helpers/styleClasses/inputs";

export const ProfileInfoPasswordEditForm = ({ setShowEditPasswordForm }: TProfileInfoPasswordProps) => {
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { showOldPassword, showPassword, showConfirmPassword, handleOldPasswordVisibility, handlePasswordVisibility, handleConfirmPasswordVisibility, inputTypeOldPassword, inputTypePassword, inputTypeConfirmPassword } = usePasswordVisibility()
    const { editPassword } = useAppStore()
    const { register, handleSubmit, formState: { errors } } = useForm<TProfilePasswordEditForm>({
        resolver: zodResolver(ProfilePasswordEditFormSchema)
    })

    const onSubmit = async (data: TProfilePasswordEditForm) => {
        const { confirmNewPassword, ...payload } = data
        startLoading()

        try {
            await editPassword(payload)

            setShowEditPasswordForm(false)

            toast.success('Información actualizada correctamente', {
                className: 'toast-success',
            });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        } finally {
            stopLoading()
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base lg:text-lg text-[#001F3F]">Cambiar Contraseña</h3>
                <button
                    onClick={() => setShowEditPasswordForm(false)}
                    className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                >
                    <ArrowLeft size={16} />
                    Regresar
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-0">

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Actual Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypeOldPassword}
                                {...register("oldPassword")}
                                placeholder="Escribe tu nombre"
                                className={inputProfileBase}
                            />
                            <span className="absolute top-1/2 right-4 -translate-1/2 text-[#001F3F] hover:text-[#001F3F]/80" onClick={handleOldPasswordVisibility}>
                                {showOldPassword ? (
                                    <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                ) : (
                                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                )}
                            </span>
                        </div>

                        {errors.oldPassword && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="border-t border-[#001F3F]/25" />

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypePassword}
                                {...register("newPassword")}
                                placeholder="Escribe tu nombre"
                                className={inputProfileBase}
                            />
                            <span className="absolute top-1/2 right-4 -translate-1/2 text-[#001F3F] hover:text-[#001F3F]/80" onClick={handlePasswordVisibility}>
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                ) : (
                                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                )}
                            </span>
                        </div>

                        {errors.newPassword && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="border-t border-[#001F3F]/25" />

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypeConfirmPassword}
                                {...register("confirmNewPassword")}
                                placeholder="Escribe tu nombre"
                                className={inputProfileBase}
                            />
                            <span className="absolute top-1/2 right-4 -translate-1/2 text-[#001F3F] hover:text-[#001F3F]/80" onClick={handleConfirmPasswordVisibility}>
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                ) : (
                                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                                )}
                            </span>
                        </div>

                        {errors.confirmNewPassword && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.confirmNewPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="border-t border-[#001F3F]/25" />

                </div>

                <div className="pt-4 flex justify-center">
                    <button
                        disabled={loading}
                        type="submit"
                        className="py-1.5 px-6 text-sm rounded-lg font-medium
                       text-[#EEEEEF] bg-[#001F3F]
                       hover:bg-[#0C71E4] transition shadow-md"
                    >
                        {loading ? 'Cargando...' : 'Guardar cambios'}
                    </button>
                </div>
            </form>
        </>
    )
}
