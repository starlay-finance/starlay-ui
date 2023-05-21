import { t } from '@lingui/macro'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { lightYellow } from 'src/styles/colors'
import { AssetMarketData, User } from 'src/types/models'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import { css } from 'styled-components'

const BORROW_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Borrow`, widthRatio: 3 },
  { id: 'borrowed', name: t`Borrowed`, widthRatio: 6 },
]

const BORROW_MARKET_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Borrow`, widthRatio: 3 },
]

const BORROW_POSITION_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'borrowed', name: t`Borrowed`, widthRatio: 6 },
]

const BORROW_TABS = [
  { id: 'markets', label: t`Borrow Markets` },
  { id: 'position', label: t`Your Position` },
] as const

type BorrowProps = {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  borrow: (user: User, asset: AssetMarketData) => void
  openWalletModal: () => void
}
export const Borrow = asStyled<BorrowProps>(
  ({ className, account, markets, user, borrow, openWalletModal }) => {
    const [activeTab, setTab] = useState<string>()
    useEffect(() => {
      if (!isMobile || activeTab || !user) return
      if (!user.summary.totalBorrowedInUSD.gt(BN_ZERO))
        return setTab(BORROW_TABS[0].id)
      setTab(BORROW_TABS[1].id)
    }, [user])

    const rows = borrowRows({
      account,
      markets,
      user,
      onClickRow: user
        ? (asset) => borrow(user, asset)
        : () => openWalletModal(),
    })
    return (
      <TableContainer>
        <MarketTable
          hoverColor={lightYellow}
          caption={!isMobile ? t`Borrow Markets` : undefined}
          tabs={
            isMobile
              ? {
                  items: BORROW_TABS,
                  activeTab: activeTab || BORROW_TABS[0].id,
                  setTab,
                }
              : undefined
          }
          columns={
            !isMobile
              ? BORROW_COLUMNS
              : activeTab === 'markets'
              ? BORROW_MARKET_COLUMNS
              : BORROW_POSITION_COLUMNS
          }
          placeholderLength={3}
          rowDisabledStyle={rowDisabledStyle}
          rows={
            activeTab === 'position'
              ? rows.filter((row) => row.hasPosition)
              : rows
          }
        />
      </TableContainer>
    )
  },
)``

const borrowRows = ({
  markets,
  user,
  account,
  onClickRow,
}: {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  onClickRow: (asset: AssetMarketData) => void
}) =>
  markets.map((asset) => {
    const {
      symbol,
      displaySymbol,
      icon,
      variableBorrowAPY,
      variableBorrowIncentiveAPR,
      borrowUnsupported,
    } = asset
    const apy = formatPct(variableBorrowAPY)
    const apr = formatPct(variableBorrowIncentiveAPR)
    return {
      id: symbol,
      onClick: () => onClickRow(asset),
      hasPosition: user?.balanceByAsset[asset.symbol].borrowed.gt(BN_ZERO),
      data: {
        asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
        apr: borrowUnsupported ? (
          'Coming soon'
        ) : (
          <BlinkWrapper value={apr}>{apr}</BlinkWrapper>
        ),
        apy: borrowUnsupported ? (
          '-'
        ) : (
          <BlinkWrapper value={apy}>{apy}</BlinkWrapper>
        ),
        borrowed:
          borrowUnsupported || !account
            ? '-'
            : user
            ? formatAmt(user.balanceByAsset[asset.symbol].borrowed, {
                symbol: displaySymbol || symbol,
                shorteningThreshold: 6,
              })
            : undefined,
      },
      disabled: borrowUnsupported,
    }
  })

const rowDisabledStyle = css`
  opacity: 0.32;
  pointer-events: none;
`
