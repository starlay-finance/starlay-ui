import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { ReactNode, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemAstarPair,
} from 'src/components/parts/Modal/parts'
import { hoveredRow } from 'src/styles/animation'
import { purple } from 'src/styles/colors'
import { AssetMarketData } from 'src/types/models'
import { formatPct } from 'src/utils/number'
import { ARTHSWAP } from 'src/utils/routes'
import styled from 'styled-components'
import { Action, Balance, ContentDiv, NumberItems, Tab, TabFC } from '../parts'

const TABS = ['aggregator'] as const

type Action = {
  apy: BigNumber
  node: ReactNode
}
const sorter = (a: { apy: BigNumber }, b: { apy: BigNumber }) => {
  if (a.apy.gt(b.apy)) return 1
  if (b.apy.gt(a.apy)) return -1
  return 0
}

export type SuggestModalBodyProps = {
  close: VoidFunction
  asset: AssetMarketData
  arthswapAPY: BigNumber
  inWallet: BigNumber
  openDeposit: VoidFunction
}
export const SuggestModalBody: VFC<SuggestModalBodyProps> = ({
  asset,
  close,
  arthswapAPY,
  inWallet,
  openDeposit,
}) => {
  const { name, symbol, icon, depositAPY } = asset
  const actions = (): Action[] => [
    {
      apy: arthswapAPY,
      node: (
        <SuggestItem
          onClick={() => window.open(ARTHSWAP, '_blank', 'noreferrer')}
        >
          <NumberItemAstarPair
            label={`ASTR-${symbol}`}
            note={t`Liquidity providing on ArthSwap`}
            num={arthswapAPY}
            image={{ src: icon, alt: name }}
            format={formatPct}
          />
        </SuggestItem>
      ),
    },
    {
      apy: depositAPY,
      node: (
        <SuggestItem onClick={openDeposit}>
          <NumberItem
            label={symbol}
            note={t`Lending on Starlay Finance`}
            num={depositAPY}
            image={{ src: icon, alt: name }}
            format={formatPct}
          />
        </SuggestItem>
      ),
    },
  ]
  return (
    <ContentDiv>
      <NoteP>
        {t`Please make investment decisions at your own risk. Starlay does not guarantee any of your assets.`}
      </NoteP>
      <ActionTab
        tabs={TABS}
        contents={{ aggregator: { label: t`Automated Aggregator` } }}
        activeTab="aggregator"
        onChangeActiveTab={() => {}}
      />
      <Action>
        <SuggestItems>
          {actions()
            .sort(sorter)
            .map((each) => each.node)}
        </SuggestItems>
        <SimpleCtaButton onClick={close}>{t`Close`}</SimpleCtaButton>
        <Balance label={t`Wallet Balance`} balance={inWallet} symbol={symbol} />
      </Action>
    </ContentDiv>
  )
}

const NoteP = styled.p`
  text-align: center;
  margin: 0 auto;
  max-width: 360px;
`

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

const SuggestItems = styled(NumberItems)``

const ActionTab: TabFC = Tab
