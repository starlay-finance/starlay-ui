import { css } from 'styled-components'

export const contentMaxWidthCssVar = '--content-max-width'

export const noScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const absoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const bgClipText = css`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`

const maxWidthSize = {
  s: '744px', // 680 + 32 * 2
  m: '1024px', // 960 + 32 * 2
  l: '1344px', // 1280 + 32 * 2
}

const marginAuto = css`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`

export const limitWidth = {
  s: css`
    max-width: ${maxWidthSize.s};
    ${marginAuto};
  `,
  m: css`
    max-width: ${maxWidthSize.m};
    ${marginAuto};
  `,
  l: css`
    max-width: ${maxWidthSize.l};
    ${marginAuto};
  `,
}

const size = {
  xs: 375,
  s: 428,
  m: 680,
  l: 960,
  xl: 1224,
}

export const breakpoint = {
  s: `screen and (min-width:${size.s}px)`,
  m: `screen and (min-width:${size.m}px)`,
  l: `screen and (min-width:${size.l}px)`,
  xl: `screen and (min-width:${size.xl}px)`,
  lts: `screen and (max-width:${size.s - 1}px)`,
  ltxs: `screen and (max-width:${size.xs - 1}px)`,
}
export const notTouchable = `only screen and (hover: hover) and (pointer: fine)`

export const lineClamp = (num: number) =>
  css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${num};
    -webkit-box-orient: vertical;
  `
