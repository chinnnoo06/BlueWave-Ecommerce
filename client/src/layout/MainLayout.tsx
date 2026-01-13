import { Outlet } from "react-router-dom"
import { Footer } from "../components/ui/Footer"
import { Header } from "../components/ui/Header"
import { TopBar } from "../components/ui/TopBar"

export const MainLayout = () => {
  return (
    <>
      <TopBar />
      <Header />

      <main className="font-poppins">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
