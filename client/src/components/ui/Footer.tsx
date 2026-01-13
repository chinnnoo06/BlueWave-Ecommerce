import { Link, NavLink } from "react-router-dom"
import Logo from '../../assets/logo BLUEWAVE-2.png';
import { FooterFormSubscriber } from "./FooterFormSubscriber";

export const Footer = () => {
  return (
    <div className="footer-container bg-[#2F3340] font-poppins">
      <footer className="max-w-[1300px] mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          <div className="flex flex-col items-center md:items-start gap-4" translate="no">
            <Link to="/" className='no-underline hover:scale-105 transition-transform duration-300'>
              <img
                src={Logo}
                alt="Logo"
                className="h-12 object-contain"
              />
            </Link>
            <div className="text-center md:text-left">
              <p className="text-[#EBECF2] text-sm leading-relaxed">
                Experimenta el sonido en su forma más pura, diseñado para envolverte y elevar cada momento.
              </p>
            </div>

            <FooterFormSubscriber />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            {/* Menú de navegación (igual al header) */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <h3 className="text-[#EBECF2] font-bold uppercase text-lg border-b-2 border-[#EBECF2] pb-2">
                Navegación
              </h3>
              <nav className="flex flex-col gap-2 items-center md:items-end text-center md:text-left">
                {[
                  { to: "/inicio", text: "Inicio" },
                  { to: "/catalago/todos/1", text: "Productos" },
                  { to: "/sobre-nosotros", text: "Nosotros" },
                  { to: "/contacto", text: "Contacto" },
                ].map((page, index) => (
                  <NavLink
                    key={index}
                    to={page.to}
                    className='font-semibold text-sm text-[#EBECF2] hover:text-[#0C71E4]'
                  >
                    {page.text}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Contacto y redes sociales */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <h3 className="text-[#EBECF2] font-bold uppercase text-lg border-b-2 border-[#EBECF2] pb-2">
                Conocenos
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: "fab fa-facebook", url: "https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr", name: "Facebook" },
                  { icon: "fab fa-instagram", url: "https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5", name: "Instagram" },
                  { icon: "fab fa-whatsapp", url: "https://wa.me/523315876207", name: "WhatsApp" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-[#EBECF2] hover:text-[#0855ae] transition-all duration-300 hover:scale-110 hover:rotate-3"
                    title={social.name}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-sm text-[#EBECF2] items-center md:items-end">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <i className="fa-solid fa-phone text-[#0855ae]"></i>
                  <span>+52 33 1587 6207</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <i className="fa-solid fa-envelope text-[#0855ae]"></i>
                  <span>bluewave@gmail.com</span>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Sección inferior */}
        <div className="border-t border-[#EBECF2]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Derechos de autor */}
            <div className="text-center md:text-left">
              <p className="text-[#EBECF2] text-sm">
                &copy; {new Date().getFullYear()} BlueWave. Todos los derechos reservados.
              </p>
            </div>

            {/* Enlaces legales */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/terminos" className="text-[#EBECF2] hover:text-[#0855ae] transition-colors duration-300">
                Términos y Condiciones
              </Link>
              <Link to="/privacidad" className="text-[#EBECF2] hover:text-[#0855ae] transition-colors duration-300">
                Política de Privacidad
              </Link>
            </div>

            {/* Información adicional */}
            <div className="text-center md:text-right">
              <p className="text-[#EBECF2] text-sm">
                <i className="fa-solid fa-shield-halved text-[#0855ae] mr-1"></i>
                Sitio web seguro
              </p>
            </div>
          </div>
        </div>

      </footer >
    </div >
  )
}
