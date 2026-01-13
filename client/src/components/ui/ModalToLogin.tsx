import ReactDOM from 'react-dom';
import type { TModal } from '../../types/common.types';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeOverlay, slideInBottom } from '../../helpers/animations/motion';

export const ModalToLogin = ({ showModal, onClose }: TModal) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {showModal && (
                <motion.div
                    {...fadeOverlay}
                    className="font-poppins fixed inset-0 z-50 flex items-center justify-center
                           bg-black/50 backdrop-blur-sm px-4"
                    onClick={onClose}
                >
                    <motion.div
                        {...slideInBottom}
                        className="relative max-w-lg w-full bg-white p-8 rounded-3xl
                               shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#001F3F]/60
                                   hover:text-[#001F3F] transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            <h3 className="text-[#001F3F] font-semibold text-xl lg:text-2xl mb-2">
                                Inicia sesión para continuar
                            </h3>

                            <p className="opacity-65 text-sm lg:text-base mb-6">
                                Guarda tus favoritos, tu pedido y accede a una mejor experiencia
                            </p>

                            <div className="h-px w-full bg-[#001F3F]/10 mb-6" />

                            <div className="flex flex-col sm:flex-row gap-4 text-sm lg:text-base">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 rounded-lg font-medium 
                                           text-[#001F3F]
                                           border border-[#001F3F]/20
                                           hover:border-[#0C71E4]
                                           hover:text-[#0C71E4]
                                           transition-colors"
                                >
                                    Cerrar
                                </button>

                                <Link to="/iniciar-sesion" className="flex-1">
                                    <button
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white
                                               bg-[#0C71E4] hover:bg-[#0855ae]
                                               transition-colors"
                                    >
                                        Iniciar sesión
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </AnimatePresence>,
        document.getElementById('modal-root')!
    );
};
