import { useAppStore } from "../../stores/useAppStore";
import { useForm } from "react-hook-form";
import { DraftUserFormSchema } from "../../schemas/auth.schema";
import type { TDraftUserForm } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { useFormStatus } from "../../hooks/useFormStatus";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export const FormRegister = () => {
    const navigate = useNavigate();
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { showPassword, showConfirmPassword, handlePasswordVisibility, handleConfirmPasswordVisibility, inputTypePassword, inputTypeConfirmPassword } = usePasswordVisibility()
    const { createAccount } = useAppStore()
    const { register, handleSubmit, formState: { errors } } = useForm<TDraftUserForm>({
        resolver: zodResolver(DraftUserFormSchema)
    })

    const onSubmit = async (user: TDraftUserForm) => {
        const { confirmPassword, ...payload } = user; // quitamos el campo de confirmPassword del schema

        startLoading()

        try {
            await createAccount(payload);

            navigate("/verificar-cuenta");
            toast.success('Cuenta creada correctamente', {
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
        <div className="flex flex-col">
            <form className='space-y-10 ' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="name" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                            Nombre(s)
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Escribe tu nombre(s)"
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                        />

                        {errors.name && (
                            <div className="mt-1"><span className="text-sm text-red-500">{errors.name?.message}</span></div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            id="surname"
                            placeholder="Escribe tus apellidos"
                            {...register("surname")}
                            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                        />

                        {errors.surname && (
                            <div className="mt-1"><span className="text-sm text-red-500">{errors.surname?.message}</span></div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                            Correo Electrónico
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="correo@ejemplo.com"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                        />

                        {errors.email && (
                            <div className="mt-1"><span className="text-sm text-red-500">{errors.email?.message}</span></div>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                            Número Telefónico
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="10 dígitos"
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                        />

                        {errors.phone && (
                            <div className="mt-1"><span className="text-sm text-red-500">{errors.phone?.message}</span></div>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypePassword}
                                id="password"
                                placeholder="Ingrese su contraseña"
                                {...register("password")}
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
                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password?.message}</span>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypeConfirmPassword}
                                id="confirmPassword"
                                placeholder="Ingrese nuevamente su contraseña"
                                {...register("confirmPassword")}
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
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
                                {errors.confirmPassword && (
                                    <span className="text-sm text-red-500">{errors.confirmPassword?.message}</span>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button
                        disabled={loading}
                        className='py-1.5 px-5 lg:py-2 text-sm lg:text-base rounded-lg font-medium disabled:opacity-80 
                            text-[#EEEEEF] bg-[#001F3F] flex items-center gap-2 hover:bg-[#0C71E4] transition-all duration-300 shadow-md hover:shadow-lg '
                        type="submit"
                    >
                        {loading ? 'Cargando...' : 'Crear Cuenta'}
                    </button>
                </div>
            </form>

            <div className="text-center mt-8 w-3/4 lg:w-1/2 mx-auto">
                <p className="font-normal text-[#001F3F] text-sm lg:text-base">
                    Al crear una cuenta, aceptas los
                    <span className="font-semibold hover:text-[#0C71E4] transition">
                        <Link to="/terminos-y-condiciones"> Terminos y Condiciones </Link>
                    </span>
                    Y la
                    <span className="font-semibold hover:text-[#0C71E4] transition">
                        <Link to="/politica-de-privacidad"> Política de Privacida </Link>
                    </span>
                    de BlueWave.
                </p>
            </div>

            <div className="text-center mt-8">
                <p className="text-[#001F3F] text-sm lg:text-base">¿Ya tienes una cuenta? <span className="font-semibold hover:text-[#0C71E4] transition"><Link to="/iniciar-sesion"> Inicia sesión </Link></span></p>
            </div>
        </div>
    )
}
