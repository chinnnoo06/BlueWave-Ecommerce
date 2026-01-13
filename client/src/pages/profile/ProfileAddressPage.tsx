import { useState } from "react"
import { ProfileAddress } from "../../components/profile/profile-address/ProfileAddress"
import { useAppStore } from "../../stores/useAppStore"
import { ProfileAddressEditForm } from "../../components/profile/profile-address/ProfileAddressEditForm"
import { MapPin } from "lucide-react"

export const ProfileAddressPage = () => {
    const [showEditAddressForm, setShowEditAddressForm] = useState(false)
    const { user } = useAppStore()

    const existAddress = Boolean(
        user?.address &&
        Object.values(user.address).some(v => v.trim() !== "")
    );

    return (
        <div className="flex flex-col min-h-screen">

            <h2 className="text-[#001F3F] font-bold leading-tight text-[1.5rem] lg:text-[2rem] mb-6 relative inline-block">
                Dirección
            </h2>

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
                            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
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
