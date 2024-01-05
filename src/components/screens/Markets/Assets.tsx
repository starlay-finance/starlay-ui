import { t } from '@lingui/macro'
import { FC } from 'react'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import {
  PercentageChange,
  PercentageChangeProps,
} from 'src/components/parts/Number/PercentageChange'
import { useMarketData } from 'src/hooks/useMarketData'
import { useMarketDataSnapshot } from 'src/hooks/useMarketData/useMarketDataSnaphost'
import { useUserData } from 'src/hooks/useUserData'
import { darkRed, lightBlack, skyBlue } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { AssetMarketData, User } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatPct, formatUSDShort } from 'src/utils/number'
import styled from 'styled-components'
import { useAssetMarketDetailsModal } from './modals/AssetMarketDetailsModal'

const DETAILS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 2 },
  { id: 'totalDeposited', name: t`Total Deposited`, widthRatio: 2 },
  { id: 'depositAPY', name: t`Deposit APY`, widthRatio: 2 },
  // { id: 'depositAPR', name: t`Deposit Reward APR`, widthRatio: 3 },
  { id: 'totalBorrowed', name: t`Total Borrowed`, widthRatio: 2 },
  { id: 'borrowAPY', name: t`Borrow APY`, widthRatio: 2 },
  // { id: 'borrowAPR', name: t`Borrow Reward APR`, widthRatio: 3 },
]

export const Assets = asStyled(({ className }) => {
  const { data: marketData } = useMarketData()
  const { data: user } = useUserData()
  const { data: marketDataSnapshot } = useMarketDataSnapshot()
  const { assets, marketReferenceCurrencyPriceInUSD } = marketData || {}
  const markets = (assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)
  const { open } = useAssetMarketDetailsModal()
  return (
    <DetailsSection className={className}>
      <AssetsTableContainer>
        <MarketTable
          caption={t`Markets`}
          columns={DETAILS_COLUMNS}
          rows={markets.map((asset) =>
            detailsRow({
              asset,
              user,
              snapshot: marketDataSnapshot?.assets.find(
                (each) => each.symbol === asset.symbol,
              ),
              onClick: () => open({ asset, marketReferenceCurrencyPriceInUSD }),
            }),
          ).filter((row) => {
            if (row.isDepositInactive) {
              return row.hasPositionDeposited
            } else if (row.isBorrowInactive) {
              return row.hasPositionBorrowed
            }
            return true
          })}
          hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
        />
      </AssetsTableContainer>
    </DetailsSection>
  )
})``

const AssetsTableContainer = styled(TableContainer)`
  overflow-x: auto;
  table {
    min-width: 560px;
    caption,
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
      background-color: ${lightBlack};
    }
    caption {
      width: fit-content;
      background-color: unset;
    }
  }
`

const detailsRow = ({
  asset,
  user,
  snapshot = {},
  onClick,
}: {
  asset: AssetMarketData
  user: User | undefined
  snapshot?: Partial<AssetMarketData>
  onClick: VoidFunction
}) => {
  const {
    symbol,
    displaySymbol,
    icon,
    depositAPY,
    depositIncentiveAPR,
    totalDepositedInUSD,
    borrowUnsupported,
    totalBorrowedInUSD,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
    isBorrowInactive,
    isDepositInactive
  } = asset
  return {
    id: symbol,
    hasPositionDeposited: user?.balanceByAsset[asset.symbol].deposited.gt(BN_ZERO),
    hasPositionBorrowed:
      user?.balanceByAsset[asset.symbol].borrowed.gt(BN_ZERO),
    onClick,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
      totalDeposited: (
        <ValueWithPercentageChange
          value={formatUSDShort(totalDepositedInUSD)}
          current={totalDepositedInUSD}
          previous={snapshot.totalDepositedInUSD}
        />
      ),
      depositAPY: (
        <ValueWithPercentageChange
          value={formatPct(depositAPY)}
          current={depositAPY}
          previous={snapshot.depositAPY}
          isPercentage
        />
      ),
      // depositAPR: (
      //   <ValueWithPercentageChange
      //     value={formatPct(depositIncentiveAPR)}
      //     current={depositIncentiveAPR}
      //     previous={snapshot.depositIncentiveAPR}
      //     isPercentage
      //   />
      // ),
      totalBorrowed: borrowUnsupported ? (
        'Coming soon'
      ) : (
        <ValueWithPercentageChange
          value={formatUSDShort(totalBorrowedInUSD)}
          current={totalBorrowedInUSD}
          previous={snapshot.totalBorrowedInUSD}
        />
      ),
      borrowAPY: borrowUnsupported ? (
        '-'
      ) : (
        <ValueWithPercentageChange
          value={formatPct(variableBorrowAPY)}
          current={variableBorrowAPY}
          previous={snapshot.variableBorrowAPY}
          isPercentage
        />
      ),
      // borrowAPR: borrowUnsupported ? (
      //   '-'
      // ) : (
      //   <ValueWithPercentageChange
      //     value={formatPct(variableBorrowIncentiveAPR)}
      //     current={variableBorrowIncentiveAPR}
      //     previous={snapshot.variableBorrowIncentiveAPR}
      //     isPercentage
      //   />
      // ),
    },
    isBorrowInactive,
    isDepositInactive
  }
}

const ValueWithPercentageChange: FC<{ value: string } & PercentageChangeProps> =
  ({ value, ...props }) => {
    return (
      <ValuesTd>
        {value}
        <PercentageChange {...props} />
      </ValuesTd>
    )
  }
const ValuesTd = styled.div`
  display: flex;
  flex-direction: column;
  ${PercentageChange} {
    font-size: 12px;
    font-weight: ${fontWeightMedium};
  }
  @media ${breakpoint.xl} {
    font-size: 14px;
  }
`

const DetailsSection = styled.section``
