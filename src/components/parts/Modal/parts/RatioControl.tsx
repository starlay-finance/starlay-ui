import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useReducer } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { Barometer } from 'src/components/parts/Chart/Barometer'
import {
  cream,
  darkPurple,
  purple,
  trueBlack,
  trueWhite,
} from 'src/styles/colors'
import { Color } from 'src/styles/types'
import { BN_ONE, formatAmt } from 'src/utils/number'
import styled, { css } from 'styled-components'

type RatioControlProps = {
  setValue: (ratio: BigNumber) => void
  current: BigNumber
  options: {
    label?: string
    value: number
  }[]
  max: BigNumber
  label: string
  customLabel: string
  sliderColors: Color[]
  showValue?: boolean
}

export const RatioControl = asStyled<RatioControlProps>(
  ({
    className,
    current,
    setValue,
    options,
    max,
    label,
    customLabel,
    sliderColors,
    showValue,
  }) => {
    const [isCustomActive, toggleCustomActive] = useReducer(
      (state: boolean) => !state,
      false,
    )
    return (
      <div className={className}>
        {!isCustomActive ? (
          <>
            <Label>
              <p>{label}</p>
              {showValue && (
                <span>{formatAmt(current, { decimalPlaces: 2 })}x</span>
              )}
            </Label>
            <RatioOptions>
              {options
                .filter(({ value }) => max.gte(value))
                .map(({ label, value }) => {
                  const checked = current.eq(value)
                  return (
                    <RatioCheckBox key={value} $checked={checked}>
                      <input
                        onClick={() => setValue(valueToBigNumber(value))}
                        disabled={max.lt(value)}
                      />
                      <span>{label || `${value}x`}</span>
                    </RatioCheckBox>
                  )
                })}
              <CustomRatioButton
                onClick={toggleCustomActive}
                $selected={!options.some(({ value }) => current.eq(value))}
              >{t`Custom`}</CustomRatioButton>
            </RatioOptions>
          </>
        ) : (
          <RatioSlider>
            <Label>
              <button onClick={toggleCustomActive}>{customLabel}</button>
              <span>{formatAmt(current, { decimalPlaces: 2 })}x</span>
            </Label>
            <Barometer
              ratio={current.minus(BN_ONE).div(max.minus(BN_ONE)).toNumber()}
              colors={sliderColors}
              styles={{ barometer: barometerStyle, thumb: thumbStyle }}
              rangeInputProps={{
                min: 1,
                max: max.toNumber(),
                step: 0.01,
                onChange: ({ target: { value } }) =>
                  setValue(valueToBigNumber(value)),
              }}
            />
          </RatioSlider>
        )}
      </div>
    )
  },
)`
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

const RatioCheckBox = styled.label<{
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

const CustomRatioButton = styled.button<{ $selected?: boolean }>`
  ${({ $selected }) =>
    $selected &&
    css`
      &&& {
        background-color: ${darkPurple};
      }
    `}
`

const RatioOptions = styled.div`
  margin: 16px 0;
  display: flex;
  column-gap: 8px;
  color: ${trueWhite};
  ${RatioCheckBox},
  ${CustomRatioButton} {
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
const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${trueBlack};
  }
`

const RatioSlider = styled.div`
  ${Barometer} {
    margin-top: 32px;
  }
  ${Label} {
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
