import { a, config, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactNode } from 'react'
import { Z_MODAL } from 'src/utils/zIndex'
import styled from 'styled-components'

const SWIPEOUT_PX = 150
export type useSwipeableParams = {
  close?: VoidFunction
}
export const useSwipeable = ({ close }: useSwipeableParams) => {
  const [{ y }, api] = useSpring(() => ({
    y: SWIPEOUT_PX,
    config: { bounce: 0 },
  }))
  const open = () => api.start({ y: 0, immediate: false })
  const onClose = async (velocity = 0) => {
    await api.start({
      y: SWIPEOUT_PX,
      immediate: false,
      config: { ...config.stiff, velocity },
    })
  }
  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (!close) return
      if (my < 0) cancel()
      if (last) my > SWIPEOUT_PX || (vy > 0.8 && dy > 0) ? close() : open()
      else api.start({ y: my, immediate: true })
    },
    { from: () => [0, y.get()], filterTaps: true, rubberband: true },
  )
  const display = y.to((py: number) => (py < SWIPEOUT_PX ? 'block' : 'none'))

  const overlayStyle = {
    background: y.to(
      [0, SWIPEOUT_PX],
      ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)'],
    ),
  }
  const contentStyle = {
    transform: y.to((py: number) =>
      py <= 0 ? 'translateY(0%)' : `translateY(${(py / SWIPEOUT_PX) * 100}%)`,
    ),
  }

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Overlay {...bind()} style={{ display, ...overlayStyle }}>
      <SwipeableWrapper style={contentStyle}>{children}</SwipeableWrapper>
    </Overlay>
  )
  return {
    open,
    onClose,
    Wrapper,
  }
}

const Overlay = styled(a.div)`
  position: fixed;
  inset: 0;
  touch-action: none;
  z-index: ${Z_MODAL};
`
const SwipeableWrapper = styled(a.div)`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
`
