import { useEffect } from "react"
import { motion } from "framer-motion"
import { FormLogin } from "../../components/auth/FormLogin"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore";
import { toast } from "react-toastify"
import { slideInBottom } from "../../helpers/animations/motion";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, verifySuccessToken } = useAppStore()

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user]);

    useEffect(() => {
        const run = async () => {
            const successTokenVerified = searchParams.get("successVerified");
            const successTokenPasswordUpdated = searchParams.get("successPasswordUpdated");

            const handleToken = async (token: string, message: string, toastId: string) => {
                try {
                    await verifySuccessToken(token);
                    toast.success(message, { toastId, className: "toast-success" });
                    navigate("/iniciar-sesion", { replace: true });
                } catch {
                    console.log("Token invalido");
                }
            };

            if (successTokenVerified) {
                await handleToken(successTokenVerified, "Cuenta verificada correctamente", "account-verified");
            }

            if (successTokenPasswordUpdated) {
                await handleToken(successTokenPasswordUpdated, "Contraseña Actualizada Correctamente", "password-recovered");
            }
        };

        run();
    }, [])


    return (
        <motion.div {...slideInBottom} id="login" className="login-container flex flex-col max-w-3xl px-4 mx-auto" >

            <div className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">Iniciar Sesión</h2>
            </div>

            <FormLogin />

        </motion.div>
    )
}
