import { t } from '@lingui/macro'
import { VFC } from 'react'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { darkPurple, darkRed, skyBlue } from 'src/styles/colors'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import styled from 'styled-components'
import { LaunchPadData, Market } from './types'

type StatisticsProps = {
  token: LaunchPadData['token']
  market: Market | undefined
}

export const Statistics: VFC<StatisticsProps> = ({ token, market }) => {
  return (
    <StatisticsDiv>
      <div>
        <Items>
          <Item label={t`Token`} value={token.symbol} />
          <Item label={t`Price Per Token`} value={market && 'TODO'} />
          <Item label={t`Bottom Price`} value={market && 'TODO'} />
          <Item label={t`Amount of Raised`} value={market && 'TODO'} />
          <Item label={t`Number of Bidders`} value={market && 'TODO'} />
        </Items>
        <Chart></Chart>
      </div>
    </StatisticsDiv>
  )
}

const Item = styled<
  VFC<{ label: string; value: string | undefined; className?: string }>
>(({ label, value, className }) => (
  <li className={className}>
    <p>{label}</p>
    <p>{value ? value : <ShimmerPlaceholder />}</p>
  </li>
))``

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  ${Item} {
    padding-bottom: 12px;
    :not(:last-child) {
      border-bottom: 1px solid ${darkPurple}3d;
    }
    p:first-child {
      font-size: 16px;
      font-weight: ${fontWeightRegular};
    }
    p:last-child {
      margin-top: 4px;
      font-size: 20px;
      font-weight: ${fontWeightBold};
      ${ShimmerPlaceholder} {
        width: 50%;
      }
    }
  }
`
const Chart = styled.figure``

const StatisticsDiv = styled.div`
  width: 100%;
  height: 392px;
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(45deg, ${skyBlue}, ${darkRed});
  backdrop-filter: blur(50px);
  > div {
    width: 100%;
    height: 100%;
    padding: 32px;
    border-radius: 14px;
    background: linear-gradient(30deg, #001a26f5, #00041af5, #000005, #000000);
  }
  ${Items} {
    width: 240px;
  }
  ${Chart} {
    flex: 1;
  }
`
