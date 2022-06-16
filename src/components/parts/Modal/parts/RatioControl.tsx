import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useEffect, useReducer } from 'react'
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
import { TooltipMessage } from '../../ToolTip'

type RatioControlProps = {
  setValue: (ratio: BigNumber) => void
  onCustomActive?: VoidFunction
  onCustomInactive?: VoidFunction
  formatCustomValue?: (ratio: BigNumber) => string
  current: BigNumber
  options: {
    label?: string
    value: number
  }[]
  min?: number
  max: BigNumber
  tooltip?: string
  step?: number
  label: string
  customLabel: string
  customButtonLabel?: string
  sliderColors: Color[]
  showValue?: boolean
  showValueOnCustom?: boolean
  disabled?: boolean
}

export const RatioControl = asStyled<RatioControlProps>(
  ({
    className,
    current,
    setValue,
    onCustomActive,
    onCustomInactive,
    options,
    min = 1,
    max,
    tooltip,
    label,
    customLabel,
    customButtonLabel = t`Custom`,
    sliderColors,
    showValue,
    showValueOnCustom = true,
    formatCustomValue,
    step = 0.01,
    disabled,
  }) => {
    const [isCustomActive, toggleCustomActive] = useReducer(
      (state: boolean) => !state,
      false,
    )
    useEffect(() => {
      if (!options.some(({ value }) => current.eq(value))) toggleCustomActive()
    }, [])
    return (
      <div className={className}>
        {!isCustomActive ? (
          <>
            <Label>
              {tooltip ? (
                <p>
                  <TooltipMessage
                    label={label}
                    message={tooltip}
                    position="left"
                  />
                </p>
              ) : (
                label
              )}
              {showValue && (
                <span>{formatAmt(current, { decimalPlaces: 2 })}x</span>
              )}
            </Label>
            <RatioOptions>
              {options
                .filter(({ value }) => value >= min && max.gte(value))
                .map(({ label, value }) => {
                  const checked = current.eq(value)
                  return (
                    <RatioCheckBox key={value} $checked={checked}>
                      <input
                        onClick={() => setValue(valueToBigNumber(value))}
                        disabled={disabled || max.lt(value)}
                      />
                      <span>{t({ id: label }) || `${value}x`}</span>
                    </RatioCheckBox>
                  )
                })}
              <CustomRatioButton
                onClick={() => {
                  toggleCustomActive()
                  onCustomActive && onCustomActive()
                }}
                $selected={!options.some(({ value }) => current.eq(value))}
                disabled={disabled}
              >
                {customButtonLabel}
              </CustomRatioButton>
            </RatioOptions>
          </>
        ) : (
          <RatioSlider>
            <Label>
              <button
                onClick={() => {
                  toggleCustomActive()
                  onCustomInactive && onCustomInactive()
                }}
                disabled={disabled}
              >
                {customLabel}
              </button>
              {formatCustomValue ? (
                <span>{formatCustomValue(current)}</span>
              ) : (
                showValueOnCustom && (
                  <span>{formatAmt(current, { decimalPlaces: 2 })}x</span>
                )
              )}
            </Label>
            <Barometer
              ratio={current.minus(BN_ONE).div(max.minus(BN_ONE)).toNumber()}
              colors={sliderColors}
              styles={{ barometer: barometerStyle, thumb: thumbStyle }}
              rangeInputProps={{
                min: 1,
                max: max.toNumber(),
                step,
                onChange: ({ target: { value } }) => {
                  if (+value < min) {
                    setValue(valueToBigNumber(min))
                    return
                  }
                  setValue(valueToBigNumber(value))
                },
                disabled,
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
    transition: all 0.2s ease-in;
    cursor: pointer;
    :hover {
      background-color: ${darkPurple};
    }
  }
`
const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    color: ${trueBlack};
  }
  p {
    display: flex;
    align-items: center;
    column-gap: 4px;
    :hover {
      color: #575757;
    }
    ${TooltipMessage} {
      width: 280px;
      margin-left: 10%;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
`

const RatioSlider = styled.div`
  *:disabled {
    cursor: not-allowed;
  }
  ${Barometer} {
    margin-top: 32px;
  }
  ${Label} {
    button {
      position: relative;
      padding-left: 32px;
      :enabled:hover {
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
