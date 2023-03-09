import { t } from '@lingui/macro'
import { FC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { NumberItemWithDiff } from 'src/components/parts/Modal/parts'
import { ItemWithDiff } from 'src/components/parts/Modal/parts/Item'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { convertToUSD } from 'src/utils/calculator'
import {
  estimateUsageAsCollateral,
  EstimationParam,
} from 'src/utils/estimationHelper'
import { formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { Action, Balance, ContentDiv, NumberItems, Tab, TabFC } from '../parts'

const TABS = ['collateral'] as const

export type CollateralModalBodyProps = Omit<EstimationParam, 'amount'> & {
  setUsageAsCollateral: (
    enabled: boolean,
  ) => Promise<{ error: number } | undefined>
}

export const CollateralModalBody: FC<CollateralModalBodyProps> = ({
  setUsageAsCollateral,
  ...estimationParams
}) => {
  const {
    asset: { priceInMarketReferenceCurrency, symbol, displaySymbol },
    userAssetBalance: { deposited, usageAsCollateralEnabled },
    userSummary,
    marketReferenceCurrencyPriceInUSD,
  } = estimationParams
  const {
    totalCollateralInMarketReferenceCurrency,
    availableBorrowsInUSD,
    borrowLimitUsed,
    healthFactor,
  } = userSummary

  const estimation = estimateUsageAsCollateral({
    ...estimationParams,
    usageAsCollateralEnabled: !usageAsCollateralEnabled,
  })

  const totalCollateralInUSD =
    totalCollateralInMarketReferenceCurrency.multipliedBy(
      marketReferenceCurrencyPriceInUSD,
    )
  const assetCollateralInUSD = convertToUSD(
    priceInMarketReferenceCurrency,
    marketReferenceCurrencyPriceInUSD,
    deposited,
  )
  return (
    <ContentDiv>
      <CollateralItemDiff
        current={usageAsCollateralEnabled ? t`ON` : t`OFF`}
        after={usageAsCollateralEnabled ? t`OFF` : t`ON`}
      />
      <ActionTab
        tabs={TABS}
        contents={{ collateral: { label: t`Collateral_Config` } }}
        activeTab="collateral"
        onChangeActiveTab={() => {}}
      />
      <Action>
        <NumberItems>
          <NumberItemWithDiff
            label={t`Collateral_Amount`}
            current={totalCollateralInUSD}
            after={totalCollateralInUSD.plus(
              usageAsCollateralEnabled
                ? assetCollateralInUSD.negated()
                : assetCollateralInUSD,
            )}
            formatter={formatUSD}
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
          {estimation.unavailableReason ||
            (usageAsCollateralEnabled ? t`Disable` : t`Enable`)}
        </SimpleCtaButton>
        <Balance
          label={t`Deposited`}
          balance={deposited}
          symbol={displaySymbol || symbol}
        />
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
