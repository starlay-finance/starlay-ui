import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useState, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import {
  estimateBorrow,
  estimateRepayment,
  EstimationParam,
} from 'src/utils/calculator'
import { formatPct, formattedToBigNumber, formatUSD } from 'src/utils/number'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  NumberItems,
  Tab,
  TabFC,
} from '../parts'

const TABS = ['borrow', 'repay'] as const
type TabType = typeof TABS[number]

export type BorrowModalBodyProps = Omit<EstimationParam, 'amount'> & {
  borrow: (amount: BigNumber) => void
  repay: (amount: BigNumber) => void
}
export const BorrowModalBody: VFC<BorrowModalBodyProps> = ({
  borrow,
  repay,
  ...estimationParams
}) => {
  const { asset, userSummary, userAssetStatus } = estimationParams
  const {
    symbol,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
    borrowingEnabled,
    isFrozen,
    decimals,
    icon,
    name,
  } = asset
  const { totalBorrowedInUSD, borrowLimitUsed } = userSummary
  const { inWallet, borrowed } = userAssetStatus

  const borrowable = borrowingEnabled && !isFrozen
  const [activeTab, setActiveTab] = useState<TabType>(
    borrowable ? 'borrow' : 'repay',
  )
  const [borrowingAmount, setBorrowingAmount] = useState('')
  const [repaymentAmount, setRepaymentAmount] = useState('')

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
            setBorrowingAmount(estimation.maxAmount.toString())
          }
          significantDigits={decimals}
        />
      ) : (
        <AmountInput
          value={repaymentAmount}
          onChange={setRepaymentAmount}
          setMaxValue={() =>
            setRepaymentAmount(estimation.maxAmount.toString())
          }
          significantDigits={decimals}
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
        </NumberItems>
        {activeTab === 'borrow' ? (
          <SimpleCtaButton
            onClick={() => borrow(valueToBigNumber(borrowingAmountBn!))}
            disabled={!estimation.isAvailable}
          >
            {estimation.isAvailable ? t`Borrow` : t`Borrowing limit reached`}
          </SimpleCtaButton>
        ) : (
          <SimpleCtaButton
            onClick={() => repay(valueToBigNumber(repaymentAmountBn!))}
            disabled={!estimation.isAvailable}
          >
            {estimation.isAvailable ? t`Repay` : t`No balance to repay`}
          </SimpleCtaButton>
        )}
        {activeTab === 'borrow' ? (
          <Balance label={t`Borrowed`} balance={borrowed} symbol={symbol} />
        ) : (
          <Balance
            label={t`Wallet Balance`}
            balance={inWallet}
            symbol={symbol}
          />
        )}
      </Action>
    </ContentDiv>
  )
}

const ActionTab: TabFC = Tab
