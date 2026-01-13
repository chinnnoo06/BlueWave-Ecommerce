import { useAddSubscriberForm } from "../../hooks/useAddSubscriberForm"

export const SubscriberCartForm = () => {
   const {loading, errors, actions} = useAddSubscriberForm()

    return (
        <form className='space-y-5 flex flex-col mt-10' onSubmit={actions.handleSubmit(actions.onSubmit)}>

            <div className='form-group'>
                <input
                    type="text"
                    id="email"
                    placeholder="correo@ejemplo.com"
                    {...actions.register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#001F3F]/30
                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#001F3F] 
                                focus:border-[#001F3F] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm lg:text-base hover:border-[#001F3F]/80"
                />

                {errors.email && (
                    <span className="text-sm text-red-500">{errors.email?.message}</span>
                )}
            </div>

            <div className='flex justify-start'>
                <button
                    disabled={loading}
                    className='py-1.5 px-5 lg:py-2 text-sm lg:text-base rounded-lg font-medium disabled:opacity-80 
                            text-[#EEEEEF] bg-[#0C71E4] flex items-center gap-2 hover:bg-[#0855ae] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer'
                    type="submit"
                >
                    {loading ? 'Cargando...' : 'Suscribirse'}
                </button>
            </div>
        </form>
    )
}
