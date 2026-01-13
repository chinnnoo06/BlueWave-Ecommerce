import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Link } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { slideInBottom } from "../../helpers/animations/motion";

export const RemoveSubscriberPage = () => {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const { removeSubscriber } = useAppStore()

    useEffect(() => {
        // Obtener email desde query params
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");

        if (!email) {
            setStatus("error");
            return;
        }

        const unsubscribe = async () => {
            try {
                await removeSubscriber(email);
                setStatus("success");
            } catch (error) {
                setStatus("error");
            }
        };

        unsubscribe();
    }, []);

    return (
        <motion.div {...slideInBottom} className="min-h-screen flex flex-col items-center justify-center text-[#001F3F] font-semibold text-5xl">
            {status === "loading" && <p>Eliminando tu suscripción...</p>}
            {status === "success" && (
                <div className="flex gap-5 items-center">
                    <p>Te has dado de desubscrito correctamente</p>
                    <Check className=" w-14 h-14  xl:w-16 xl:h-16 text-[#001F3F]" />
                </div>
            )}

            {status === "error" && (
                <div className="flex gap-5 items-center">
                    <p>No se pudo eliminar tu suscripción</p>
                    <X className=" w-14 h-14  xl:w-16 xl:h-16 text-[#001F3F]" />
                </div>
            )}

            <Link to='/'>
                <button className="mt-10 bg-[#0C71E4] text-white px-3 py-1.5 lg:py-2 rounded-lg font-medium text-base lg:text-lg hover:bg-[#0855ae] transition cursor-pointer">
                    Ir a inicio
                </button>
            </Link>

        </motion.div>
    );
};
