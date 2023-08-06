import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber } from '@starlay-finance/math-utils'
import { FC, useEffect, useState } from 'react'
import { Link } from 'src/components/elements/Link'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { RatioControl } from 'src/components/parts/Modal/parts/RatioControl'
import { ASSETS_DICT } from 'src/constants/assets'
import { blue, darkRed, lightYellow, purple } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import { EstimationParam, estimateLooping } from 'src/utils/estimationHelper'
import {
  BN_ONE,
  BN_ZERO,
  formatAmt,
  formatAmtShort,
  formatPct,
  formattedToBigNumber,
} from 'src/utils/number'
import { DOCS_MAKAI } from 'src/utils/routes'
import styled from 'styled-components'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  NumberItems,
  Tab,
  TabFC,
} from '../../../Dashboard/modals/parts'

const TABS = ['loop', 'close'] as const
type TabType = typeof TABS[number]

export type LoopingModalBodyProps = Omit<EstimationParam, 'amount'> & {
  loop: (amount: BigNumber, leverage: BigNumber) => Promise<any>
  close: () => Promise<any>
  max?: boolean
}

export const LoopingModalBody: FC<LoopingModalBodyProps> = ({
  loop,
  close,
  max,
  ...estimationParams
}) => {
  const {
    asset,
    userSummary,
    userAssetBalance,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
  } = estimationParams
  const { symbol, displaySymbol, baseLTVasCollateral } = asset
  const { inWallet } = userAssetBalance
  const { healthFactor } = userSummary
  const [depositAmount, setDepositAmount] = useState('')

  const maxLeverage = BN_ONE.div(
    BN_ONE.minus(baseLTVasCollateral),
  ).decimalPlaces(2, BigNumber.ROUND_FLOOR)
  const [leverage, setLeverage] = useState<BigNumber>(maxLeverage)

  const estimation = estimateLooping({
    amount: formattedToBigNumber(depositAmount),
    asset,
    userSummary,
    userAssetBalance,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
    leverage,
  })
  const formatter = (num: BigNumber) =>
    formatPct(num, { shorteningThreshold: 99, decimalPlaces: 2 })
  useEffect(() => {
    if (max) setDepositAmount(formatAmt(estimation.maxAmount))
  }, [max])

  const [activeTab, setActiveTab] = useState<TabType>('loop')
  const isLooping = activeTab === 'loop'
  return (
    <ContentDiv>
      <AmountInput
        value={depositAmount}
        onChange={setDepositAmount}
        setMaxValue={() => setDepositAmount(formatAmt(estimation.maxAmount))}
        significantDigits={asset.decimals}
        disabled={!isLooping}
        hideValue={!isLooping}
      />
      <ActionTab
        tabs={TABS}
        contents={{
          loop: { label: t`Makai Loops` },
          close: { label: t`Close` },
        }}
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
      />
      <LoopingAction>
        {isLooping && (
          <NumberItems
            onPointerMove={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <RatioControl
              label={t`Leverage`}
              options={RATIO_LIST.concat({ value: maxLeverage.toNumber() })}
              setValue={setLeverage}
              current={leverage}
              max={maxLeverage}
              sliderColors={[blue, lightYellow, darkRed]}
              customLabel={t`Custom Leverage`}
            />
            <Note>
              <p>{t`"Makai Loops" is an experimental feature.`}</p>
              <Trans
                id="Please <0>read our docs</0> and understand how it works before using it."
                components={[<Link key={'0'} href={DOCS_MAKAI} />]}
              />
            </Note>
            <NumberItem
              label={t`Net APY`}
              num={estimation.depositAPY.minus(estimation.borrowAPY)}
              image={{ src: asset.icon, alt: asset.name }}
              format={formatter}
            />
            <NumberItem
              label={t`Reward APR`}
              num={estimation.rewardAPR}
              image={{ src: ASSETS_DICT.LAY.icon, alt: ASSETS_DICT.LAY.name }}
              format={formatter}
            />
            <NumberItem
              label={t`Estimated Net APY`}
              num={estimation.netAPY}
              format={formatter}
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
          </NumberItems>
        )}
        <Note>
          <p>{t`"Makai Loops" is an experimental feature.`}</p>
          <Trans
            id="Please <0>read our docs</0> and understand how it works before using it."
            components={[<Link key={'0'} href={DOCS_MAKAI} />]}
          />
        </Note>
        <SimpleCtaButton
          onClick={
            isLooping
              ? () =>
                  loop(formattedToBigNumber(depositAmount) || BN_ZERO, leverage)
              : close
          }
          disabled={
            isLooping &&
            (asset.symbol === 'aSEED' || !!estimation.unavailableReason)
          }
        >
          {isLooping
            ? asset.symbol === 'aSEED'
              ? t`Suspended`
              : estimation.unavailableReason || t`Start loops`
            : t`Close loops`}
        </SimpleCtaButton>
        {isLooping ? (
          <Balance
            label={t`Wallet Balance`}
            balance={inWallet}
            symbol={displaySymbol || symbol}
          />
        ) : (
          <Balance
            label={t`Borrowed`}
            balance={userAssetBalance.borrowed}
            symbol={displaySymbol || symbol}
          />
        )}
      </LoopingAction>
    </ContentDiv>
  )
}

const RATIO_LIST = [{ value: 1.5 }, { value: 2 }, { value: 3 }, { value: 4 }]

const ActionTab: TabFC = Tab

const Note = styled.p`
  padding-top: 24px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;
  a {
    color: ${purple};
  }
`

const LoopingAction = styled(Action)`
  ${NumberItems} {
    > ${Note} {
      margin-bottom: 16px;
    }
  }
  > ${Note} {
    display: none;
  }
  @media ${breakpoint.l} {
    ${NumberItems} {
      > ${Note} {
        display: none;
      }
    }
    > ${Note} {
      display: block;
    }
  }
`
