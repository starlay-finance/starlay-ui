import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import Link from 'next/link'
import { useReducer, useState, VFC } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { Barometer } from 'src/components/parts/Chart/Barometer'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import {
  NumberItem,
  NumberItemWithDiff,
} from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import {
  blue,
  cream,
  darkPurple,
  darkRed,
  lightYellow,
  purple,
  trueBlack,
  trueWhite,
} from 'src/styles/colors'
import { ltvToLoopingLeverage } from 'src/utils/calculator'
import { estimateLooping, EstimationParam } from 'src/utils/estimationHelper'
import {
  BN_ONE,
  BN_ZERO,
  formatAmt,
  formatAmtShort,
  formatPct,
  formattedToBigNumber,
} from 'src/utils/number'
import { DOCS_MAKAI } from 'src/utils/routes'
import styled, { css } from 'styled-components'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  NumberItems,
  Tab,
  TabFC,
} from '../../../Dashboard/modals/parts'

const TABS = ['loop'] as const

export type LoopingModalBodyProps = Omit<EstimationParam, 'amount'> & {
  loop: (amount: BigNumber, leverage: BigNumber) => Promise<any>
}

export const LoopingModalBody: VFC<LoopingModalBodyProps> = ({
  loop,
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
  const [leverage, setLeverage] = useState<BigNumber>(
    initialLeverage(ltvToLoopingLeverage(asset.baseLTVasCollateral)),
  )
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
  return (
    <ContentDiv>
      <AmountInput
        value={depositAmount}
        onChange={setDepositAmount}
        setMaxValue={() => setDepositAmount(formatAmt(estimation.maxAmount))}
        significantDigits={asset.decimals}
      />
      <ActionTab
        tabs={TABS}
        contents={{ loop: { label: t`Makai Loops` } }}
        activeTab="loop"
        onChangeActiveTab={() => {}}
      />
      <Action>
        <NumberItems>
          <Leverage
            setLeverage={setLeverage}
            current={leverage}
            max={BN_ONE.div(BN_ONE.minus(baseLTVasCollateral))}
          />
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
        <Note>
          <p>{t`"Makai Loops" is an experimental feature.`}</p>
          <Trans
            id="Please <0>read our docs</0> and understand how it works before use."
            components={[<Link key={'0'} href={DOCS_MAKAI} />]}
          />
        </Note>
        <SimpleCtaButton
          onClick={() =>
            loop(formattedToBigNumber(depositAmount) || BN_ZERO, leverage)
          }
          disabled={!!estimation.unavailableReason}
        >
          {estimation.unavailableReason || t`Start loops`}
        </SimpleCtaButton>
        <Balance
          label={t`Wallet Balance`}
          balance={inWallet}
          symbol={displaySymbol || symbol}
        />
      </Action>
    </ContentDiv>
  )
}

const RATIO_LIST = [1.5, 2, 3, 4, 5] as const

const initialLeverage = (max: BigNumber) => {
  const numMax = max.toNumber()
  const leverage = RATIO_LIST.reduce((prev, current) => {
    if (numMax >= current) return current
    return prev
  }, 1)
  return valueToBigNumber(leverage)
}

const Leverage = asStyled<{
  setLeverage: (ratio: BigNumber) => void
  current: BigNumber
  max: BigNumber
}>(({ className, current, setLeverage, max }) => {
  const [isCustomActive, toggleCustomActive] = useReducer(
    (state: boolean) => !state,
    false,
  )
  return (
    <div className={className}>
      {!isCustomActive ? (
        <>
          <p>{t`Leverage`}</p>
          <LeverageControl>
            {RATIO_LIST.filter((ratio) => max.gte(ratio)).map((ratio) => {
              const checked = current.eq(ratio)
              return (
                <LeverageCheckBox key={ratio} $checked={checked}>
                  <input
                    onClick={() => setLeverage(valueToBigNumber(ratio))}
                    disabled={max.lt(ratio)}
                  />
                  <span>{ratio}x</span>
                </LeverageCheckBox>
              )
            })}
            <CustomLeverageButton
              onClick={toggleCustomActive}
              $selected={!RATIO_LIST.some((ratio) => current.eq(ratio))}
            >{t`Custom`}</CustomLeverageButton>
          </LeverageControl>
        </>
      ) : (
        <LeverageSlider>
          <div>
            <button onClick={toggleCustomActive}>{t`Custom Leverage`}</button>
            <span>{formatAmt(current, { decimalPlaces: 2 })}x</span>
          </div>
          <Barometer
            ratio={current.minus(BN_ONE).div(max.minus(BN_ONE)).toNumber()}
            colors={[blue, lightYellow, darkRed]}
            styles={{ barometer: barometerStyle, thumb: thumbStyle }}
            rangeInputProps={{
              min: 1,
              max: max.toNumber(),
              step: 0.01,
              onChange: ({ target: { value } }) => {
                setLeverage(valueToBigNumber(value))
              },
            }}
          />
        </LeverageSlider>
      )}
    </div>
  )
})`
  margin-top: 24px;
  height: 96px;
  border-bottom: 1px solid ${trueBlack}3a;
`
const barometerStyle = css`
  height: 4px;
`
const thumbStyle = css`
  border: 4px solid ${cream};
  width: 20px;
  height: 20px;
`

const LeverageCheckBox = styled.label<{
  $checked: boolean
}>`
  ${({ $checked }) =>
    $checked &&
    css`
      &&& {
        background-color: ${darkPurple};
      }
    `}
`

const CustomLeverageButton = styled.button<{ $selected?: boolean }>`
  ${({ $selected }) =>
    $selected &&
    css`
      &&& {
        background-color: ${darkPurple};
      }
    `}
`

const LeverageControl = styled.div`
  margin: 16px 0;
  display: flex;
  column-gap: 8px;
  color: ${trueWhite};
  ${LeverageCheckBox},
  ${CustomLeverageButton} {
    input {
      width: 0;
    }
    padding: 8px 12px 6px;
    border-radius: 8px;
    background-color: ${darkPurple}7a;
    cursor: pointer;
    transition: all 0.2s ease-in;
    :hover {
      background-color: ${darkPurple};
    }
  }
`

const LeverageSlider = styled.div`
  ${Barometer} {
    margin-top: 32px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${trueBlack};
    }
    button {
      position: relative;
      padding-left: 32px;
      :hover {
        color: ${purple}80;
        ::after {
          opacity: 0.5;
        }
      }
      ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        border-radius: 8px;
        border: 2px solid ${darkPurple}7a;
        background: radial-gradient(${purple}00, ${purple}3d);
      }
      ::after {
        content: '';
        position: absolute;
        left: 0;
        width: 10px;
        height: 10px;
        margin: 6px;
        border-radius: 50%;
        background: ${purple};
      }
    }
  }
`

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
