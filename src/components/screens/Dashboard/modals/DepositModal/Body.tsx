import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber } from '@starlay-finance/math-utils'
import debounce from 'debounce'
import { FC, useState } from 'react'
import { Link } from 'src/components/elements/Link'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { darkPurple, purple, trueWhite } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import {
  EstimationParam,
  estimateDeposit,
  estimateWithdrawal,
} from 'src/utils/estimationHelper'
import {
  formatAmt,
  formatAmtShort,
  formatPct,
  formatUSD,
  formattedToBigNumber,
} from 'src/utils/number'
import { DOCS_RISK } from 'src/utils/routes'
import styled from 'styled-components'
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
  withdraw: (amount: BigNumber, all?: boolean) => void
}
export const DepositModalBody: FC<DepositModalBodyProps> = ({
  deposit,
  withdraw,
  ...estimationParams
}) => {
  const { asset, userSummary, userAssetBalance } = estimationParams
  const {
    symbol,
    displaySymbol,
    depositAPY,
    depositIncentiveAPR,
    isDepositInactive,
  } = asset
  const { availableBorrowsInUSD, borrowLimitUsed, healthFactor } = userSummary
  const { inWallet, deposited } = userAssetBalance

  const [activeTab, setActiveTab] = useState<TabType>(
    !isDepositInactive ? 'deposit' : 'withdraw',
  )
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [all, setAll] = useState(false)

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
          setMaxValue={() => setDepositAmount(formatAmt(estimation.maxAmount))}
          significantDigits={asset.decimals}
          allLabel={t`All`}
        />
      ) : (
        <AmountInput
          value={withdrawalAmount}
          onChange={setWithdrawalAmount}
          setMaxValue={() =>
            setWithdrawalAmount(
              formatAmt(estimation.maxAmount, {
                decimalPlaces: asset.decimals,
                roundingMode: BigNumber.ROUND_FLOOR,
              }),
            )
          }
          significantDigits={asset.decimals}
          setAll={(all) => {
            setAll(all)
            if (all) setWithdrawalAmount(formatAmt(userAssetBalance.deposited))
          }}
          all={all}
          allLabel={t`All_Withdraw`}
        />
      )}
      <ActionTab
        tabs={TABS}
        contents={{
          deposit: { label: t`Deposit`, disabled: isDepositInactive },
          withdraw: { label: t`Withdraw` },
        }}
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
      />
      <Action>
        <NumberItems
          onPointerMove={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <NumberItem
            label={t`Deposit APY`}
            num={depositAPY}
            image={{ src: asset.icon, alt: asset.name }}
            format={formatPct}
          />
          {/* <NumberItem
            label={t`Deposit APR`}
            num={depositIncentiveAPR}
            image={{ src: ASSETS_DICT.DOT.icon, alt: ASSETS_DICT.DOT.name }}
            format={formatPct}
          /> */}
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
            current={healthFactor?.isPositive() ? healthFactor : undefined}
            after={
              !estimation.healthFactor
                ? undefined
                : estimation.healthFactor.isPositive()
                  ? estimation.healthFactor
                  : '-'
            }
            formatter={formatAmtShort}
          />
          {!asset.usageAsCollateralEnabled && (
            <NoCollateralMessage>
              <div />
              <p>
                <p>{t`This asset can't be used as collateral.`}</p>
                <Trans
                  id="For more information, please <0>see our docs</0>."
                  components={[<Link key="0" href={DOCS_RISK} />]}
                />
              </p>
            </NoCollateralMessage>
          )}
        </NumberItems>
        {activeTab === 'deposit' ? (
          <SimpleCtaButton
            onClick={debounce(() => deposit(depositAmountBn!), 2000, {
              immediate: true,
            })}
            disabled={!!estimation.unavailableReason}
          >
            {estimation.unavailableReason || t`Deposit`}
          </SimpleCtaButton>
        ) : (
          <SimpleCtaButton
            onClick={debounce(() => withdraw(withdrawalAmountBn!, all), 2000, { immediate: true })}
            disabled={!!estimation.unavailableReason}
          >
            {estimation.unavailableReason || t`Withdraw`}
          </SimpleCtaButton>
        )}
        {activeTab === 'deposit' ? (
          <Balance
            label={t`Wallet Balance`}
            balance={inWallet}
            symbol={displaySymbol || symbol}
          />
        ) : (
          <Balance
            label={t`Deposited`}
            balance={deposited}
            symbol={displaySymbol || symbol}
          />
        )}
      </Action>
    </ContentDiv>
  )
}

const NoCollateralMessage = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 214px;
  ${flexCenter};
  background-color: ${trueWhite};
  padding: 24px;
  > div {
    position: absolute;
    inset: 0;
    background-color: ${darkPurple}80;
  }
  p {
    position: relative;
    text-align: center;
    line-height: 1.5;
    a {
      text-decoration: underline;
      :hover {
        color: ${purple};
      }
    }
  }
`

const ActionTab: TabFC = Tab
