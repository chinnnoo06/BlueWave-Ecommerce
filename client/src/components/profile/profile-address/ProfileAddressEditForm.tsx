import { ArrowLeft } from "lucide-react"
import type { TProfileAddressProps } from "./types"
import { useFormStatus } from "../../../hooks/useFormStatus";
import { useAppStore } from "../../../stores/useAppStore";
import type { TProfileAddressEditForm } from "../../../types/profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ProfileAddressEditFormSchema } from "../../../schemas/profile.schema";
import { useEffect } from "react";
import { inputProfileBase } from "../../../helpers/styleClasses/inputs";

export const ProfileAddressEditForm = ({ setShowEditAddressForm }: TProfileAddressProps) => {
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { user, getStates, states, editAddress } = useAppStore()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TProfileAddressEditForm>({
        resolver: zodResolver(ProfileAddressEditFormSchema),
        defaultValues: {
            street: user?.address?.street || "",
            number: user?.address?.number || "",
            state: user?.address?.state || "",
            city: user?.address?.city || "",
            postalCode: user?.address?.postalCode || "",
        }
    })
    const selectedState = watch("state");
    const stateData = states.find(state => state.name === selectedState);

    useEffect(() => {
        getStates()
    }, [])

    const onSubmit = async (data: TProfileAddressEditForm) => {
        startLoading()

        try {
            await editAddress(data)

            setShowEditAddressForm(false)

            toast.success('Dirección actualizada correctamente', {
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
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base lg:text-lg text-[#001F3F]">Editar Dirección</h3>
                <button
                    onClick={() => setShowEditAddressForm(false)}
                    className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                >
                    <ArrowLeft size={16} />
                    Regresar
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-0">

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Calle
                        </label>
                        <input
                            {...register("street")}
                            placeholder="Escribe el nombre de la calle"
                            className={inputProfileBase}
                        />
                        {errors.street && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.street?.message}
                            </p>
                        )}
                    </div>
                    <div className="border-t border-[#001F3F]/25" />

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Número
                        </label>
                        <input
                            type="number"
                            {...register("number")}
                            placeholder="Escribe el número de residencia"
                            className={inputProfileBase}
                        />
                        {errors.number && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.number?.message}
                            </p>
                        )}
                    </div>
                    <div className="border-t border-[#001F3F]/25" />

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Estado
                        </label>
                        <select {...register("state")} className={inputProfileBase}>
                            <option value="">-- Seleccione un Estado --</option>
                            {states.map(state => (
                                <option key={state.code} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.state?.message}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-[#001F3F]/25" />

                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Ciudad
                        </label>
                        <select {...register("city")} className={inputProfileBase}>
                            <option value="">-- Seleccione una Ciudad --</option>
                            {stateData?.municipalities.map(municipality => (
                                <option key={municipality.name} value={municipality.name}>
                                    {municipality.name}
                                </option>
                            ))}
                        </select>
                        {errors.city && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.city?.message}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-[#001F3F]/25" />


                    <div className="py-4">
                        <label className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">
                            Código Postal
                        </label>
                        <input
                            type="number"
                            {...register("postalCode")}
                            placeholder="Escribe el número postal"
                            className={inputProfileBase}
                        />
                        {errors.postalCode && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.postalCode?.message}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-[#001F3F]/25" />

                    <div className="pt-4 flex justify-center">
                        <button
                            disabled={loading}
                            type="submit"
                            className="py-1.5 px-6 text-sm rounded-lg font-medium
                       text-[#EEEEEF] bg-[#001F3F]
                       hover:bg-[#0C71E4] transition shadow-md"
                        >
                            {loading ? 'Cargando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
