export const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= 1024

export const getItemWidth = (minValue: number, smValue: number, lgValue: number) => {
  const vw = window.innerWidth

  // breakpoints
  const minVW = 300
  const smVW = 640
  const lgVW = 1024

  // widths
  const minWidth = minValue
  const smWidth = smValue
  const lgWidth = lgValue

  // 📱 Muy chico
  if (vw <= minVW) return minWidth

  // 📱 Mobile → sm 
  if (vw > minVW && vw < smVW) {
    const ratio = (vw - minVW) / (smVW - minVW)
    return minWidth + ratio * (smWidth - minWidth)
  }

  // 💻 sm → lg 
  if (vw >= smVW && vw < lgVW) {
    const ratio = (vw - smVW) / (lgVW - smVW)
    return smWidth + ratio * (lgWidth - smWidth)
  }

  // 🖥️ lg en adelante
  return lgWidth
}