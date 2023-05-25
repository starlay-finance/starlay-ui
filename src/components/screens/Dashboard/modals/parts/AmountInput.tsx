import { t } from '@lingui/macro'
import { asStyled } from 'src/components/hoc/asStyled'
import { ScalingInput } from 'src/components/parts/Input'
import { offWhite, trueBlack } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { parseInput } from 'src/utils/number'
import styled from 'styled-components'

type AmountInputProps = {
  value: string
  onChange: (value: string) => void
  setMaxValue: VoidFunction
  significantDigits: number
  maxLabel?: string
  setAll?: (all: boolean) => void
  allLabel?: string
  all?: boolean
  disabled?: boolean
  hideValue?: boolean
}
export const AmountInput = asStyled<AmountInputProps>(
  ({
    value,
    onChange,
    setMaxValue,
    maxLabel,
    significantDigits,
    setAll,
    allLabel = 'label',
    all,
    disabled,
    hideValue,
    className,
  }) => {
    return (
      <InputDiv className={className}>
        <ScalingInput
          width={360}
          maxFontSize={40}
          value={hideValue ? '-' : value}
          placeholder={'0'}
          onChange={({ target: { value } }) => {
            const parsed = parseInput(value, significantDigits)
            if (parsed == null) return
            onChange(parsed)
          }}
          disabled={disabled || all}
          inputMode="decimal"
        />
        {!disabled && (
          <Control>
            <button
              onClick={() => {
                if (setAll) setAll(false)
                setMaxValue()
              }}
            >
              {maxLabel || t`Max`}
            </button>
            {setAll && (
              <label>
                <input
                  type="checkbox"
                  checked={all}
                  onChange={() => setAll(!all)}
                  disabled={disabled}
                />
                <div>{allLabel}</div>
              </label>
            )}
          </Control>
        )}
      </InputDiv>
    )
  },
)``

const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 3em;
  text-align: center;
  white-space: pre-wrap;
  font-size: 14px;
  row-gap: 8px;
  > * {
    width: 3em;
    height: 1.2em;
  }
  button,
  label {
    transition: all 0.2s ease-in;
    cursor: pointer;
    :hover {
      color: ${offWhite};
    }
    :disabled {
      color: unset;
      cursor: not-allowed;
    }
    input {
      display: none;
    }
  }
  input:checked + div {
    color: ${offWhite};
  }
  @media ${breakpoint.xl} {
    font-size: 16px;
    input:checked + div {
      color: ${trueBlack};
    }
  }
`

const InputDiv = styled.div`
  position: relative;
  padding: 0 32px;
  ${ScalingInput} {
    height: 48px;
    display: block;
    margin: 0 auto;
    font-weight: ${fontWeightBold};
    text-align: center;
    color: ${offWhite};
    :disabled {
      cursor: not-allowed;
    }
  }
  ${Control} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 32px;
  }
  @media ${breakpoint.xl} {
    ${ScalingInput} {
      color: ${trueBlack};
    }
  }
`
