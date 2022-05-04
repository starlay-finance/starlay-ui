import { VFC } from 'react'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import { darkPurple, darkRed, lightBlack, skyBlue } from 'src/styles/colors'
import {
  fontWeightBlack,
  fontWeightBold,
  fontWeightMedium,
} from 'src/styles/font'
import styled, { css } from 'styled-components'

export const CtaButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 18px;
  border-radius: 6px;
  overflow: hidden;

  background: linear-gradient(90deg, ${skyBlue}cc, ${darkRed}cc);
  text-align: center;
  font-size: 16px;
  font-weight: ${fontWeightBlack};
  ::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(24px) brightness(1.16);
  }
  span {
    position: relative;
  }
  :disabled {
    background: ${lightBlack};
  }
`

export const InformationItem = styled<
  VFC<{
    label: string
    value: string | undefined
    tooltip?: string
    className?: string
  }>
>(({ label, value, tooltip, className }) => (
  <li className={className}>
    <div>
      {label}
      {tooltip && <TooltipMessage message={tooltip} />}
    </div>
    <div>{value ? value : <ShimmerPlaceholder />}</div>
  </li>
))``

export const Information = styled.div<{ started?: boolean }>`
  background: linear-gradient(45deg, ${skyBlue}cc, ${darkRed}cc);
  padding: 2px;
  border-radius: 8px;
  > ul {
    border-radius: 6px;
    padding: 4px 0 2px;
    background: linear-gradient(30deg, #001a26f5, #00041af5, #000005, #000000);
    ${InformationItem} {
      display: flex;
      padding: 16px 22px;
      :not(:last-child) {
        border-bottom: 1px solid ${darkPurple}3d;
      }

      font-size: 16px;
      white-space: pre-wrap;
      > * {
        :first-child {
          display: flex;
          align-items: center;
          column-gap: 4px;
          flex: 1;
          font-weight: ${fontWeightBold};
          ${TooltipMessage} {
            width: 240px;
          }
        }
        :last-child {
          flex: 1;
          font-weight: ${fontWeightMedium};
          font-style: italic;
          ${ShimmerPlaceholder} {
            width: 50%;
          }
        }
      }
    }
  }
  ${({ started }) =>
    started &&
    css`
      background: ${lightBlack};
      ul {
        background: none;
        padding: 8px 0;
        ${InformationItem} {
          padding: 16px 24px;
        }
      }
    `}
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  h2 {
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
`
