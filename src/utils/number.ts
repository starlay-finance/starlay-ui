import {
  BigNumber,
  BigNumberValue,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'

const SCALES = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'] as const

export const BN_ONE: BigNumber = valueToBigNumber('1')
export const BN_HUNDRED: BigNumber = valueToBigNumber('100')

export const BN_ZERO = valueToBigNumber('0')

type FormatOption = Partial<{
  decimalPlaces: number
  shorteningThreshold: number
}>
const formatNum = (
  num: BigNumber,
  { decimalPlaces, shorteningThreshold }: FormatOption = {},
) => {
  const int = num.integerValue(BigNumber.ROUND_FLOOR)
  if (!int.isZero() || num.isZero()) {
    const formatted = `${num.toFormat(decimalPlaces)}`
    if (!shorteningThreshold || formatted.length < shorteningThreshold)
      return formatted
    const [int, decimals] = formatted.split('.')
    const intLengthWithDot = int.length + 1
    if (decimals && intLengthWithDot < shorteningThreshold)
      return `${int}.${decimals.slice(
        0,
        shorteningThreshold - intLengthWithDot,
      )}`
    return formatAmtShort(
      num,
      Math.max(
        shorteningThreshold - int.toString().length - 1,
        Math.min(shorteningThreshold - 4, 2),
      ),
    )
  }

  const formatted = `${num.toFormat(decimalPlaces)}`
  if (!shorteningThreshold || formatted.length < shorteningThreshold)
    return formatted

  const adjustedDecimalPlaces = Math.min(
    (shorteningThreshold || Number.MAX_SAFE_INTEGER) - 2,
    decimalPlaces || Number.MAX_SAFE_INTEGER,
  )
  const shifted = num
    .shiftedBy(adjustedDecimalPlaces)
    .integerValue(BigNumber.ROUND_FLOOR)
  if (shifted.integerValue().isZero())
    return `> ${BN_ONE.shiftedBy(-adjustedDecimalPlaces)}`
  return num.toFormat(adjustedDecimalPlaces)
}

export const formatAmt = (
  num: BigNumber,
  { symbol, ...opts }: FormatOption & { symbol?: AssetSymbol } = {},
) => `${formatNum(num, opts)}${symbol ? ` ${symbol}` : ''}`

export const formatAmtShort = (num: BigNumber, decimalPlaces = 2) => {
  const scaleIdx =
    Math.min(Math.ceil(num.toFixed(0).length / 3), SCALES.length) - 1
  const scaledNum = num.shiftedBy(-(scaleIdx || 0) * 3)
  return `${scaledNum.toFormat(decimalPlaces)}${SCALES[scaleIdx]}`
}

export const formatUSD = (
  num: BigNumberValue,
  option: FormatOption = { shorteningThreshold: 8, decimalPlaces: 2 },
) => `$${formatNum(valueToBigNumber(num), option)}`

export const formatUSDShort: typeof formatAmtShort = (...args) =>
  `$${formatAmtShort(...args)}`

export const formatPct = (
  num: BigNumberValue,
  option: FormatOption = { shorteningThreshold: 5, decimalPlaces: 2 },
) => `${formatNum(BN_HUNDRED.multipliedBy(num), option)}%`

export const formattedToBigNumber = (
  formattedAmount: string,
  defaultValue?: BigNumber,
) => {
  const value = formattedAmount.replace(/,/g, '')
  const bn = valueToBigNumber(value)
  return bn.isNaN() ? defaultValue : bn
}
