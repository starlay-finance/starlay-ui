import { useEffect, useRef } from 'react'

export const useScreenParallax = (
  stylerFn: (scrollYPercentage: number) => string,
  option: { additionalStyle?: string; disabled?: boolean } = {},
) => {
  const ref = useRef<any>(null)
  const { additionalStyle = '', disabled } = option
  useEffect(() => {
    if (disabled) return
    let raf: number | null = null
    if (!ref.current) return
    const scrollPositionListener = () => {
      if (raf) return
      const { scrollY, document, innerHeight } = window
      raf = window.requestAnimationFrame(() => {
        if (!ref.current) return
        raf = null
        const maxScrollY = document.body.scrollHeight - innerHeight
        ref.current.setAttribute(
          'style',
          `${stylerFn(
            maxScrollY > 0 ? scrollY / maxScrollY : 0,
          )};${additionalStyle}`,
        )
      })
    }
    window.addEventListener('scroll', scrollPositionListener)
    return () => window.removeEventListener('scroll', scrollPositionListener)
  }, [stylerFn, additionalStyle])
  return { ref }
}
