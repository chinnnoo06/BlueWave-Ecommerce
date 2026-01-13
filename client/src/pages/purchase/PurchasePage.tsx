import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PurchaseAddress } from "../../components/purchase/PurchaseAddress";
import { PurchaseOrder } from "../../components/purchase/PurchaseOrder";
import { PurchaseSummary } from "../../components/purchase/PurchaseSummary";
import { slideInBottom, slideInLeft } from "../../helpers/animations/motion";

export const PurchasePage = () => {
    const location = useLocation() as { state?: { isValid?: boolean } };
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.isValid) {
            navigate("/", { replace: true });
        }
    }, [location, navigate])

    return (
        <div id="purchase" className="purchase-container flex flex-col max-w-[1300px] px-4 mx-auto pb-15">

            <motion.nav {...slideInBottom} className="mb-6">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">
                    Confirma tu compra
                </h2>
            </motion.nav>

            <div className='flex flex-col lg:flex-row gap-4 justify-center items-start'>

                <motion.div {...slideInLeft()} className="flex flex-col gap-5 divide-y divide-[#001F3F]/25 w-full lg:w-[70%]">
                    <PurchaseAddress />
                    <PurchaseOrder />
                </motion.div>

                <PurchaseSummary />
            </div>

        </div>
    )
}
