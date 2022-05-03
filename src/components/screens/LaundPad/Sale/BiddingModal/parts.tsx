import { valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Toggle } from 'src/components/parts/Toggle'
import { darkRed, gray, skyBlue, trueBlack, trueWhite } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
} from 'src/styles/font'
import { formatAmt, handleArrow, parseInput } from 'src/utils/number'
import styled, { css } from 'styled-components'

export const AmountInput: VFC<{
  value: string
  decimals: number
  step: number
  placeholder: string
  onChange: (value: string) => void
}> = ({ value, decimals, step, onChange }) => (
  <input
    placeholder="0.00"
    value={value}
    onChange={({ target }) => {
      const parsed = parseInput(target.value, decimals)
      if (parsed == null) return
      onChange(parsed)
    }}
    onKeyDown={(e) => {
      const parsed = parseInput(e.currentTarget.value, decimals)
      if (parsed == null) return
      handleArrow(e.code, valueToBigNumber(parsed), 0.01, (v) =>
        onChange(formatAmt(v)),
      )
    }}
  />
)

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 22px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px) brightness(1.15);

  font-size: 18px;
  font-weight: ${fontWeightBold};
  text-align: center;
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
  width: 200px;
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
