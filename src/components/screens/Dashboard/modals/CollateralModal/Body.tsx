import { t } from '@lingui/macro'
import { VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { ItemWithDiff } from 'src/components/parts/Modal/parts/Item'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import {
  estimateUsageAsCollateral,
  EstimationParam,
} from 'src/utils/estimationHelper'
import { formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { Action, ContentDiv, NumberItems, Tab, TabFC } from '../parts'

const TABS = ['collateral'] as const

export type CollateralModalBodyProps = Omit<EstimationParam, 'amount'> & {
  setUsageAsCollateral: (enabled: boolean) => Promise<void>
}

export const CollateralModalBody: VFC<CollateralModalBodyProps> = ({
  setUsageAsCollateral,
  ...estimationParams
}) => {
  const {
    asset: { priceInMarketReferenceCurrency },
    userSummary,
    userAssetBalance: { deposited, usageAsCollateralEnabled },
  } = estimationParams
  const { availableBorrowsInUSD, borrowLimitUsed, healthFactor } = userSummary

  const estimation = estimateUsageAsCollateral({
    ...estimationParams,
    usageAsCollateralEnabled: !usageAsCollateralEnabled,
  })

  return (
    <ContentDiv>
      <CollateralItemDiff
        current={usageAsCollateralEnabled ? t`ON` : t`OFF`}
        after={usageAsCollateralEnabled ? t`OFF` : t`ON`}
      />
      <ActionTab
        tabs={TABS}
        contents={{ collateral: { label: t`Collateral` } }}
        activeTab="collateral"
        onChangeActiveTab={() => {}}
      />
      <Action>
        <NumberItems>
          <NumberItem
            label={t`Deposited`}
            num={deposited.multipliedBy(priceInMarketReferenceCurrency)}
            format={formatUSD}
          />
          <NumberItemWithDiff
            label={t`Borrow Available`}
            current={availableBorrowsInUSD}
            after={estimation.availableBorrowsInUSD}
            formatter={formatUSD}
          />
          <NumberItemWithDiff
            label={t`Borrow Limit Used`}
            current={borrowLimitUsed}
            after={estimation.borrowLimitUsed}
            formatter={formatPct}
          />
          <NumberItemWithDiff
            label={t`Health Factor`}
            current={healthFactor.isPositive() ? healthFactor : undefined}
            after={
              !estimation.healthFactor
                ? undefined
                : estimation.healthFactor.isPositive()
                ? estimation.healthFactor
                : '-'
            }
            formatter={formatAmtShort}
          />
        </NumberItems>
        <SimpleCtaButton
          onClick={() => setUsageAsCollateral(!usageAsCollateralEnabled)}
          disabled={!!estimation.unavailableReason}
        >
          {estimation.unavailableReason || usageAsCollateralEnabled
            ? t`Disable`
            : t`Enable`}
        </SimpleCtaButton>
      </Action>
    </ContentDiv>
  )
}

const CollateralItemDiff = styled(ItemWithDiff)`
  border-bottom: none;
  font-size: 32px;
  font-weight: ${fontWeightSemiBold};
  ${flexCenter};
  > div {
    column-gap: 48px;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`

const ActionTab: TabFC = Tab
