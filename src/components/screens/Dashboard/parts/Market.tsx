import { t } from '@lingui/macro'
import router from 'next/router'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { Toggle } from 'src/components/parts/Toggle'
import { useMarketData } from 'src/hooks/useMarketData'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { lightYellow, purple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { AssetMarketData, User } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import { toMakaiLoop } from 'src/utils/routes'
import styled, { css } from 'styled-components'
import { useBorrowModal } from '../modals/BorrowModal'
import { useCollateralModal } from '../modals/CollateralModal'
import { useDepositModal } from '../modals/DepositModal'
import { useSuggestModal } from '../modals/SuggestModal'

const DEPOSIT_MARKET_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Deposit`, widthRatio: 2.5 },
  { id: 'deposited', name: t`Deposited`, widthRatio: 3.5 },
  { id: 'collateral', name: t`Collateral`, widthRatio: 3 },
]
const BORROW_MARKET_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Borrow`, widthRatio: 3 },
  { id: 'borrowed', name: t`Borrowed`, widthRatio: 6 },
]

export const Market = asStyled(({ className }) => {
  const { account } = useWallet()
  const { data: marketData } = useMarketData()
  const {
    assets = [],
    marketReferenceCurrencyPriceInUSD = BN_ZERO,
    marketReferenceCurrencyDecimals = 0,
  } = marketData || {}
  const markets = assets.filter((each) => each.isActive).sort(symbolSorter)

  const { data: user } = useUserData()
  const { data: balance } = useWalletBalance()
  const { open: openDepositModal } = useDepositModal()
  const { open: openBorrowModal } = useBorrowModal()
  const { open: openCollateralModal } = useCollateralModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openSuggestModal } = useSuggestModal()

  const deposit = (user: User, asset: AssetMarketData) => {
    openDepositModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
    })
  }

  const borrow = (user: User, asset: AssetMarketData) => {
    // const arthswapPair = arthswapData
    //   ?.filter(
    //     (each) =>
    //       each.symbols.includes(asset.displaySymbol || asset.symbol) &&
    //       each.symbols.every((each) => !!ARTHSWAP_ASSETS_DICT[each]),
    //   )
    //   .sort(aprSorter)[0]

    // if (arthswapPair)
    //   arthswapPair.symbols = arthswapPair.symbols.map((e) =>
    //     e === asset.displaySymbol ? asset.symbol : e,
    //   ) as [string, string]

    openBorrowModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
      openSuggestModal: () =>
        openSuggestModal({
          asset,
          inWallet: balance[asset.symbol],
          // arthswapPair,
          openDeposit: () => deposit(user, asset),
          openMakai: () => router.push(toMakaiLoop(asset.symbol)),
        }),
    })
  }
  const setUsageAsCollateral = (user: User, asset: AssetMarketData) => {
    openCollateralModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
    })
  }

  return (
    <MarketSecion className={className}>
      <TableContainer>
        <MarketTable
          hoverColor={purple}
          caption={t`Deposit Markets`}
          columns={DEPOSIT_MARKET_COLUMNS}
          placeholderLength={3}
          rows={markets.map((asset) => {
            const {
              symbol,
              displaySymbol,
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
                          user.balanceByAsset[asset.symbol]
                            .usageAsCollateralEnabled
                        }
                        onClick={() => setUsageAsCollateral(user, asset)}
                      />
                    </ClickDisableWrapper>
                  )
                ) : undefined,
              },
            }
          })}
        />
      </TableContainer>
      <TableContainer>
        <MarketTable
          hoverColor={lightYellow}
          caption={t`Borrow Markets`}
          columns={BORROW_MARKET_COLUMNS}
          placeholderLength={3}
          rowDisabledStyle={rowDisabledStyle}
          rows={markets.map((asset) => {
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
              onClick: user ? () => borrow(user, asset) : openWalletModal,
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
const ClickDisableWrapper = styled.div`
  position: absolute;
  inset: 0;
  ${flexCenter};
  cursor: auto;
`

const MarketSecion = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 24px;
  > * {
    flex: 1;
  }
`
