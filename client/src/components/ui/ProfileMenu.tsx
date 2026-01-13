import { NavLink } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../data";
import { LogOut, X } from "lucide-react";

import { toast } from "react-toastify";

type ProfileMenuProps = {
    onClose?: () => void
}

export const ProfileMenu = ({ onClose }: ProfileMenuProps) => {
    const navigate = useNavigate();
    const { user, logout } = useAppStore();

    const handleLogout = async () => {
        try {
            await logout();

            navigate("/");
            toast.success('Sesión cerrada correctamente', {
                className: 'toast-success',
                toastId: 'logout',
            });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        }
    }

    if (!user) return null;

    return (
        <div className="py-6 md:py-2 space-y-3 md:space-y-5">

            <div className="border-b border-[#001F3F]/25 pb-4 md:pb-6">

                <div className="flex justify-between items-center mb-2 mr-1">
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#001F3F] ">
                        Hola, {user.name}
                    </h3>

                    <X className="w-5 h-5 md:hidden text-[#001F3F] hover:text-[#0C71E4] " onClick={onClose} />
                </div>


                <p className="leading-tight font-medium text-xs lg:text-sm opacity-65 ">
                    Gracias por comprar en BlueWave
                </p>
            </div>

            <div className="space-y-2 ">
                <h3 className="font-semibold text-[#001F3F] text-base lg:text-lg">
                    Administrar cuenta
                </h3>
                <div className="space-y-2 px-1">
                    {menuItems.slice(0, 2).map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            end={item.to === "/perfil"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${isActive
                                    ? "bg-[#0C71E4]/10 text-[#0C71E4] font-semibold "
                                    : "text-[#001F3F] hover:bg-[#001F3F]/5 hover:text-[#0C71E4] hover:font-medium"
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Tus productos */}
            <div className="space-y-2">
                <h3 className="font-semibold text-[#001F3F] text-base lg:text-lg">
                    Tus productos
                </h3>
                <div className="space-y-2 px-1">
                    {menuItems.slice(2, 4).map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            end={item.to === "/perfil"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${isActive
                                    ? "bg-[#0C71E4]/10 text-[#0C71E4] font-semibold "
                                    : "text-[#001F3F] hover:bg-[#001F3F]/5 hover:text-[#0C71E4] hover:font-medium"
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Privacidad */}
            <div className="space-y-2 px-1">
                <h3 className="font-semibold text-[#001F3F] text-base lg:text-lg">
                    Privacidad
                </h3>
                <div className="space-y-2">
                    {menuItems.slice(4, 6).map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            end={item.to === "/perfil"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${isActive
                                    ? "bg-[#0C71E4]/10 text-[#0C71E4] font-semibold "
                                    : "text-[#001F3F] hover:bg-[#001F3F]/5 hover:text-[#0C71E4] hover:font-medium"
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Cerrar sesión */}
            <div className=" border-t border-[#001F3F]/10 pt-4 px-1">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full text-red-500 hover:bg-red-50 hover:font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar sesión</span>
                </button>
            </div>


        </div>
    );
};