import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { useMarketData } from 'src/hooks/useMarketData'
import { useUserData } from 'src/hooks/useUserData'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { makaiHoverGradients } from 'src/styles/mixins'
import { AssetMarketData, User } from 'src/types/models'
import { calculateLoopingAPR, ltvToLoopingLeverage } from 'src/utils/calculator'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'
import { useLoopingModal } from './modals/LoopingModal'

const COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'makaiAPR', name: t`Makai APR`, widthRatio: 3 },
  { id: 'wallet', name: t`Wallet_Balance`, widthRatio: 5 },
]

export const MakaiMarkets = asStyled(({ className }) => {
  const { query, replace, pathname } = useRouter()

  const { data: marketData } = useMarketData()
  const { data: userData } = useUserData()
  const { data: balances } = useWalletBalance()
  const { open: openWalletModal } = useWalletModal()
  const { open: openLoopingModal } = useLoopingModal()
  const {
    assets,
    marketReferenceCurrencyPriceInUSD = BN_ZERO,
    marketReferenceCurrencyDecimals = 0,
  } = marketData || {}
  const markets = (assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)

  const loopingParams = (asset: AssetMarketData, userData: User) => ({
    asset,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
    userSummary: userData.summary,
    userAssetBalance: {
      ...userData.balanceByAsset[asset.symbol],
      inWallet: balances[asset.symbol],
    },
  })

  useEffect(() => {
    if (!assets || !userData) return
    if (typeof query.asset !== 'string') return
    const asset = assets.find((each) => each.symbol === query.asset)
    if (!asset) return
    replace(pathname, undefined, { shallow: true })
    openLoopingModal({ ...loopingParams(asset, userData), max: true })
  }, [userData, assets, query])

  return (
    <MakaiMarketsSection className={className}>
      <TableContainer>
        <MarketTable
          caption={t`Makai Markets`}
          columns={COLUMNS}
          rows={markets.map((asset) =>
            marketRow({
              asset,
              balance: balances[asset.symbol],
              onClick: userData
                ? () =>
                    openLoopingModal({
                      asset,
                      marketReferenceCurrencyPriceInUSD,
                      marketReferenceCurrencyDecimals,
                      userSummary: userData.summary,
                      userAssetBalance: {
                        ...userData.balanceByAsset[asset.symbol],
                        inWallet: balances[asset.symbol],
                      },
                    })
                : openWalletModal,
            }),
          )}
          hoverGradients={makaiHoverGradients}
          rowDisabledStyle={rowDisabledStyle}
        />
      </TableContainer>
    </MakaiMarketsSection>
  )
})``

const marketRow = ({
  asset,
  balance,
  onClick,
}: {
  asset: AssetMarketData
  balance: BigNumber
  onClick: VoidFunction
}) => {
  const {
    symbol,
    displaySymbol,
    icon,
    depositIncentiveAPR,
    variableBorrowIncentiveAPR,
    baseLTVasCollateral,
    usageAsCollateralEnabled,
    isDepositInactive,
    isBorrowInactive,
    borrowUnsupported,
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
  return {
    id: symbol,
    onClick,
    disabled:
      borrowUnsupported ||
      makaiUnsupported ||
      !usageAsCollateralEnabled ||
      isDepositInactive ||
      isBorrowInactive,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
      makaiAPR:
        borrowUnsupported || makaiUnsupported ? (
          'Coming soon'
        ) : !usageAsCollateralEnabled ||
          isDepositInactive ||
          isBorrowInactive ? (
          '-'
        ) : (
          <BlinkWrapper value={displayMakaiAPR}>{displayMakaiAPR}</BlinkWrapper>
        ),
      wallet: formatAmt(balance, { symbol: asset.symbol, decimalPlaces: 2 }),
    },
  }
}

const rowDisabledStyle = css`
  opacity: 0.32;
  pointer-events: none;
`

const MakaiMarketsSection = styled.section``
