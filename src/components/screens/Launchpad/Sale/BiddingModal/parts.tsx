import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Toggle } from 'src/components/parts/Toggle'
import { hoverBackgroundKeyframes } from 'src/styles/animation'
import {
  darkRed,
  gray,
  purple,
  skyBlue,
  trueBlack,
  trueWhite,
} from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
} from 'src/styles/font'
import {
  BN_ZERO,
  formatAmt,
  formattedToBigNumber,
  handleArrow,
  parseInput,
} from 'src/utils/number'
import styled, { css } from 'styled-components'

export const AmountInput: VFC<{
  value: string
  decimals: number
  step: number
  onChange: (value: string) => void
  maxAmount?: BigNumber
  placeholder?: string
  disabled?: boolean
}> = ({ decimals, step, onChange, maxAmount, ...props }) => (
  <InputContainer>
    <Input
      {...props}
      onChange={({ target }) => {
        const parsed = parseInput(target.value, decimals)
        if (parsed == null) return
        onChange(parsed)
      }}
      onKeyDown={(e) => {
        const parsedInput = parseInput(e.currentTarget.value, decimals)
        const parsed = parsedInput && formattedToBigNumber(parsedInput)
        if (parsed == null) return
        handleArrow(e.code, parsed || BN_ZERO, step, (v) =>
          onChange(formatAmt(v)),
        )
      }}
    />
    {maxAmount && (
      <MaxButton
        onClick={() => onChange(maxAmount?.toString())}
        disabled={props.disabled}
      >{t`MAX`}</MaxButton>
    )}
  </InputContainer>
)

const MaxButton = styled.button`
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px) brightness(1.15);
  line-height: 1;
  :enabled:hover {
    background: ${purple}cc;
  }
  :disabled {
    cursor: not-allowed;
  }
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`

const Input = styled.input`
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 22px;
  border-radius: 8px;

  font-size: 18px;
  font-weight: ${fontWeightBold};
  text-align: center;

  background: linear-gradient(90deg, ${skyBlue}cc, ${darkRed}cc, ${skyBlue}cc);
  :enabled {
    background-size: 300%;
    animation: ${hoverBackgroundKeyframes(3)} 10s -4.5s infinite linear;
    animation-play-state: paused;
    :hover {
      animation-play-state: running;
    }
  }
  :disabled {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(30px) brightness(1.15);
  }
`

export const ToggleDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 12px;
  ${Toggle} {
    background-color: ${gray};
  }
`
export const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 252px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${trueBlack}52;

  font-size: 18px;
  font-weight: ${fontWeightRegular};
  input {
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const toggleEnabledStyle = css`
  background: linear-gradient(105deg, ${darkRed}, ${skyBlue});
`
export const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  :not(:last-child) {
    border-bottom: 1px solid ${trueWhite}29;
  }
  > * {
    :first-child {
    }
    :last-child {
      text-align: right;
    }
  }
`
export const FormItemMulti = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${trueWhite}29;
  ${FormItem} {
    padding-bottom: 0;
    border-bottom: none;
    :not(:first-child) {
      padding-top: 20px;
    }
  }
`

export const FormDiv = styled.div`
  padding: 0 32px 32px;
  ${Button} {
    margin-top: 32px;
  }
`

export const Title = styled.div`
  text-align: center;
  p {
    padding: 32px;
    font-weight: ${fontWeightMedium};
    font-size: 24px;
  }
`
