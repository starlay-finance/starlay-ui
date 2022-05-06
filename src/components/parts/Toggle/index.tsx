import { VFC } from 'react'
import { darkPurple, purple, trueWhite } from 'src/styles/colors'
import styled, { css, SimpleInterpolation } from 'styled-components'

type ToggleProps = {
  checked: boolean
  onClick?: VoidFunction
  disabled?: boolean
  checkedStyle?: SimpleInterpolation
}
export const Toggle = styled<VFC<ToggleProps & { className?: string }>>(
  ({ checked, onClick, disabled, checkedStyle, className }) => (
    <Button
      className={className}
      disabled={disabled || !onClick}
      onClick={onClick}
      $checked={checked}
      checkedStyle={checkedStyle}
    />
  ),
)``

const checkedStyle = css`
  background: ${purple};
  ::after {
    left: calc(100% - 21px);
  }
`
const Button = styled.button<{
  $checked: boolean
  checkedStyle?: SimpleInterpolation
}>`
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
    cursor: not-allowed;
  }
  ${(props) =>
    props.$checked &&
    css`
      ${checkedStyle};
      ${props.checkedStyle};
    `};
`
