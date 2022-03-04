import Image from 'next/image'
import { VFC } from 'react'
import { Table, TableFC } from 'src/components/parts/Table'
import { darkPurple, secondary } from 'src/styles/colors'
import {
  fontWeightHeavy,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { Color } from 'src/styles/types'
import { Asset } from 'src/types/models'
import styled, { css, keyframes } from 'styled-components'

type StyleProps = {
  hoverColor?: Color
}
export const MarketTable = (props: Parameters<TableFC>[0] & StyleProps) => (
  <StyledTable {...props} />
)

const StyledTable = styled(Table)<StyleProps>`
  caption {
    padding: 24px 32px 0;
    font-size: 20px;
    font-weight: ${fontWeightHeavy};
    margin-bottom: 24px;
  }
  tr {
    border-top: 1px solid ${darkPurple}3d;
    height: 64px;
  }
  th {
    color: ${secondary};
    font-size: 14px;
    font-weight: ${fontWeightMedium};
  }
  td {
    font-size: 16px;
    font-weight: ${fontWeightSemiBold};
    white-space: nowrap;
  }
  th,
  td {
    padding: 16px 0;
    vertical-align: middle;
    :first-child {
      padding-left: 32px;
    }
    :last-child {
      padding-right: 32px;
    }
    :nth-child(n + 2) {
      text-align: right;
      margin-left: auto;
    }
  }
  ${({ hoverColor }) => css`
    tbody > tr {
      :hover {
        background: linear-gradient(90deg, ${hoverColor}00, ${hoverColor}52, ${hoverColor}00));
        background-size: 300%;
        animation: ${hoverBackgroundKeyframes} 5s infinite linear;
      }
    }
  `}
  // temporary
  tr:first-child {
    td:nth-child(n + 5) {
      opacity: 0.5;
    }
  }
`

const hoverBackgroundKeyframes = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -300%;
  }
`

export const AssetTd: VFC<Pick<Asset, 'icon' | 'name'>> = ({ icon, name }) => (
  <AssetDiv>
    <Image src={icon} alt={name} width={32} height={32} />
    {name}
  </AssetDiv>
)

const AssetDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

export const TableContainer = styled.div`
  padding-bottom: 8px;
  border-radius: 8px;
  backdrop-filter: blur(8px) brightness(1.16);
  background-color: rgba(255, 255, 255, 0.16);
  overflow: hidden;
`
