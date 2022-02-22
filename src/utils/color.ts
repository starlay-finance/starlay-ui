import { scale } from 'chroma-js'
import { Color } from 'src/styles/types'

export const pickColorInGradient = (weight: number, ...colors: Color[]) => {
  return scale(colors)(weight).css()
}
