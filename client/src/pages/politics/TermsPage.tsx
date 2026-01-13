import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion"

export const TermsPage = () => {
    return (
        <div id="privacy" className="privacy-container flex flex-col max-w-[1300px] px-4 mx-auto">

            <motion.div {...slideInBottom} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">
                    Términos y Condiciones
                </h2>
            </motion.div>

            <motion.div {...slideInBottom} className="p-6 rounded-xl shadow-sm space-y-6">

                {/* Aceptación */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">1. Aceptación de los Términos</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Al acceder y utilizar el sitio web de <span className='font-semibold text-[#0855ae]'>BlueWave</span>, aceptas estos Términos y Condiciones. Si no estás de acuerdo con ellos, no debes utilizar la plataforma.
                    </p>
                </section>

                {/* Uso */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">2. Uso del Sitio Web</h3>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li>Este sitio es propiedad de <span className='font-semibold text-[#0855ae]'>BlueWave</span></li>
                        <li>Está destinado a la compra de productos y gestión de cuentas de usuario</li>
                        <li>Queda prohibido el uso fraudulento o no autorizado</li>
                        <li>Nos reservamos el derecho de modificar o suspender el servicio</li>
                    </ul>
                </section>

                {/* Cuenta */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">3. Cuenta de Usuario</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Para realizar compras debes crear una cuenta proporcionando información verdadera y actualizada. Eres responsable de mantener la confidencialidad de tu contraseña.
                    </p>
                </section>

                {/* Compras */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">4. Compras y Pagos</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Todas las compras se procesan de forma segura mediante <span className='font-semibold text-[#0855ae]'>Stripe</span>.  
                        BlueWave no almacena datos bancarios ni de tarjetas de crédito.
                    </p>
                </section>

                {/* Precios */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">5. Precios y Disponibilidad</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Los precios y la disponibilidad de los productos pueden cambiar sin previo aviso. Nos reservamos el derecho de corregir errores de precios o descripciones.
                    </p>
                </section>

                {/* Propiedad intelectual */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">6. Propiedad Intelectual</h3>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li>Todo el contenido pertenece a <span className='font-semibold text-[#0855ae]'>BlueWave</span></li>
                        <li>El logotipo, diseño y textos están protegidos por derechos de autor</li>
                        <li>Las imágenes de productos pertenecen a sus respectivos fabricantes</li>
                    </ul>
                </section>

                {/* Responsabilidad */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">7. Limitación de Responsabilidad</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        BlueWave no será responsable por daños indirectos derivados del uso de la plataforma. La responsabilidad máxima se limita al monto de la compra realizada.
                    </p>
                </section>

                {/* Enlaces */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">8. Enlaces a Terceros</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Nuestro sitio puede contener enlaces a servicios externos como Stripe. No somos responsables por sus políticas o funcionamiento.
                    </p>
                </section>

                {/* Cambios */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">9. Modificaciones</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        BlueWave puede modificar estos términos en cualquier momento. El uso continuo del sitio implica la aceptación de los cambios.
                    </p>
                </section>

                {/* Ley */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">10. Ley Aplicable</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta ante los tribunales mexicanos.
                    </p>
                </section>

                {/* Contacto */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">11. Contacto</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Para cualquier duda sobre estos términos:<br /><br />
                        <span className='font-semibold text-[#0855ae]'>Email:</span> bluewave@gmail.com<br />
                        <span className='font-semibold text-[#0855ae]'>Teléfono:</span> +52 3318237277
                    </p>
                </section>

                {/* Fecha */}
                <section className="border-t border-gray-200 pt-6">
                    <p className="text-[#001F3F] text-base lg:text-lg">
                        <span className='font-semibold text-[#0855ae]'>Última actualización:</span> Enero 2026
                    </p>
                </section>

            </motion.div>

        </div>
    )
}
