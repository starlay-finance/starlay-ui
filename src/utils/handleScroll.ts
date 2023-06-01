const disableScrollFn = (e: TouchEvent | Event) => {
  e.preventDefault()
}
export const disableScroll = () => {
  window.addEventListener('touchmove', disableScrollFn, {
    passive: false,
  })
  window.addEventListener('mousewheel', disableScrollFn, {
    passive: false,
  })
}
export const enableScroll = () => {
  window.removeEventListener('touchmove', disableScrollFn)
  window.removeEventListener('mousewheel', disableScrollFn)
}
export const disablePageScroll = () => {
  const scrollY = document.scrollingElement?.scrollTop
  if (Number.isNaN(scrollY)) return
  document.body.style.setProperty('position', 'fixed')
  document.body.style.setProperty('top', `${scrollY! * -1}px`)
  document.body.style.setProperty('width', '100vw')
}

export const enablePageScroll = () => {
  const scrollY = parseInt(document.body.style.top)
  document.body.style.setProperty('position', null)
  document.body.style.setProperty('top', null)
  document.body.style.setProperty('width', null)
  if (Number.isNaN(scrollY)) return
  window.scrollTo(0, scrollY! * -1)
}
