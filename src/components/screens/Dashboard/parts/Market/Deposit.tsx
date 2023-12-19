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
import { Toggle } from 'src/components/parts/Toggle'
import { NetworkType } from 'src/libs/config'
import { purple } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import { AssetMarketData, User } from 'src/types/models'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import styled from 'styled-components'

const DEPOSIT_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Deposit`, widthRatio: 2.5 },
  { id: 'deposited', name: t`Deposited`, widthRatio: 3.5 },
  { id: 'collateral', name: t`Collateral`, widthRatio: 3 },
]
const DEPOSIT_MARKET_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Deposit`, widthRatio: 2.5 },
]
const DEPOSIT_POSITION_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'deposited', name: t`Deposited`, widthRatio: 3.5 },
  { id: 'collateral', name: t`Collateral`, widthRatio: 3 },
]
const DEPOSIT_TABS = [
  { id: 'markets', label: t`Deposit Markets` },
  { id: 'position', label: t`Your Position` },
] as const

type DepositProps = {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  networkType: NetworkType | undefined
  deposit: (user: User, asset: AssetMarketData) => void
  setUsageAsCollateral: (user: User, asset: AssetMarketData) => void
  openWalletModal: () => void
}
export const Deposit = asStyled<DepositProps>(
  ({
    className,
    account,
    markets,
    user,
    networkType,
    deposit,
    setUsageAsCollateral,
    openWalletModal,
  }) => {
    const [activeTab, setTab] = useState<string>()
    useEffect(() => {
      if (!isMobile || !user) return
      if (!user.summary.totalDepositedInUSD.gt(BN_ZERO))
        return setTab(DEPOSIT_TABS[0].id)
      setTab(DEPOSIT_TABS[1].id)
    }, [user])

    const rows = depositRows({
      account,
      markets,
      networkType,
      user,
      onClickRow: user
        ? (asset) => deposit(user, asset)
        : () => openWalletModal(),
      onClickCollateral: user
        ? (asset) => setUsageAsCollateral(user, asset)
        : undefined,
    })
    return (
      <TableContainer>
        <MarketTable
          hoverColor={purple}
          caption={!isMobile ? t`Deposit Markets` : undefined}
          tabs={
            isMobile
              ? {
                items: user?.summary.totalDepositedInUSD.gt(BN_ZERO)
                  ? DEPOSIT_TABS
                  : [DEPOSIT_TABS[0]],
                activeTab: activeTab || DEPOSIT_TABS[0].id,
                setTab,
              }
              : undefined
          }
          columns={
            !isMobile
              ? DEPOSIT_COLUMNS
              : activeTab === 'position'
                ? DEPOSIT_POSITION_COLUMNS
                : DEPOSIT_MARKET_COLUMNS
          }
          placeholderLength={3}
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

const depositRows = ({
  markets,
  user,
  account,
  networkType,
  onClickRow,
  onClickCollateral,
}: {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  networkType: NetworkType | undefined
  onClickRow: (asset: AssetMarketData) => void
  onClickCollateral: ((asset: AssetMarketData) => void) | undefined
}) =>
  markets
    .map((asset) => {
      const { symbol, displaySymbol, icon, depositAPY, depositIncentiveAPR, isDepositInactive } =
        asset
      const apy = formatPct(depositAPY)
      const apr = formatPct(depositIncentiveAPR)
      return {
        id: symbol,
        onClick: () => onClickRow(asset),
        hasPosition: user?.balanceByAsset[asset.symbol].deposited.gt(BN_ZERO),
        hasPositionBorrowed:
          user?.balanceByAsset[asset.symbol].borrowed.gt(BN_ZERO),
        isDepositInactive,
        data: {
          asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
          apr: <BlinkWrapper value={apr}>{apr}</BlinkWrapper>,
          apy: <BlinkWrapper value={apy}>{apy}</BlinkWrapper>,
          deposited: !account
            ? '-'
            : user
              ? formatAmt(user.balanceByAsset[asset.symbol].deposited, {
                symbol: displaySymbol || symbol,
                shorteningThreshold: 6,
              })
              : undefined,
          collateral: !account ? (
            '-'
          ) : user ? (
            user.balanceByAsset[asset.symbol].deposited.isZero() ? (
              <Toggle checked={false} />
            ) : (
              <ClickDisableWrapper onClick={(e) => e.stopPropagation()}>
                <Toggle
                  checked={
                    user.balanceByAsset[asset.symbol].usageAsCollateralEnabled
                  }
                  onClick={
                    onClickCollateral
                      ? () => onClickCollateral(asset)
                      : undefined
                  }
                  disabled={networkType !== 'EVM'}
                />
              </ClickDisableWrapper>
            )
          ) : undefined,
        },
      }
    })
    .filter((row) => {
      if (row.isDepositInactive) {
        return row.hasPosition || row.hasPositionBorrowed
      }
      return true
    })

const ClickDisableWrapper = styled.div`
  position: absolute;
  inset: 0;
  cursor: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  @media ${breakpoint.xl} {
    padding-right: 32px;
  }
`
