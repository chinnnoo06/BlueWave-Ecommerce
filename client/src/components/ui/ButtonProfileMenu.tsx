import { User } from "lucide-react"

type TButtonProfleMenu = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ButtonProfileMenu = ({setOpen} : TButtonProfleMenu) => {
  return (
         <div className="lg:hidden fixed bottom-10 right-6 z-30">
        <button
          onClick={() => setOpen(true)}
          className="group relative flex items-center justify-center gap-2 bg-[#0C71E4] hover:bg-[#0855ae]
                   text-white hover:shadow-2xl hover:scale-105 active:scale-95 border-2 border-white 
                   rounded-full p-2 font-medium cursor-pointer transition-all duration-300 shadow-lg
                   hover:shadow-[#0C71E4]/40"
        >

          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

          <div className="relative">
            <User className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>

          <div className="absolute -top-12 right-0 bg-[#001F3F] text-white text-sm px-3 py-1.5 rounded-lg 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                         whitespace-nowrap shadow-lg">
            Mi perfil
            {/* Flecha del tooltip */}
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#001F3F] rotate-45"></div>
          </div>
        </button>
      </div>
  )
}
