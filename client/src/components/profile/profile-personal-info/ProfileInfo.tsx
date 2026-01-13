import { useAppStore } from '../../../stores/useAppStore';
import { Edit2, Shield } from 'lucide-react';
import type { TProfileInfoProps } from './types';

export const ProfileInfo = ({ setShowEditInfoForm }: TProfileInfoProps) => {
    const { user } = useAppStore()

    if (!user) return null;

    const formatPhone = (phone: string) => {
        if (!phone || phone.length !== 10) return '';
        const last4 = phone.slice(-4);
        return `52 (xxx) xxx-${last4}`;
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base lg:text-lg text-[#001F3F]">Datos Personales</h3>
                <button
                    onClick={() => setShowEditInfoForm(true)}
                    className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                >
                    <Edit2 size={16} />
                    Editar
                </button>
            </div>

            <div className="divide-y divide-[#001F3F]/25">
                <div className="py-4 flex flex-col">
                    <span className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">Nombre</span>
                    <p className="block text-[#001F3F] font-normal text-sm lg:text-base">
                        {user.name}
                    </p>
                </div>

                <div className="py-4 flex flex-col">
                    <span className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">Apellidos</span>
                    <p className="block text-[#001F3F] font-normal text-sm lg:text-base">
                        {user.surname}
                    </p>
                </div>

                <div className="py-4 flex flex-col">
                    <span className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">Correo Electrónico</span>
                    <p className="block text-[#001F3F] font-normal text-sm lg:text-base">
                        {user.email}
                    </p>
                </div>

                <div className="py-4 flex flex-col">
                    <span className="block text-xs lg:text-sm font-medium text-[#001F3F]/60 tracking-wider mb-1">Número Telefónico</span>
                    <p className="block text-[#001F3F] font-normal text-sm lg:text-base">
                        {formatPhone(user.phone)}
                    </p>
                </div>
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