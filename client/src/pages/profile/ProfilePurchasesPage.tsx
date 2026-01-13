import { useEffect } from "react"
import { useAppStore } from "../../stores/useAppStore"
import { ShoppingBag } from "lucide-react"
import { ProfilePurchaseCard } from "../../components/profile/ProfilePurchaseCard"
import { Link } from "react-router-dom"

export const ProfilePurchasesPage = () => {
  const { getPurchases, purchases } = useAppStore()

  useEffect(() => {
    getPurchases()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">

      <h2 className="text-[#001F3F] font-bold leading-tight text-[1.5rem] lg:text-[2rem] mb-6 relative inline-block">
        Historial de Compras
      </h2>

      <div className="flex flex-col h-full p-6 rounded-xl shadow-sm">
        {purchases.length ? (
          <div className="space-y-10">
            {purchases.map((purchase, index) => (
              <div key={index}>
                <ProfilePurchaseCard purchase={purchase} index={index} length={purchases.length} />
                {index < purchases.length - 1 && <div className="border-t-2 border-[#001F3F]/25" />}
              </div>
            ))}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="mb-4 p-3 bg-blue-50 rounded-full">
              <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7 text-[#0855ae]" />
            </div>
            <h3 className="font-semibold text-lg lg:text-xl text-[#001F3F] mb-2">
              Aún no haz realizado ninguna compra
            </h3>
            <p className="opacity-65 text-sm lg:text-base mb-6 max-w-md">
              !Las compras que realices en BlueWave aparecerán aqui!
            </p>
            <Link to="/catalogo/todos/1">
              <button
                type="button"
                className="bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors"
              >
                Ver Productos
              </button>
            </Link>
          </div>

        )}
      </div>
    </div>
  )
}
