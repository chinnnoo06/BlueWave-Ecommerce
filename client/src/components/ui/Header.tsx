import { ShoppingCart, Heart, User2, UserCircle, ChevronDown, Search } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import Logo from '../../assets/logo BLUEWAVE.png'
import LogoMobile from '../../assets/logo-BLUEWAVE-mobile.png'
import { DropDownCategories } from "./DropDownCategories"
import { HamburgerButton } from "./HamburguerButton"
import { useHeader } from "../../hooks/useHeader"
import { MobileNav } from "./MobileNav"
import { SearchModal } from "./SearchModal"

export const Header = () => {
  const { user, isProducts, menuVisible, showDesktopProducts, showMobileProducts, searchOpen, numFavoritesProducts, numCartProducts, refs, actions } = useHeader()

  return (
    <>
      <header className="relative z-50 font-poppins">
        <div className="max-w-[1300px] px-4 mx-auto h-20 header-limit:h-25 flex justify-between header-limit:grid grid-cols-[1fr_auto_1fr] items-center py-4">

          <div className="flex items-center justify-start">
            <div className="logo transition-transform duration-300 hover:scale-105 hidden xs:flex">
              <Link to="/" className="no-underline">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-10 sm:h-11 xl:h-12 header-limit:h-11 object-contain"
                />
              </Link>
            </div>

            <div className="logo transition-transform duration-300 hover:scale-105 flex xs:hidden">
              <Link to="/" className="no-underline">
                <img
                  src={LogoMobile}
                  alt="Logo"
                  className="h-11 object-contain"
                />
              </Link>
            </div>
          </div>

          <nav className="hidden header-limit:flex gap-6 items-center justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold text-lg xl:text-xl ${isActive ? 'text-[#0C71E4]' : 'text-[#001F3F] hover:text-[#0C71E4] transition'}`
              }
            >
              Inicio
            </NavLink>

            <div className="relative" ref={refs.modalRef}>
              <button
                onClick={() => actions.setShowDesktopProducts(prev => !prev)}
                className={`font-semibold text-lg xl:text-xl ${isProducts ? 'text-[#0C71E4]' : 'text-[#001F3F] hover:text-[#0C71E4] transition'} flex items-center gap-2`}
              >
                Productos
                <ChevronDown
                  className={`mt-1 h-6 w-6 transition-transform duration-300 ${showDesktopProducts ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`
                  absolute top-full left-0 mt-2 w-[350px] p-5 bg-white rounded-2xl shadow-xl border border-gray-200
                  transform transition-all duration-300 origin-top
                  ${showDesktopProducts ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
                `}
              >
                <DropDownCategories onClose={() => actions.setShowDesktopProducts(false)} />
              </div>
            </div>

            <NavLink
              to="/sobre-nosotros"
              className={({ isActive }) =>
                `font-semibold text-lg xl:text-xl ${isActive ? 'text-[#0C71E4]' : 'text-[#001F3F] hover:text-[#0C71E4] transition'}`
              }
            >
              Nosotros
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `font-semibold text-lg xl:text-xl ${isActive ? 'text-[#0C71E4]' : 'text-[#001F3F] hover:text-[#0C71E4] transition'}`
              }
            >
              Contacto
            </NavLink>
          </nav>

          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center lg:gap-4">
              <button onClick={() => actions.setSearchOpen(true)}>
                <Search className="w-6 h-6 xl:w-7 xl:h-7 text-[#001F3F] hover:text-[#0C71E4] transition hidden header-limit:block" />
              </button>
              <div className="flex items-center gap-4 pl-4 header-limit:border-l border-[#001F3F]/25">
                <div className="relative group flex items-center">
                  <Link to="/pedido">
                    <ShoppingCart className=" w-6 h-6 xl:w-7 xl:h-7 text-[#001F3F] hover:text-[#0C71E4] transition cursor-pointer" />

                    {numCartProducts > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#0C71E4] text-white text-[0.7rem] w-4 h-4 flex items-center justify-center rounded-full font-semibold shadow-sm">
                        {numCartProducts}
                      </span>
                    )}
                  </Link>
                </div>

                {user && (
                  <div className="relative group flex items-center">
                    <Link to="/perfil/favoritos">
                      <Heart className=" w-6 h-6 xl:w-7 xl:h-7 text-[#001F3F] hover:text-[#0C71E4] transition cursor-pointer" />
                      {numFavoritesProducts > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#0C71E4] text-white text-[0.7rem] w-4 h-4 flex items-center justify-center rounded-full font-semibold shadow-sm">
                          {numFavoritesProducts}
                        </span>
                      )}
                    </Link>


                  </div>
                )}

                <div className="hidden header-limit:flex">
                  <Link to={user ? "/perfil" : "/iniciar-sesion"}>
                    {user ? (
                      <UserCircle className="w-6 h-6 xl:w-7 xl:h-7 text-[#001F3F] hover:text-[#0C71E4] transition cursor-pointer" />
                    ) : (
                      <User2 className="w-6 h-6 xl:w-7 xl:h-7 text-[#001F3F] hover:text-[#0C71E4] transition cursor-pointer" />
                    )}
                  </Link>
                </div>
              </div>

            </div>

            <HamburgerButton ref={refs.hamburgerRef} open={menuVisible} onClick={actions.toggleMenu} />
          </div>

        </div>

        <MobileNav
          user={user}
          isProducts={isProducts}
          menuVisible={menuVisible}
          showMobileProducts={showMobileProducts}
          refs={refs}
          actions={actions}
          onOpenSearch={() => actions.setSearchOpen(true)}
        />
      </header>

      <SearchModal
        open={searchOpen}
        onClose={() => actions.setSearchOpen(false)}
      />
    </>
  )
}
