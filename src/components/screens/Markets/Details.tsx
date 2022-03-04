import { t } from '@lingui/macro'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useMarketData } from 'src/hooks/useMarketData'
import { AssetMarketData } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { formatPct, formatUSDShort } from 'src/utils/number'
import styled from 'styled-components'

const DETAILS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'totalDeposited', name: t`Total Deposited`, widthRatio: 2 },
  { id: 'depositAPY', name: t`APY_Deposit`, widthRatio: 2 },
  { id: 'depositAPR', name: t`Deposit Reward APR`, widthRatio: 3 },
  { id: 'totalBorrowed', name: t`Total Borrowed`, widthRatio: 2 },
  { id: 'borrowAPY', name: t`APY_Borrow`, widthRatio: 2 },
  { id: 'borrowAPR', name: t`Borrow Reward APR`, widthRatio: 3 },
]

export const Details = asStyled(({ className }) => {
  const { data: marketData } = useMarketData()
  const markets = (marketData?.assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)
  return (
    <DetailsSection className={className}>
      <TableContainer>
        <MarketTable
          caption={t`Markets`}
          columns={DETAILS_COLUMNS}
          rows={markets.map(detailsRow)}
        />
      </TableContainer>
    </DetailsSection>
  )
})``

const detailsRow = (asset: AssetMarketData) => {
  const {
    symbol,
    icon,
    name,
    liquidityInUSD,
    depositAPY,
    depositIncentiveAPR,
    borrowUnsupported,
    totalBorrowedInUSD,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
  } = asset
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      totalDeposited: formatUSDShort(liquidityInUSD.plus(totalBorrowedInUSD)),
      depositAPY: formatPct(depositAPY),
      depositAPR: formatPct(depositIncentiveAPR),
      totalBorrowed: borrowUnsupported
        ? 'Coming soon'
        : formatUSDShort(totalBorrowedInUSD),
      borrowAPY: borrowUnsupported ? '-' : formatPct(variableBorrowAPY),
      borrowAPR: borrowUnsupported
        ? '-'
        : formatPct(variableBorrowIncentiveAPR),
    },
  }
}

const DetailsSection = styled.section``
