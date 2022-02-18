import { ButtonHTMLAttributes, VFC } from 'react'
import { IconArrowBottom } from 'src/assets/svgs'
import { blue } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const DropdownButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <Button {...props}>
    {children} <IconArrowBottom />
  </Button>
)

const Button = styled.button`
  ${flexCenter};
  column-gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  background: ${blue}3d;
`
