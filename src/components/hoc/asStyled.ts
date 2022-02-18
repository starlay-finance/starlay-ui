import { VFC } from 'react'
import styled from 'styled-components'

export type AsStyledProps = {
  className?: string
}

export const asStyled = <T>(Component: VFC<T & AsStyledProps>) =>
  styled<VFC<T & AsStyledProps>>(Component)
