import { useForm } from "react-hook-form";
import { useAppStore } from "../../stores/useAppStore";
import type { TLogin } from "../../types/auth.types";
import { LoginSchema } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { useFormStatus } from "../../hooks/useFormStatus";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"

export const FormLogin = () => {
    const navigate = useNavigate();
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { showPassword, handlePasswordVisibility, inputTypePassword } = usePasswordVisibility()
    const { login, forwardEmail, loadCart } = useAppStore()
    const { register, handleSubmit, formState: { errors } } = useForm<TLogin>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit = async (credentials: TLogin) => {
        startLoading()

        try {
            const response = await login(credentials);

            if (response.status === "unverified") {

                await forwardEmail()
                navigate("/verificar-cuenta");
                return;
            }

            if (response.user.role === "admin") {
                navigate("/admin");
                toast.success('Sesión iniciada correctamente', {
                    className: 'toast-success',
                    toastId: 'login',
                });
                localStorage.clear()
            } else {
                await loadCart()
                toast.success('Sesión iniciada correctamente', {
                    className: 'toast-success',
                    toastId: 'login',
                });
                navigate("/");
                localStorage.clear()
            }

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
            <form className='space-y-10' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="email" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                            Correo Electrónico
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="correo@ejemplo.com"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                        />

                        {errors.email && (
                            <div className="mt-1"><span className="text-sm text-red-500">{errors.email?.message}</span></div>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base up">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={inputTypePassword}
                                id="password"
                                placeholder="Ingrese su contraseña"
                                {...register("password")}
                                className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 border-2 border-[#001F3F]/30
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

                            <Link to="/recuperar-contraseña" className="font-semibold text-[#001F3F] hover:text-[#0C71E4] transition text-sm lg:text-base">¿Olvidaste tu contraseña?</Link>
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
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </div>
            </form>

            <div className="text-center mt-8">
                <p className="text-sm lg:text-base text-[#001F3F]">¿No tienes una cuenta aún? <span className="font-semibold hover:text-[#0C71E4] transition"><Link to="/registrarse">Crea una cuenta</Link></span></p>
            </div>
        </div>
    )
}
