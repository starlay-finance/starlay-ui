import { FC } from 'react'
import styled from 'styled-components'

export type AsStyledProps = {
  className?: string
}

export const asStyled = <T>(Component: FC<T & AsStyledProps>) =>
  styled<FC<T & AsStyledProps>>(Component)
