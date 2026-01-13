import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion";
import { StepOneRecoverPassword } from "../../components/auth/recover-password/StepOneRecoverPassword";
import { StepTwoRecoverPassword } from "../../components/auth/recover-password/StepTwoRecoverPassword";
import { StepThreeRecoverPassword } from "../../components/auth/recover-password/StepThreeRecoverPassword";
import { useAppStore } from "../../stores/useAppStore";
import { useNavigate } from "react-router-dom";

export const RecoverPasswordPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); 
    const { user } = useAppStore()

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, []);

    return (
        <motion.div {...slideInBottom} id="recoverPassword" className="recover-password-container flex flex-col max-w-3xl px-4 mx-auto">

            <div className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">Recuperar Contraseña</h2>
            </div>

            {step === 1 && <StepOneRecoverPassword setStep={setStep} />}

            {step === 2 && <StepTwoRecoverPassword setStep={setStep} />}

            {step === 3 && <StepThreeRecoverPassword />}
        </motion.div>
    )
}
