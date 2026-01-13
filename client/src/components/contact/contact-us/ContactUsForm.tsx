import { useContactForm } from "../../../hooks/useContactForm";

export const ContactUsForm = () => {
    const {loading, errors, actions} = useContactForm()
    
    return (
        <form className='space-y-6' onSubmit={actions.handleSubmit(actions.onSubmit)}>

            <h3 className="font-semibold text-2xl lg:text-3xl text-[#001F3F]">Envianos un mensaje</h3>

            <div className="flex flex-col lg:flex-row gap-5">
                <div className="form-group ">
                    <label htmlFor="name" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                        Nombre(s)
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ej. Francsico"
                        {...actions.register("name")}
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                    />

                    {errors.name && (
                        <div className="mt-1"><span className="text-sm text-red-500">{errors.name?.message}</span></div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="surname" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        id="surname"
                        placeholder="Ej. Inda"
                        {...actions.register("surname")}
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                    />

                    {errors.surname && (
                        <div className="mt-1"><span className="text-sm text-red-500">{errors.surname?.message}</span></div>
                    )}
                </div>

            </div>

            <div className="flex flex-col lg:flex-row gap-5">
                <div className="form-group">
                    <label htmlFor="email" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                        Correo Electrónico
                    </label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Ej. correo@example.com"
                        {...actions.register("email")}
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                    />

                    {errors.email && (
                        <div className="mt-1"><span className="text-sm text-red-500">{errors.email?.message}</span></div>
                    )}

                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Ej. 123456789"
                        {...actions.register("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                    />

                    {errors.phone && (
                        <div className="mt-1"><span className="text-sm text-red-500">{errors.phone?.message}</span></div>
                    )}

                </div>
            </div>

            <div className="form-group">
                <label htmlFor="Subject" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                    Tema
                </label>
                <input
                    type="text"
                    id="Subject"
                    placeholder="Ej. Excelente Servicio"
                    {...actions.register("subject")}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                />

                {errors.subject && (
                    <div className="mt-1"><span className="text-sm text-red-500">{errors.subject?.message}</span></div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="Message" className="block font-semibold text-[#001F3F] mb-2 text-sm lg:text-base ">
                    Mensaje
                </label>
                <textarea

                    maxLength={450}
                    id="Message"
                    placeholder="Escribe tu mensaje"
                    {...actions.register("message")}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80 resize-none h-32 lg:h-40"
                />

                {errors.message && (
                    <div className="mt-1"><span className="text-sm text-red-500">{errors.message?.message}</span></div>
                )}
            </div>

            <button
                disabled={loading}
                className="bg-[#0C71E4] hover:bg-[#0855ae] text-white px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer"
                type="submit">
                {loading ? 'Cargando...' : 'Mandar Mensaje'}
            </button>
        </form>

    )
}
