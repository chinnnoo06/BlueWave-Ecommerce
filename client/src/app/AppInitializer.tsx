import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import { Spinner } from "../components/ui/Spinner"

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { getProfile, loading } = useAppStore()

  useEffect(() => {
    getProfile()
  }, [])

  if (loading) return <Spinner />

  return <>{children}</>
}
