import { VFC } from 'react'
import { isDesktop, useDeviceSelectors } from 'react-device-detect'
import {
  BackgroundDotsTop,
  BackgroundGradient,
  BackgroundOverlay,
} from 'src/components/parts/Background'
import { FOOTER_HEIGHT } from 'src/components/parts/Footer'
import { HEADER_HEIGHT } from 'src/components/parts/Header'
import { useScreenParallax } from 'src/hooks/useScreenParallax'
import { darkRed, skyBlue } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

const calcFillRuleY = (
  from: number,
  to: number,
  pct: number,
  {
    startRatio = 0,
    stopRatio = 1,
  }: { startRatio?: number; stopRatio?: number } = {},
) => {
  if (pct < startRatio) return from
  if (pct >= stopRatio) return to
  return from + ((to - from) * pct) / (stopRatio - startRatio)
}

/**
 *  a -- b
 *  |    |
 *  d -- c
 */
const calcBgClipPathPolygon = (
  pct: number,
  top: readonly [number, number, number, number],
  bottom: readonly [number, number, number, number],
  opt: { startRatio?: number; stopRatio?: number } = {},
) => {
  const [ay, by, cy, dy] = top.map((each, idx) =>
    calcFillRuleY(each, bottom[idx], pct, opt),
  )
  return `polygon(0 ${ay}%, 100% ${by}%, 100% ${cy}%, 0 ${dy}%)`
}
const GRADIENT1_TOP = [21, 4, 30, 60] as const
const GRADIENT1_BOTTOM = [21, 40, 64, 36] as const
const GRADIENT2_TOP = [41, 38, 81, 100] as const
const GRADIENT2_BOTTOM = [80, 38, 81, 100] as const

export const Background: VFC = () => {
  if (typeof window === 'undefined')
    return (
      <>
        <BackgroundGradientMobile />
        <BackgroundGradient2 />
        <BackgroundGradient1 />
        <BackgroundDotsTop />
        <BackgroundOverlay top={HEADER_HEIGHT} />
      </>
    )
  return (
    <>
      <BackgroundGradientMobile />
      <BackgroundGradients />
      <BackgroundOverlay top={HEADER_HEIGHT} />
    </>
  )
}
const BackgroundGradients = () => {
  const [selectors] = useDeviceSelectors('')
  const isChromeOnMac = selectors?.isChrome && selectors?.isMacOs
  const { ref: ref1 } = useScreenParallax(
    (pct) => {
      const clipPath = calcBgClipPathPolygon(
        pct,
        GRADIENT1_TOP,
        GRADIENT1_BOTTOM,
        {
          stopRatio: 0.5,
        },
      )
      return `clip-path:${clipPath};-webkit-clip-path:${clipPath};`
    },
    {
      // Heavy use of backdrop-filter in chrome on mac will slow down performance.
      additionalStyle: isChromeOnMac
        ? 'backdrop-filter:none;-webkit-backdrop-filter:none;'
        : undefined,
      disabled: !isDesktop,
    },
  )
  const { ref: ref2 } = useScreenParallax(
    (pct) => {
      const clipPath = calcBgClipPathPolygon(
        pct,
        GRADIENT2_TOP,
        GRADIENT2_BOTTOM,
      )
      return `clip-path:${clipPath};-webkit-clip-path:${clipPath};`
    },
    {
      additionalStyle: isChromeOnMac
        ? 'backdrop-filter:none;-webkit-backdrop-filter:none;'
        : undefined,
      disabled: !isDesktop,
    },
  )
  const { ref: refDots } = useScreenParallax(
    (pct) => `background-position: 40.7% ${50 - pct * 30}%;`,
  )
  return (
    <>
      <BackgroundGradient2 ref={ref2} />
      <BackgroundGradient1 ref={ref1} />
      <BackgroundDotsTop ref={refDots} />
    </>
  )
}

const BackgroundGradient1 = styled(BackgroundGradient)`
  top: 0;
  bottom: calc(0px - ${FOOTER_HEIGHT});
  clip-path: polygon(0 21%, 100% 4%, 100% 30%, 0 60%);
  display: none;
  @media ${breakpoint.xl} {
    display: block;
  }
`

const BackgroundGradient2 = styled(BackgroundGradient)`
  top: 0;
  bottom: calc(0px - ${FOOTER_HEIGHT});
  background: linear-gradient(30deg, ${darkRed}57, ${skyBlue}57);
  clip-path: polygon(0 80%, 100% 38%, 100% 81%, 0 100%);
  display: none;
  @media ${breakpoint.xl} {
    display: block;
  }
`

const BackgroundGradientMobile = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(30deg, ${darkRed}57, ${skyBlue}57);
  clip-path: polygon(0 60%, 100% 32.5%, 100% 100%, 0 100%);
  @media ${breakpoint.xl} {
    display: none;
  }
`
