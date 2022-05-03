import { VFC } from 'react'
import { darkPurple, purple, trueWhite } from 'src/styles/colors'
import styled, { css } from 'styled-components'

type ToggleProps = {
  enabled: boolean
  onClick?: VoidFunction
}
export const Toggle = styled<VFC<ToggleProps & { className?: string }>>(
  ({ enabled, onClick, className }) => (
    <Button
      className={className}
      $checked={enabled}
      disabled={!onClick}
      onClick={onClick}
    />
  ),
)``

const checkedStyle = css`
  background: ${purple};
  ::after {
    left: calc(100% - 21px);
  }
`
const Button = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 20px;
  background: ${darkPurple};
  ::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${trueWhite};
    top: 3px;
    left: 3px;
    transition: all 0.5s;
  }
  :disabled {
    opacity: 0.5;
  }
  ${({ $checked }) => $checked && checkedStyle};
`
