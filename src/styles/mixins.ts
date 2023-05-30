import { css } from 'styled-components'
import { darkRed, lightYellow, purple, skyBlue } from './colors'

export const contentMaxWidthCssVar = '--content-max-width'

export const noScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const size = {
  xs: 375,
  s: 428,
  m: 680,
  l: 960,
  xl: 1280,
  xxl: 1724,
}

export const breakpoint = {
  s: `screen and (min-width:${size.s}px)`,
  m: `screen and (min-width:${size.m}px)`,
  l: `screen and (min-width:${size.l}px)`,
  xl: `screen and (min-width:${size.xl}px)`,
  xxl: `screen and (min-width:${size.xxl}px)`,
  lts: `screen and (max-width:${size.s - 1}px)`,
  ltxs: `screen and (max-width:${size.xs - 1}px)`,
  ltxl: `screen and (max-width:${size.xl - 1}px)`,
}
export const notTouchable = `only screen and (hover: hover) and (pointer: fine)`

export const lineClamp = (num: number) =>
  css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${num};
    -webkit-box-orient: vertical;
  `

export const makaiHoverGradients = [
  `${darkRed}3d`,
  `${skyBlue}3d`,
  `${lightYellow}3d`,
  `${purple}3d`,
  `${lightYellow}3d`,
  `${skyBlue}3d`,
  `${darkRed}3d`,
]
