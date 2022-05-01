import { ReactNode, VFC } from 'react'
import { IconTips } from 'src/assets/svgs'
import { primary } from 'src/styles/colors'
import { fontWeightRegular } from 'src/styles/font'
import styled, { css } from 'styled-components'

export type ToolTipPosition = 'center' | 'right' | 'left'
type TooltipProps = {
  children: ReactNode
  position?: ToolTipPosition
  label?: string
}
export const Tooltip: VFC<TooltipProps> = ({
  children,
  position = 'center',
  label,
}) => (
  <TooltipContainer position={position}>
    {label && <span>{label}</span>}
    <IconSpan>
      <IconTips />
    </IconSpan>
    <Content>{children}</Content>
  </TooltipContainer>
)

export const TooltipMessage = styled<
  VFC<{
    message: string
    label?: string
    position?: ToolTipPosition
    className?: string
  }>
>(({ message, label, position, className }) => (
  <Tooltip position={position} label={label}>
    <Message className={className}>{message}</Message>
  </Tooltip>
))``

const IconSpan = styled.span``
const Content = styled.div``
const TooltipContainer = styled.div<{ position: ToolTipPosition }>`
  position: relative;
  flex: 1;
  > span {
    margin-right: 4px;
  }
  > ${Content} {
    display: none;
    position: absolute;
    top: 100%;
    margin-top: 6px;
  }
  ${IconSpan} {
    position: relative;
  }
  :hover {
    > ${Content} {
      display: block;
      z-index: 1;
    }

    ${IconSpan}::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-right: 4px solid transparent;
      border-bottom: 6px solid #575757;
      border-left: 4px solid transparent;
    }
  }
  ${({ position }) => {
    switch (position) {
      case 'right':
        return css`
          > ${Content} {
            right: 0;
          }
        `
      case 'left':
        return css`
          > ${Content} {
            left: 0;
          }
        `
      default:
        return css`
          > ${Content} {
            left: 50%;
            transform: translate(-50%);
          }
        `
    }
  }}
`

export const Message = styled.div`
  padding: 12px 16px 16px;
  border-radius: 8px;
  color: ${primary};
  background: #575757;
  font-size: 14px;
  font-weight: ${fontWeightRegular};
  line-height: 1.5;
  white-space: pre-wrap;
`
