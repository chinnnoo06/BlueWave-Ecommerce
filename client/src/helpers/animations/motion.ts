import type { MotionProps } from "framer-motion"
import { isDesktop } from "../utils/layout.utils"

export const slideInRight = (): MotionProps => {
  if (!isDesktop()) return slideInBottom

  return {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9, ease: "easeOut" },
  }
}

export const slideInLeft = (): MotionProps => {
  if (!isDesktop()) return slideInBottom

  return {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9, ease: "easeOut" },
  }
}

export const slideInBottom: MotionProps = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export const slideInRightInView = (): MotionProps => {
  if (!isDesktop()) return slideInBottomInView

  return {
    initial: { opacity: 0, x: 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" },
  }
}

export const slideInLeftInView = (): MotionProps => {
  if (!isDesktop()) return slideInBottomInView

  return {
    initial: { opacity: 0, x: -80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" },
  }
}

export const slideInBottomInView: MotionProps = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
}

export const slideInItem: MotionProps = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export const slideInItemInView: MotionProps = { 
  initial: { opacity: 0, y: 40 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: "-100px" }, 
  transition: { duration: 0.6, ease: "easeOut" }, 
}

export const accordionMotion: MotionProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: {
    duration: 0.35,
    ease: "easeInOut"
  }
}

export const fadeOverlay: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}
