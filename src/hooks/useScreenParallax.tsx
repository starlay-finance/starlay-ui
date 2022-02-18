import { useEffect, useRef } from 'react'

export const useScreenParallax = (
  stylerFn: (scrollYPercentage: number) => string,
  additionalStyle: string = '',
) => {
  const ref = useRef<any>(null)
  useEffect(() => {
    let raf: number | null = null
    if (!ref.current) return
    const scrollPositionListener = () => {
      if (raf) return
      const { scrollY, document, innerHeight } = window
      raf = window.requestAnimationFrame(() => {
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
