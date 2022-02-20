import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useState, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import {
  estimateDeposit,
  estimateWithdrawal,
  EstimationParam,
} from 'src/utils/calculator'
import {
  formatAmtShort,
  formatPct,
  formattedToBigNumber,
  formatUSD,
} from 'src/utils/number'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  NumberItems,
  Tab,
  TabFC,
} from '../parts'

const TABS = ['deposit', 'withdraw'] as const
type TabType = typeof TABS[number]

export type DepositModalBodyProps = Omit<EstimationParam, 'amount'> & {
  deposit: (amount: BigNumber) => void
  withdraw: (amount: BigNumber) => void
}
export const DepositModalBody: VFC<DepositModalBodyProps> = ({
  deposit,
  withdraw,
  ...estimationParams
}) => {
  const { asset, userSummary, userAssetStatus } = estimationParams
  const { symbol, depositAPY, depositIncentiveAPR, isFrozen } = asset
  const { availableBorrowsInUSD, borrowLimitUsed, healthFactor } = userSummary
  const { inWallet, deposited } = userAssetStatus

  const [activeTab, setActiveTab] = useState<TabType>(
    !isFrozen ? 'deposit' : 'withdraw',
  )
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')

  const depositAmountBn = formattedToBigNumber(depositAmount)
  const withdrawalAmountBn = formattedToBigNumber(withdrawalAmount)

  const estimation =
    activeTab === 'deposit'
      ? estimateDeposit({ amount: depositAmountBn, ...estimationParams })
      : estimateWithdrawal({ amount: withdrawalAmountBn, ...estimationParams })

  return (
    <ContentDiv>
      {activeTab === 'deposit' ? (
        <AmountInput
          value={depositAmount}
          onChange={setDepositAmount}
          setMaxValue={() => setDepositAmount(estimation.maxAmount.toString())}
          significantDigits={asset.decimals}
        />
      ) : (
        <AmountInput
          value={withdrawalAmount}
          onChange={setWithdrawalAmount}
          setMaxValue={() =>
            setWithdrawalAmount(estimation.maxAmount.toString())
          }
          significantDigits={asset.decimals}
        />
      )}
      <ActionTab
        tabs={TABS}
        contents={{
          deposit: { label: t`Deposit`, disabled: isFrozen },
          withdraw: { label: t`Withdraw` },
        }}
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
      />
      <Action>
        <NumberItems>
          <NumberItem
            label={t`Deposit APY`}
            num={depositAPY}
            image={{ src: asset.icon, alt: asset.name }}
            format={formatPct}
          />
          <NumberItem
            label={t`Deposit APR`}
            num={depositIncentiveAPR}
            image={{ src: ASSETS_DICT.LAY.icon, alt: ASSETS_DICT.LAY.name }}
            format={formatPct}
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
        {activeTab === 'deposit' ? (
          <SimpleCtaButton
            onClick={() => deposit(depositAmountBn!)}
            disabled={!!estimation.unavailableReason}
          >
            {estimation.unavailableReason || t`Deposit`}
          </SimpleCtaButton>
        ) : (
          <SimpleCtaButton
            onClick={() => withdraw(withdrawalAmountBn!)}
            disabled={!!estimation.unavailableReason}
          >
            {estimation.unavailableReason || t`Withdraw`}
          </SimpleCtaButton>
        )}
        {activeTab === 'deposit' ? (
          <Balance
            label={t`Wallet Balance`}
            balance={inWallet}
            symbol={symbol}
          />
        ) : (
          <Balance label={t`Deposited`} balance={deposited} symbol={symbol} />
        )}
      </Action>
    </ContentDiv>
  )
}

const ActionTab: TabFC = Tab
