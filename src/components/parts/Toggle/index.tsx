import { VFC } from 'react'
import { darkPurple, purple, trueWhite } from 'src/styles/colors'
import styled, { css, SimpleInterpolation } from 'styled-components'

type ToggleProps = {
  enabled: boolean
  onClick?: VoidFunction
  enabledStyle?: SimpleInterpolation
}
export const Toggle = styled<VFC<ToggleProps & { className?: string }>>(
  ({ enabled, onClick, enabledStyle, className }) => (
    <Button
      className={className}
      disabled={!onClick}
      onClick={onClick}
      $checked={enabled}
      checkedStyle={enabledStyle}
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
  }
  ${(props) =>
    props.$checked &&
    css`
      ${checkedStyle};
      ${props.checkedStyle};
    `};
`
