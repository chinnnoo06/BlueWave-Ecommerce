import { FormRegister } from "../../components/auth/FormRegister"
import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion"

export const RegisterPage = () => {

    return (
        <motion.div {...slideInBottom} id="register" className="register-container flex flex-col max-w-3xl px-4 mx-auto">
            <div className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">Crear Cuenta</h2>
            </div>

            <FormRegister />

        </motion.div>
    )
}
