import { useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { ProfileAddressEditForm } from "../profile/profile-address/ProfileAddressEditForm";
import { ProfileAddress } from "../profile/profile-address/ProfileAddress";
import { MapPin } from "lucide-react";


export const PurchaseAddress = () => {
    const [showEditAddressForm, setShowEditAddressForm] = useState(false)
    const { user } = useAppStore()

    const existAddress = Boolean(
        user?.address &&
        Object.values(user.address).some(v => v.trim() !== "")
    );

    return (
        <div className="pb-5 space-y-5">
            <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F]">
                1. Dirección de entrega
            </h3>
            <div className="flex flex-col h-full p-6 rounded-xl shadow-sm">
                {existAddress ? (
                    <>
                        {showEditAddressForm ? (
                            <ProfileAddressEditForm
                                setShowEditAddressForm={setShowEditAddressForm}
                            />
                        ) : (
                            <ProfileAddress
                                setShowEditAddressForm={setShowEditAddressForm}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {showEditAddressForm ? (
                            <ProfileAddressEditForm
                                setShowEditAddressForm={setShowEditAddressForm}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center x px-4 text-center">
                                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                                    <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-[#0855ae]" />
                                </div>
                                <h3 className="font-semibold text-lg lg:text-xl text-[#001F3F] mb-2">
                                    Dirección no configurada
                                </h3>
                                <p className="opacity-65 text-sm lg:text-base mb-6 max-w-md">
                                    Completa tu información de envío para una experiencia de compra más rápida y personalizada.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowEditAddressForm(true)}
                                    className="bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors"
                                >
                                    Agregar Dirección
                                </button>

                            </div>
                        )}
                    </>
                )}
            </div>

        </div>


    )
}
