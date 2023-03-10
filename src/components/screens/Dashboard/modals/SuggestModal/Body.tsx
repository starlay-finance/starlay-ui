import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { FC, ReactNode } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { NumberItem, NumberItemPair } from 'src/components/parts/Modal/parts'
import { Item } from 'src/components/parts/Modal/parts/Item'
import { ARTHSWAP_ASSETS_DICT } from 'src/constants/assets'
import { hoverBackgroundKeyframes, hoveredRow } from 'src/styles/animation'
import { purple } from 'src/styles/colors'
import { makaiHoverGradients } from 'src/styles/mixins'
import { AssetMarketData } from 'src/types/models'
import { calculateLoopingAPR, ltvToLoopingLeverage } from 'src/utils/calculator'
import { aprSorter } from 'src/utils/market'
import { formatPct } from 'src/utils/number'
import styled from 'styled-components'
import { Action, Balance, ContentDiv, NumberItems } from '../parts'

type Action = {
  apr: BigNumber
  node: ReactNode
}
undefined
export type SuggestModalBodyProps = {
  asset: AssetMarketData
  arthswapPair?: {
    apr: BigNumber
    symbols: [string, string]
    url: string
  }
  inWallet: BigNumber
  openDeposit: VoidFunction
  openMakai: VoidFunction
}
export const SuggestModalBody: FC<SuggestModalBodyProps> = ({
  asset,
  arthswapPair,
  inWallet,
  openDeposit,
  openMakai,
}) => {
  const {
    name,
    symbol,
    icon,
    depositAPY,
    baseLTVasCollateral,
    depositIncentiveAPR,
    variableBorrowIncentiveAPR,
    makaiUnsupported,
  } = asset
  const makaiAPR = calculateLoopingAPR({
    leverage: ltvToLoopingLeverage(baseLTVasCollateral),
    depositIncentiveAPR,
    variableBorrowIncentiveAPR,
  })
  const displayMakaiAPR = formatPct(makaiAPR, {
    shorteningThreshold: 99,
    decimalPlaces: 2,
  })
  const actions: Action[] = [
    {
      apr: depositAPY,
      node: (
        <SuggestItem key="deposit" onClick={openDeposit}>
          <NumberItem
            label={t`Starlay Finance`}
            note={t`Lend ${symbol}`}
            num={depositAPY}
            image={{ src: icon, alt: name }}
            format={formatPct}
          />
        </SuggestItem>
      ),
    },
  ]
  if (!makaiUnsupported)
    actions.push({
      apr: makaiAPR,
      node: (
        <SuggestItemMakai key="loop" onClick={openMakai}>
          <Item
            label={t`Makai on Starlay Finance`}
            note={t`Loop ${symbol}`}
            value={displayMakaiAPR}
            image={{ src: icon, alt: name }}
          />
        </SuggestItemMakai>
      ),
    })
  if (arthswapPair) {
    const {
      apr,
      symbols: [symbol1, symbol2],
      url,
    } = arthswapPair
    const image1 = ARTHSWAP_ASSETS_DICT[symbol1].icon
    const image2 = ARTHSWAP_ASSETS_DICT[symbol2].icon
    actions.push({
      apr,
      node: (
        <SuggestItem
          key="arthswap"
          onClick={() => window.open(url, '_blank', 'noreferrer')}
        >
          <NumberItemPair
            label={t`ArthSwap`}
            note={t`Farm ${symbol1}-${symbol2}`}
            num={apr}
            image={{ src: image1, alt: symbol1 }}
            image2={{ src: image2, alt: symbol2 }}
            format={formatPct}
          />
        </SuggestItem>
      ),
    })
  }

  return (
    <SuggestContent>
      <SuggestAction>
        <SuggestItems>
          {actions.sort(aprSorter).map(({ node }) => node)}
        </SuggestItems>
        <Balance label={t`Wallet Balance`} balance={inWallet} symbol={symbol} />
      </SuggestAction>
    </SuggestContent>
  )
}

const SuggestItem = styled(({ children, className, onClick }) => (
  <button className={className} onClick={onClick}>
    <div />
    {children}
  </button>
))`
  position: relative;
  display: block;
  width: 100%;
  border: none;
  div {
    border: none;
  }
  > div:first-child {
    position: absolute;
    top: 0;
    right: -32px;
    bottom: 0;
    left: -32px;
  }
  :hover {
    > div:first-child {
      ${hoveredRow(purple)};
    }
  }
`
const SuggestItemMakai = styled(SuggestItem)`
  :hover {
    > div:first-child {
      background: linear-gradient(90deg, ${makaiHoverGradients.join(',')});
      background-size: ${makaiHoverGradients.length}00%;
      animation: ${hoverBackgroundKeyframes(makaiHoverGradients.length)}
        ${(makaiHoverGradients.length * 5) / 3}s infinite linear;
    }
  }
`

const SuggestItems = styled(NumberItems)`
  margin: -32px 0 0;
  padding-bottom: 16px;
  border-bottom-width: 3px;
`

const SuggestContent = styled(ContentDiv)`
  padding-top: 0;
`

const SuggestAction = styled(Action)`
  ${SimpleCtaButton} {
    margin-top: 24px;
  }
`
