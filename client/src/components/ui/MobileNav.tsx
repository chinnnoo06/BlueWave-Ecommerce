import { NavLink, Link } from "react-router-dom"
import { DropDownCategories } from "./DropDownCategories"
import type { TUser } from "../../types/user.types"
import { ChevronDown, Search, User, UserCircle } from "lucide-react"

type TMobileProps = {
  onOpenSearch: () => void
  user: TUser | null
  isProducts: boolean
  menuVisible: boolean
  showMobileProducts: boolean
  refs: {
    modalResponsiveRef: React.RefObject<HTMLDivElement | null>
  }
  actions: {
    setShowMobileProducts: React.Dispatch<React.SetStateAction<boolean>>
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export const MobileNav = ({
  onOpenSearch,
  user,
  isProducts,
  menuVisible,
  showMobileProducts,
  refs,
  actions
}: TMobileProps) => {
  return (
    <div
      ref={refs.modalResponsiveRef}
      className={`absolute left-0 right-0 top-full header-limit:hidden
        bg-[#EBECF2] shadow-2xl origin-top transition-all duration-300
        ${menuVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
    >
      <div className="max-w-[1300px] mx-auto px-4 pb-6 space-y-4">

        <div
          onClick={() => {
            actions.setMenuVisible(false)
            onOpenSearch()
          }}
          className="flex items-center gap-4 bg-white rounded-lg p-2 shadow-sm text-[#001F3F] hover:text-[#0C71E4]
            hover:shadow-md transition"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50">
            <Search className="w-6 h-6" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold">
              Buscar productos
            </span>
            <span className="text-xs text-gray-500">
              SkullKandy Dime, JBL Flip 7 ...
            </span>
          </div>
        </div>


        {/* USER / PROFILE */}
        <Link
          to={user ? "/perfil" : "/iniciar-sesion"}
          onClick={() => actions.setMenuVisible(false)}
          className="flex items-center gap-4 bg-white rounded-lg p-2 shadow-sm text-[#001F3F] hover:text-[#0C71E4]
            hover:shadow-md transition"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 ">
            {user ? (
              <UserCircle className="w-6 h-6 text-[#001F3F] cursor-pointer" />
            ) : (
              <User className="w-6 h-6 text-[#001F3F] cursor-pointer" />
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold ">
              {user ? "Mi cuenta" : "Bienvenido"}
            </span>
            <span className="text-xs text-gray-500">
              {user ? "Ver perfil y pedidos" : "Inicia sesión o regístrate"}
            </span>
          </div>
        </Link>


        <nav className="flex flex-col gap-1 border-t border-[#001F3F]/20 pt-2 ">

          <NavLink
            to="/"
            onClick={() => actions.setMenuVisible(false)}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg font-semibold transition
              ${isActive
                ? "bg-blue-50 text-[#0C71E4]"
                : "text-[#001F3F] hover:bg-white hover:text-[#0C71E4]"}`
            }
          >
            Home
          </NavLink>

          <button
            onClick={() => actions.setShowMobileProducts(prev => !prev)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition
              ${isProducts
                ? "bg-blue-50 text-[#0C71E4]"
                : "text-[#001F3F] hover:bg-white hover:text-[#0C71E4]"}`}
          >
            Productos

            <ChevronDown
              className={`mt-1 h-5 w-5 transition-transform duration-300 ${showMobileProducts ? "rotate-180" : ""
                }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300
              ${showMobileProducts ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 py-2">
              <DropDownCategories onClose={() => actions.setShowMobileProducts} mobile />
            </div>
          </div>

          <NavLink
            to="/sobre-nosotros"
            onClick={() => actions.setMenuVisible(false)}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg font-semibold transition
              ${isActive
                ? "bg-blue-50 text-[#0C71E4]"
                : "text-[#001F3F] hover:bg-white hover:text-[#0C71E4]"}`
            }
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/contacto"
            onClick={() => actions.setMenuVisible(false)}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg font-semibold transition
              ${isActive
                ? "bg-blue-50 text-[#0C71E4]"
                : "text-[#001F3F] hover:bg-white hover:text-[#0C71E4]"}`
            }
          >
            Contacto
          </NavLink>

        </nav>
      </div>
    </div>
  )
}
