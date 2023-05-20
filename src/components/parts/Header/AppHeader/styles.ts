import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const MenuButton = styled.button`
  ${flexCenter};
  padding: 12px 20px;
  border-radius: 4px;
  backdrop-filter: blur(8px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
  column-gap: 8px;
`
export const MenuButtonSmall = styled(MenuButton)`
  width: 42px;
  height: 42px;
  padding: unset;
  svg {
    height: 18px;
  }
`
