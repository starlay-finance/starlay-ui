import { t } from '@lingui/macro'
import { VFC } from 'react'
import { ItemLabel } from 'src/components/parts/Modal/parts'
import { Item } from 'src/components/parts/Modal/parts/Item'
import { Action } from 'src/components/screens/Dashboard/modals/parts'
import { trueBlack } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
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
      <Action>
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
          value={
            usageAsCollateralEnabled ? formatPct(baseLTVasCollateral) : '-'
          }
        />
        <Item
          label={t`Liquidation Threshold`}
          value={
            usageAsCollateralEnabled
              ? formatPct(reserveLiquidationThreshold)
              : '-'
          }
        />
        <Item
          label={t`Liquidation Penalty`}
          value={usageAsCollateralEnabled ? formatPct(liquidationPenalty) : '-'}
        />
      </Action>
    </ContentDiv>
  )

const ContentDiv = styled.div`
  ${ItemLabel} {
    font-size: 18px;
    font-weight: ${fontWeightSemiBold};
  }
  ${Item} {
    :last-child {
      border-bottom: none;
    }
    > div:last-child {
      color: ${trueBlack};
    }
  }
  ${Action} {
    padding: 8px 32px;
  }
`
