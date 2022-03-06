import { t } from '@lingui/macro'
import { VFC } from 'react'
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
import { darkRed, skyBlue } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { AssetMarketData } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { formatPct, formatUSDShort } from 'src/utils/number'
import styled from 'styled-components'
import { useAssetMarketDetailsModal } from './modals/AssetMarketDetailsModal'

const DETAILS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'totalDeposited', name: t`Total Deposited`, widthRatio: 2 },
  { id: 'depositAPY', name: t`Deposit APY`, widthRatio: 2 },
  { id: 'depositAPR', name: t`Deposit Reward APR`, widthRatio: 3 },
  { id: 'totalBorrowed', name: t`Total Borrowed`, widthRatio: 2 },
  { id: 'borrowAPY', name: t`Borrow APY`, widthRatio: 2 },
  { id: 'borrowAPR', name: t`Borrow Reward APR`, widthRatio: 3 },
]

export const Assets = asStyled(({ className }) => {
  const { data: marketData } = useMarketData()
  const { data: marketDataSnapshot, error } = useMarketDataSnapshot()
  const markets = (marketData?.assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)
  const { open } = useAssetMarketDetailsModal()
  return (
    <DetailsSection className={className}>
      <TableContainer>
        <MarketTable
          caption={t`Markets`}
          columns={DETAILS_COLUMNS}
          rows={markets.map((asset) =>
            detailsRow({
              asset,
              snapshot: marketDataSnapshot?.assets.find(
                (each) => each.symbol === asset.symbol,
              ),
              onClick: () => open({ asset }),
            }),
          )}
          hoverGradient={`${darkRed}3d,${skyBlue}3d,${darkRed}3d`}
        />
      </TableContainer>
    </DetailsSection>
  )
})``

const detailsRow = ({
  asset,
  snapshot = {},
  onClick,
}: {
  asset: AssetMarketData
  snapshot?: Partial<AssetMarketData>
  onClick: VoidFunction
}) => {
  const {
    symbol,
    icon,
    name,
    liquidityInUSD,
    depositAPY,
    depositIncentiveAPR,
    totalDepositedInUSD,
    borrowUnsupported,
    totalBorrowedInUSD,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
  } = asset
  return {
    id: symbol,
    onClick,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
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
      depositAPR: (
        <ValueWithPercentageChange
          value={formatPct(depositIncentiveAPR)}
          current={depositIncentiveAPR}
          previous={snapshot.depositIncentiveAPR}
          isPercentage
        />
      ),
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
      borrowAPR: borrowUnsupported ? (
        '-'
      ) : (
        <ValueWithPercentageChange
          value={formatPct(variableBorrowIncentiveAPR)}
          current={variableBorrowIncentiveAPR}
          previous={snapshot.variableBorrowIncentiveAPR}
          isPercentage
        />
      ),
    },
  }
}

const ValueWithPercentageChange: VFC<
  { value: string } & PercentageChangeProps
> = ({ value, ...props }) => {
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
    font-size: 14px;
    font-weight: ${fontWeightMedium};
  }
`

const DetailsSection = styled.section``
