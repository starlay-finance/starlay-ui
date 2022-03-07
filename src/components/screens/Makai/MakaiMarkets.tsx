import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
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
import { darkRed } from 'src/styles/colors'
import { AssetMarketData } from 'src/types/models'
import { calculateLoopingAPR } from 'src/utils/calculator'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'
import { useLoopingModal } from './modals/LoopingModal'

const COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 1 },
  { id: 'makaiAPR', name: t`Makai APR`, widthRatio: 1 },
  { id: 'wallet', name: t`Wallet_Balance`, widthRatio: 1 },
]

export const MakaiMarkets = asStyled(({ className }) => {
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
          hoverColor={darkRed}
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
    icon,
    name,
    depositIncentiveAPR,
    variableBorrowIncentiveAPR,
    baseLTVasCollateral,
    usageAsCollateralEnabled,
    isFrozen,
    borrowUnsupported,
  } = asset
  const makaiAPR = calculateLoopingAPR({
    ltv: baseLTVasCollateral,
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
    disabled: borrowUnsupported || !usageAsCollateralEnabled || isFrozen,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      makaiAPR: borrowUnsupported ? (
        'Coming soon'
      ) : !usageAsCollateralEnabled || isFrozen ? (
        '-'
      ) : (
        <BlinkWrapper value={displayMakaiAPR}>{displayMakaiAPR}</BlinkWrapper>
      ),
      wallet: formatAmt(balance, { symbol: asset.symbol }),
    },
  }
}

const rowDisabledStyle = css`
  opacity: 0.32;
  pointer-events: none;
`

const MakaiMarketsSection = styled.section``
