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
