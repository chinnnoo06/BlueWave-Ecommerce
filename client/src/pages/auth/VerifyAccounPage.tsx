import { useEffect } from "react";
import { motion } from "framer-motion"
import { useAppStore } from "../../stores/useAppStore";
import { useNavigate } from "react-router-dom";
import { useResendTimer } from "../../hooks/useResendTimer";
import { slideInBottom } from "../../helpers/animations/motion";
import { timeFormat } from "../../helpers/utils/format.utils";

export const VerifyAccountPage = () => {
    const navigate = useNavigate();
    const { user, emailToVerify, forwardEmail } = useAppStore()
    const { remainingTime, canForward, inProcess, manejarReenvio } =
        useResendTimer({ seconds: 30, onResend: forwardEmail });

    useEffect(() => {
        if (user === null && emailToVerify === '') {
            navigate("/iniciar-sesion");
        }
        if (user?.isVerified && emailToVerify === '') {
            navigate("/");
        }
    }, [user, emailToVerify, navigate]);

    return (
        <motion.div {...slideInBottom} id="verifyAccount" className="verify-account-container flex flex-col max-w-3xl px-4 mx-auto ">

            <div className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">Verificar Cuenta</h2>
            </div>

            <div className="flex flex-col text-center space-y-8 mb-8 text-[#001F3F] text-xl ">
                <h4 className="font-semibold text-xl lg:text-2xl">¡Gracias por registrarte!</h4>
                <p className="font-normal">
                    Hemos enviado un enlace de verificación a tu correo electrónico:
                </p>
                <p className="font-semibold">{emailToVerify}</p>
                <p>
                    Por favor, revisa tu bandeja de entrada y sigue las instrucciones para
                    verificar tu cuenta.
                </p>
                <p>
                    Tiempo restante para verificar: <strong>{timeFormat(remainingTime)}</strong>
                </p>

                <div className="max-w-1/2 mx-auto">
                    {canForward ? (
                        <button
                            className="py-1.5 text-base px-5 lg:py-2 lg:text-lg rounded-xl font-medium disabled:opacity-80 
                            text-[#EEEEEF] bg-[#001F3F] flex items-center gap-2 hover:bg-[#0C71E4] transition-all duration-300 shadow-md hover:shadow-lg "
                            onClick={manejarReenvio}
                            disabled={inProcess}
                        >
                            {inProcess ? 'Reenviando...' : 'Reenviar Enlace'}
                        </button>
                    ) : (
                        <p className="font-semibold">
                            Puedes reenviar el enlace una vez que expire el tiempo.
                        </p>
                    )}
                </div>

            </div>

        </motion.div>
    )
}
