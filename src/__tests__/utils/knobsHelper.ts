import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { number } from '@storybook/addon-knobs'

type bignumberKnob = {
  (label: string, initialValue?: number, fallback?: undefined):
    | BigNumber
    | undefined
  (label: string, initialValue: number, fallback: BigNumber): BigNumber
}

// @ts-ignore
export const bignumber: bignumberKnob = (
  label: string,
  initialValue?: number,
  fallback?: BigNumber,
) => {
  const num = number(label, initialValue || 0)
  const bn = valueToBigNumber(num)
  return bn.isNaN() ? fallback : bn
}
