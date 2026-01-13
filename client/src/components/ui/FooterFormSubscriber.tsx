import { useAddSubscriberForm } from "../../hooks/useAddSubscriberForm"

export const FooterFormSubscriber = () => {
    const { loading, errors, actions } = useAddSubscriberForm()

    return (
        <form className="w-full text-center md:text-start" onSubmit={actions.handleSubmit(actions.onSubmit)}>
            <p className="text-[#EBECF2] font-semibold text-2xl mb-4">
                Recibe por correo las novedades de BlueWave
            </p>

            <div className="relative w-full group">
                <input
                    type="email"
                    {...actions.register("email")}
                    placeholder="correo@ejemplo.com"
                    className=" w-full px-4 py-3 pr-2  rounded-lg ounded-lg bg-white text-gray-700 border-2 border-[#0855ae]/30
               placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0855ae] focus:border-[#0855ae] focus:bg-white transition-all duration-300 
                text-xs xl:text-sm hover:border-[#0855ae]/80"/>

                <button
                    disabled={loading}
                    type="submit"
                    className=" absolute right-1 top-1/2 -translate-y-1/2 bg-[#0C71E4] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0855ae]
                    transition-all duration-300 shadow-md hover:shadow-lg "
                >
                    {loading ? 'Cargando...' : 'Suscribirse'}
                </button>
            </div>

            {errors.email && (
                <div className="mt-1">
                    <span className="text-sm text-red-500">{errors.email?.message}</span>
                </div>
            )}

        </form>
    )
}
