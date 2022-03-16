import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { ReactNode, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { NumberItem, NumberItemPair } from 'src/components/parts/Modal/parts'
import { hoveredRow } from 'src/styles/animation'
import { purple } from 'src/styles/colors'
import { AssetMarketData } from 'src/types/models'
import { formatPct } from 'src/utils/number'
import styled from 'styled-components'
import { Action, Balance, ContentDiv, NumberItems, Tab, TabFC } from '../parts'

const TABS = ['aggregator'] as const

type Action = {
  apy: BigNumber
  node: ReactNode
}

export type SuggestModalBodyProps = {
  close: VoidFunction
  asset: AssetMarketData
  arthswapPair: {
    symbol1: string
    symbol2: string
    image1: StaticImageData
    image2: StaticImageData
    apr: BigNumber
    url: string
  }
  inWallet: BigNumber
  openDeposit: VoidFunction
}
export const SuggestModalBody: VFC<SuggestModalBodyProps> = ({
  asset,
  close,
  arthswapPair,
  inWallet,
  openDeposit,
}) => {
  const { name, symbol, icon, depositAPY } = asset
  const { symbol1, symbol2, image1, image2, apr, url } = arthswapPair
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
          <SuggestItem onClick={() => window.open(url, '_blank', 'noreferrer')}>
            <NumberItemPair
              label={`${symbol1}-${symbol2}`}
              note={t`Liquidity providing on ArthSwap`}
              num={apr}
              image={{ src: image1, alt: symbol1 }}
              image2={{ src: image2, alt: symbol2 }}
              format={formatPct}
            />
          </SuggestItem>
          <SuggestItem onClick={openDeposit}>
            <NumberItem
              label={symbol}
              note={t`Lending on Starlay Finance`}
              num={depositAPY}
              image={{ src: icon, alt: name }}
              format={formatPct}
            />
          </SuggestItem>
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

const SuggestItems = styled(NumberItems)`
  margin: -32px 0 8px;
`

const ActionTab: TabFC = Tab
