import { t } from '@lingui/macro'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ScalingInput } from 'src/components/parts/Input'
import { trueBlack } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { formatAmt } from 'src/utils/number'
import styled from 'styled-components'

const AMOUNT_REGEX = /^\d*\.?\d*$/
type AmountInputProps = {
  value: string
  onChange: (value: string) => void
  setMaxValue: VoidFunction
  maxLabel?: string
  significantDigits: number
}
export const AmountInput: VFC<AmountInputProps> = ({
  value,
  onChange,
  setMaxValue,
  maxLabel,
  significantDigits,
}) => (
  <InputDiv>
    <ScalingInput
      width={320}
      maxFontSize={40}
      value={value}
      placeholder={'0'}
      onChange={({ target }) => {
        const value = target.value.replace(/,/g, '')
        if (!AMOUNT_REGEX.test(value)) return
        const [_int, decimals] = value.split('.')
        if (decimals?.length > significantDigits) return
        if (value.startsWith('.') || value.endsWith('.')) {
          onChange(value)
          return
        }
        const bn = valueToBigNumber(value)
        onChange(bn.isNaN() || bn.isZero() ? value : formatAmt(bn))
      }}
    />
    <button onClick={setMaxValue}>{maxLabel || t`Max`}</button>
  </InputDiv>
)

const InputDiv = styled.div`
  position: relative;
  padding: 0 32px;
  ${ScalingInput} {
    height: 48px;
    display: block;
    margin: 0 auto;
    font-weight: ${fontWeightBold};
    text-align: center;
    color: ${trueBlack};
    transition: all 0.5s ease-in;
  }
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 32px;

    font-size: 16px;
    text-align: center;
    white-space: pre-wrap;
    text-transform: uppercase;

    transition: all 0.2s ease-in;
    :hover {
      color: ${trueBlack};
    }
  }
`
