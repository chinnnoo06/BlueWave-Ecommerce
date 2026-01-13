import { useEffect, useState } from "react";

type TUseResendTimerProps = {
    seconds: number,
    onResend: () => Promise<void>
}

export const useResendTimer = ({seconds, onResend} : TUseResendTimerProps) => {
    const [remainingTime, setRemainingTime] = useState(seconds);
    const [canForward, setCanForward] = useState(false);
    const [inProcess, setInProcess] = useState(false);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setCanForward(true);
        }
    }, [remainingTime]);

    const manejarReenvio = async () => {
        setInProcess(true);

        try {
            await onResend(); // Llama a la función de reenvío
            setRemainingTime(30);
            setCanForward(false);
        } catch (error) {
            console.error(error);
        } finally {
            setInProcess(false);
        }
    };

    return { 
        remainingTime,
        canForward,
        inProcess,
        manejarReenvio
    }


}
