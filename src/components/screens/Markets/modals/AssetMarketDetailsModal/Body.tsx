import { t } from '@lingui/macro'
import { VFC } from 'react'
import { Item } from 'src/components/parts/Modal/parts/Item'
import { trueBlack } from 'src/styles/colors'
import { AssetMarketData } from 'src/types/models'
import { formatPct } from 'src/utils/number'
import styled from 'styled-components'

export type AssetMarketDetailsModalBodyProps = {
  asset: AssetMarketData
}
export const AssetMarketDetailsModalBody: VFC<AssetMarketDetailsModalBodyProps> =
  ({
    asset: {
      borrowingEnabled,
      reserveFactor,
      usageAsCollateralEnabled,
      baseLTVasCollateral,
      reserveLiquidationThreshold,
      liquidationPenalty,
    },
  }) => (
    <ContentDiv>
      <Item label={t`Borrowing`} value={borrowingEnabled ? t`Yes` : t`No`} />
      <Item
        label={t`Reserve Factor`}
        value={borrowingEnabled ? formatPct(reserveFactor) : '-'}
      />
      <Item
        label={t`Used as Collateral `}
        value={usageAsCollateralEnabled ? t`Yes` : t`No`}
      />
      <Item
        label={t`Loan to Value`}
        value={usageAsCollateralEnabled ? formatPct(baseLTVasCollateral) : '-'}
      />
      <Item
        label={t`Liquidation Threshold`}
        value={
          reserveLiquidationThreshold
            ? formatPct(reserveLiquidationThreshold)
            : '-'
        }
      />
      <Item
        label={t`Liquidation Penalty`}
        value={
          reserveLiquidationThreshold ? formatPct(liquidationPenalty) : '-'
        }
      />
    </ContentDiv>
  )

const ContentDiv = styled.div`
  padding: 32px;
  color: ${trueBlack};
`
