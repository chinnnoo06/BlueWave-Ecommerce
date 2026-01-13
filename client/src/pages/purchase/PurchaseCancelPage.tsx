import { motion } from "framer-motion"
import { XCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { useAppStore } from "../../stores/useAppStore";
import { slideInBottom } from "../../helpers/animations/motion";
import { timeFormat } from "../../helpers/utils/format.utils";

export const PurchaseCancelPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [remainingTime, setRemainingTime] = useState(10);
    const { verifySuccessToken } = useAppStore()
    const token = searchParams.get("error");

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }

        const run = async () => {
            try {
                await verifySuccessToken(token);
            } catch {
                navigate("/", { replace: true });
            }
        };

        run();
    }, [])

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            navigate('/')
        }
    }, [remainingTime]);

    if (!token) return <Spinner />

    return (
        <motion.div {...slideInBottom} className="purchase-success-container flex flex-col items-center justify-center max-w-2xl px-4 mx-auto pb-15 min-h-[50vh] gap-10">

            <h2 className='flex items-center gap-4 font-semibold text-[#001F3F] text-3xl lg:text-4xl'>
                <XCircle className=" w-4 h-4 xl:w-14 xl:h-14 text-red-500" />
                ¡Compra Cancelada!
            </h2>

            <p className="text-[#001F3F] text-base lg:text-lg text-center">
                Su compra fue cancelada o fallo. No se le realizó ningún cobro a su tarjeta bancaria.
            </p>


            <p className='flex items-center gap-4 opacity-65 text-base lg:text-lg'>
                Seras redirigido a la página principal en:  <span className="font-medium">{timeFormat(remainingTime)}</span>
            </p>

        </motion.div>
    )
}
