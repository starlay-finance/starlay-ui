import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { FC, useState } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import {
  EstimationParam,
  estimateBorrow,
  estimateRepayment,
} from 'src/utils/estimationHelper'
import {
  formatAmt,
  formatAmtShort,
  formatPct,
  formatUSD,
  formattedToBigNumber,
} from 'src/utils/number'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  Note,
  NumberItems,
  Tab,
  TabFC,
} from '../parts'

const TABS = ['borrow', 'repay'] as const
type TabType = typeof TABS[number]

export type BorrowModalBodyProps = Omit<EstimationParam, 'amount'> & {
  borrow: (amount: BigNumber) => void
  repay: (amount: BigNumber, all?: boolean) => void
}
export const BorrowModalBody: FC<BorrowModalBodyProps> = ({
  borrow,
  repay,
  ...estimationParams
}) => {
  const { asset, userSummary, userAssetBalance } = estimationParams
  const {
    symbol,
    displaySymbol,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
    liquidity,
    borrowingEnabled,
    isFrozen,
    decimals,
    icon,
    name,
  } = asset
  const { totalBorrowedInUSD, borrowLimitUsed, healthFactor } = userSummary
  const { borrowed } = userAssetBalance

  const borrowable = borrowingEnabled && !isFrozen
  const [activeTab, setActiveTab] = useState<TabType>(
    borrowable ? 'borrow' : 'repay',
  )
  const [borrowingAmount, setBorrowingAmount] = useState('')
  const [repaymentAmount, setRepaymentAmount] = useState('')
  const [all, setAll] = useState(false)

  const borrowingAmountBn = formattedToBigNumber(borrowingAmount)
  const repaymentAmountBn = formattedToBigNumber(repaymentAmount)

  const estimation =
    activeTab === 'repay'
      ? estimateRepayment({ amount: repaymentAmountBn, ...estimationParams })
      : estimateBorrow({ amount: borrowingAmountBn, ...estimationParams })

  return (
    <ContentDiv>
      {activeTab === 'borrow' ? (
        <AmountInput
          value={borrowingAmount}
          onChange={setBorrowingAmount}
          setMaxValue={() =>
            setBorrowingAmount(
              formatAmt(estimation.maxAmount, {
                decimalPlaces: decimals,
                roundingMode: BigNumber.ROUND_FLOOR,
              }),
            )
          }
          significantDigits={decimals}
          allLabel={t`All`}
        />
      ) : (
        <AmountInput
          value={repaymentAmount}
          onChange={setRepaymentAmount}
          setMaxValue={() =>
            setRepaymentAmount(formatAmt(estimation.maxAmount))
          }
          significantDigits={decimals}
          setAll={(all: boolean) => {
            setAll(all)
            if (all) setRepaymentAmount(formatAmt(userAssetBalance.borrowed))
          }}
          all={all}
          allLabel={t`All_Repay`}
        />
      )}
      <ActionTab
        tabs={TABS}
        contents={{
          borrow: { label: t`Borrow`, disabled: !borrowable },
          repay: { label: t`Repay` },
        }}
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
      />
      <Action>
        <NumberItems>
          <NumberItem
            label={t`Borrow APY`}
            num={variableBorrowAPY}
            image={{ src: icon, alt: name }}
            format={formatPct}
          />
          <NumberItem
            label={t`Borrow APR`}
            num={variableBorrowIncentiveAPR}
            image={{ src: ASSETS_DICT.LAY.icon, alt: ASSETS_DICT.LAY.name }}
            format={formatPct}
          />
          <NumberItemWithDiff
            label={t`Borrowed`}
            current={totalBorrowedInUSD}
            after={estimation.totalBorrowedInUSD}
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
        {all && (
          <Note>
            {t`To repay all, you will pay more than the amount shown because of the interest charged per second.`}
          </Note>
        )}
        {activeTab === 'borrow' ? (
          <SimpleCtaButton
            onClick={() => borrow(valueToBigNumber(borrowingAmountBn!))}
            disabled={
              asset.symbol === 'aSEED' || !!estimation.unavailableReason
            }
          >
            {asset.symbol === 'aSEED'
              ? t`Suspended`
              : estimation.unavailableReason || t`Borrow`}
          </SimpleCtaButton>
        ) : (
          <SimpleCtaButton
            onClick={() => repay(valueToBigNumber(repaymentAmountBn!), all)}
            disabled={!!estimation.unavailableReason}
          >
            {estimation.unavailableReason || t`Repay`}
          </SimpleCtaButton>
        )}
        {activeTab === 'borrow' ? (
          <Balance
            label={t`Liquidity`}
            balance={liquidity}
            symbol={displaySymbol || symbol}
          />
        ) : (
          <Balance
            label={t`Borrowed`}
            balance={borrowed}
            symbol={displaySymbol || symbol}
          />
        )}
      </Action>
    </ContentDiv>
  )
}

const ActionTab: TabFC = Tab
