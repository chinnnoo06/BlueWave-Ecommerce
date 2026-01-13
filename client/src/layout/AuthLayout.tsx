import { Outlet } from "react-router-dom"
import { HeaderAuth } from "../components/ui/HeaderAuth"

export const AuthLayout = () => {

  return (
    <>
      <HeaderAuth />
      <main className="font-poppins my-15">
        <Outlet />
      </main>
    </>
  )
}

