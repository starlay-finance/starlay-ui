export const disableSVGAnimation = () => {
  Array.from(document.getElementsByTagName('animate')).forEach((elem) =>
    elem.remove(),
  )
}
