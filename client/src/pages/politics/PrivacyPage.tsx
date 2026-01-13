import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion";

export const PrivacyPage = () => {

    return (
        <div id="privacy" className="privacy-container flex flex-col max-w-[1300px] px-4 mx-auto">

            <motion.div {...slideInBottom} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">
                    Políticas de Privacidad
                </h2>
            </motion.div>

            <motion.div {...slideInBottom} className="p-6 rounded-xl shadow-sm space-y-6">

                {/* Responsable */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">1. Responsable del Tratamiento</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        <span className='font-semibold text-[#0855ae]'>BlueWave</span><br />
                        Empresa dedicada al comercio electrónico y venta de productos en línea.<br />
                        <span className='font-semibold text-[#0855ae]'>Email:</span> bluewave@gmail.com<br />
                        <span className='font-semibold text-[#0855ae]'>Teléfono:</span> +52 3318237277
                    </p>
                </section>

                {/* Datos */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">2. Datos que Recopilamos</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        En BlueWave recopilamos la información que proporcionas al crear una cuenta, realizar compras o interactuar con nuestra plataforma:
                    </p>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li><span className='font-semibold text-[#0855ae]'>Nombre y Apellidos</span></li>
                        <li><span className='font-semibold text-[#0855ae]'>Correo electrónico</span></li>
                        <li><span className='font-semibold text-[#0855ae]'>Teléfono</span></li>
                        <li><span className='font-semibold text-[#0855ae]'>Contraseña (encriptada)</span></li>
                        <li><span className='font-semibold text-[#0855ae]'>Dirección de envío</span></li>
                    </ul>
                </section>

                {/* Propósito */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">3. Finalidad del Tratamiento</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Utilizamos tus datos personales para:
                    </p>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li>Crear y administrar tu cuenta de usuario</li>
                        <li>Procesar y enviar tus pedidos</li>
                        <li>Gestionar pagos y facturación</li>
                        <li>Proporcionarte atención al cliente</li>
                        <li>Notificarte sobre el estado de tus compras</li>
                    </ul>
                </section>

                {/* Pagos */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">4. Pagos Seguros con Stripe</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Los pagos realizados en BlueWave se procesan a través de <span className='font-semibold text-[#0855ae]'>Stripe</span>, una plataforma de pagos certificada y segura.  
                        BlueWave <span className='font-semibold text-[#0855ae]'>no almacena ni procesa directamente</span> los datos de tu tarjeta bancaria.
                    </p>
                </section>

                {/* Base legal */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">5. Base Legal</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        El tratamiento de tus datos se basa en:
                    </p>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li><span className='font-semibold text-[#0855ae]'>Tu consentimiento</span> al registrarte y usar nuestra plataforma</li>
                        <li><span className='font-semibold text-[#0855ae]'>La ejecución de un contrato</span> al realizar una compra</li>
                    </ul>
                </section>

                {/* Seguridad */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">6. Almacenamiento y Seguridad</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Tus datos se almacenan en servidores seguros y protegidos mediante protocolos de seguridad.  
                        Implementamos medidas técnicas y organizativas para evitar accesos no autorizados, pérdida o uso indebido de la información.
                    </p>
                </section>

                {/* Compartición */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">7. Compartición de Datos</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        BlueWave no vende ni renta tus datos personales.  
                        Únicamente se comparten con:
                    </p>
                    <ul className="list-disc list-inside text-[#001F3F] text-base lg:text-lg ml-4 space-y-2">
                        <li>Stripe para el procesamiento de pagos</li>
                        <li>Proveedores de logística para la entrega de pedidos</li>
                        <li>Autoridades cuando sea requerido por ley</li>
                    </ul>
                </section>

                {/* Derechos */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">8. Derechos del Usuario</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Tienes derecho a acceder, rectificar, cancelar u oponerte al uso de tus datos personales, así como solicitar su portabilidad.
                    </p>
                </section>

                {/* Contacto */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">9. Contacto</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        Para cualquier duda o solicitud relacionada con tus datos personales:<br /><br />
                        <span className='font-semibold text-[#0855ae]'>Email:</span> bluewave@gmail.com<br />
                        <span className='font-semibold text-[#0855ae]'>Teléfono:</span> +52 3318237277
                    </p>
                </section>

                {/* Cambios */}
                <section>
                    <h3 className="leading-tight line-clamp-1 text-xl lg:text-2xl font-semibold text-[#001F3F] mb-4">10. Cambios en esta Política</h3>
                    <p className="text-[#001F3F] text-base lg:text-lg leading-relaxed">
                        BlueWave se reserva el derecho de modificar estas políticas en cualquier momento.  
                        Los cambios se publicarán en esta misma página.
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
    );
};
