import { t } from '@lingui/macro'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Blink'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useMarketData } from 'src/hooks/useMarketData'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { lightYellow, purple } from 'src/styles/colors'
import { AssetMarketData, User } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'
import { useBorrowModal } from '../modals/BorrowModal'
import { useDepositModal } from '../modals/DepositModal'

const MARKET_SUMMARY_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 6 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Deposit`, widthRatio: 3 },
  { id: 'deposited', name: t`Deposited`, widthRatio: 6 },
]

export const Market = asStyled(({ className }) => {
  const { account } = useWallet()
  const { data: marketData } = useMarketData()
  const markets = (marketData?.assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)
  const marketReferenceCurrencyPriceInUSD =
    marketData?.marketReferenceCurrencyPriceInUSD || BN_ZERO

  const { data: user } = useUserData()
  const { data: balance } = useWalletBalance()
  const { open: openDepositModal } = useDepositModal()
  const { open: openBorrowModal } = useBorrowModal()
  const { open: openWalletModal } = useWalletModal()

  const deposit = (user: User, asset: AssetMarketData) => {
    openDepositModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
    })
  }

  const borrow = (user: User, asset: AssetMarketData) => {
    openBorrowModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
    })
  }

  return (
    <MarketSecion className={className}>
      <TableContainer>
        <MarketTable
          hoverColor={purple}
          caption={t`Deposit Markets`}
          columns={MARKET_SUMMARY_COLUMNS}
          placeholderLength={3}
          rows={markets.map((asset) => {
            const {
              symbol,
              displaySymbol,
              name,
              icon,
              depositAPY,
              depositIncentiveAPR,
            } = asset
            const apy = formatPct(depositAPY)
            const apr = formatPct(depositIncentiveAPR)
            return {
              id: symbol,
              onClick: user ? () => deposit(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
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
              },
            }
          })}
        />
      </TableContainer>
      <TableContainer>
        <MarketTable
          hoverColor={lightYellow}
          caption={t`Borrow Markets`}
          columns={[
            { id: 'asset', name: t`Asset`, widthRatio: 6 },
            { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
            { id: 'apy', name: t`APY_Borrow`, widthRatio: 3 },
            { id: 'borrowed', name: t`Borrowed`, widthRatio: 6 },
          ]}
          placeholderLength={3}
          rowDisabledStyle={rowDisabledStyle}
          rows={markets.map((asset) => {
            const {
              symbol,
              displaySymbol,
              name,
              icon,
              variableBorrowAPY,
              variableBorrowIncentiveAPR,
              borrowUnsupported,
            } = asset
            const apy = formatPct(variableBorrowAPY)
            const apr = formatPct(variableBorrowIncentiveAPR)
            return {
              id: symbol,
              onClick: user ? () => borrow(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
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
          })}
        />
      </TableContainer>
    </MarketSecion>
  )
})``
const rowDisabledStyle = css`
  opacity: 0.32;
  pointer-events: none;
`

const MarketSecion = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 48px;
  > * {
    flex: 1;
  }
`
