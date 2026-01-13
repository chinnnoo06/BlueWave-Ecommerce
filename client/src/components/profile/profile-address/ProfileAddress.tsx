import { Edit2, Shield, Trash2 } from "lucide-react"
import type { TProfileAddressProps } from "./types"
import { useAppStore } from "../../../stores/useAppStore";
import { toast } from "react-toastify";
import { useFormStatus } from "../../../hooks/useFormStatus";

export const ProfileAddress = ({ setShowEditAddressForm }: TProfileAddressProps) => {
    const { user, removeAddress } = useAppStore()
    const { loading, startLoading, stopLoading } = useFormStatus();
    if (!user) return null;

    const handleRemoveAddress = async () => {
        startLoading()
        try {
            await removeAddress()

            toast.success('Dirección eliminada correctamente', {
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
        <>
            <div className="flex justify-between">
                <h3 className="font-semibold text-base lg:text-lg text-[#001F3F]">Datos de Dirección</h3>
                <div className="hidden gap-5 s:flex">
                    <button
                        onClick={() => setShowEditAddressForm(true)}
                        className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                    >
                        <Edit2 size={16} />
                        Editar
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handleRemoveAddress()}
                        className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm lg:text-base transition-colors"
                    >
                        <Trash2 size={16} />
                        Eliminar
                    </button>
                </div>
            </div>

            <p className="block text-[#001F3F] font-normal text-sm lg:text-base pt-4 lg:py-4 leading-relaxed">
                {user.address?.street} {user.address?.number}
                <br />
                {user.address?.city}, {user.address?.state}
                <br />
                CP {user.address?.postalCode}
            </p>

            <div className="flex gap-5 s:hidden py-4">
                <button
                    onClick={() => setShowEditAddressForm(true)}
                    className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                >
                    <Edit2 size={16} />
                    Editar
                </button>
                <button
                    disabled={loading}
                    onClick={() => handleRemoveAddress()}
                    className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm lg:text-base transition-colors"
                >
                    <Trash2 size={16} />
                    Eliminar
                </button>
            </div>


            <div className="border-t border-[#001F3F]/25 pt-4">
                <div className="flex items-center gap-2 text-xs lg:text-sm ">
                    <Shield className="text-[#001F3F]/65" />
                    <p className="text-[#001F3F]/65">
                        Información protegida
                    </p>
                </div>
            </div>
        </>
    )
}
