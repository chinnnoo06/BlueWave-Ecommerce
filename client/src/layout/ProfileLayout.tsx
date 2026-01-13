// layout/ProfileLayout.tsx
import { Outlet, useNavigate } from "react-router-dom"
import { ProfileMenu } from "../components/ui/ProfileMenu"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAppStore } from "../stores/useAppStore"
import { ButtonProfileMenu } from "../components/ui/ButtonProfileMenu"
import { slideInLeft, slideInRight } from "../helpers/animations/motion"

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const { user, loading } = useAppStore();

  useEffect(() => {
    if (!loading && !user) navigate('/');
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // lg: breakpoint de Tailwind
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Llamada inicial para asegurarse de que el estado sea correcto al montar
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <div className="flex max-w-[1300px] px-4 mx-auto pb-15">

      <ButtonProfileMenu setOpen={setOpen}/>

      <motion.aside {...slideInLeft()} className="hidden lg:block w-92 border-r border-[#001F3F]/25">
        <ProfileMenu />
      </motion.aside>

      <motion.div {...slideInRight()} className="px-0 lg:pl-4 w-full">
        <Outlet />
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-100"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-72 s:w-82 bg-[#EBECF2] z-100 shadow-xl px-4"
            >
              <ProfileMenu onClose={() => setOpen(false)} />

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
