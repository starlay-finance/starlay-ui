import {
  BigNumber,
  BigNumberValue,
  valueToBigNumber,
} from '@starlay-finance/math-utils'

const SCALES = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'] as const

export const BN_ONE: BigNumber = valueToBigNumber('1')
export const BN_HUNDRED: BigNumber = valueToBigNumber('100')

export const BN_ZERO = valueToBigNumber('0')

type FormatOption = Partial<{
  decimalPlaces: number
  shorteningThreshold: number
  roundingMode: BigNumber.RoundingMode
  prefix?: string
}>
const formatNum = (
  num: BigNumber,
  {
    decimalPlaces,
    shorteningThreshold,
    roundingMode,
    prefix = '',
  }: FormatOption = {},
) => {
  const int = num.integerValue(BigNumber.ROUND_FLOOR)
  if (!int.isZero() || num.isZero()) {
    const formatted = decimalPlaces
      ? `${num.toFormat(decimalPlaces, roundingMode)}`
      : `${num.toFormat(decimalPlaces)}`
    if (!shorteningThreshold || formatted.length < shorteningThreshold)
      return `${prefix}${formatted}`
    const [int, decimals] = formatted.split('.')
    const intLengthWithDot = int.length + 1
    if (decimals && intLengthWithDot < shorteningThreshold)
      return `${prefix}${int}.${decimals.slice(
        0,
        shorteningThreshold - intLengthWithDot,
      )}`
    return formatAmtShort(
      num,
      Math.max(
        shorteningThreshold - int.toString().length - 1,
        Math.min(shorteningThreshold - 4, 2),
      ),
      prefix,
    )
  }

  const formatted = `${num.toFormat(decimalPlaces)}`
  if (!shorteningThreshold || formatted.length < shorteningThreshold)
    return `${prefix}${formatted}`

  const adjustedDecimalPlaces = Math.min(
    (shorteningThreshold || Number.MAX_SAFE_INTEGER) - 2,
    decimalPlaces || Number.MAX_SAFE_INTEGER,
  )
  const shifted = num
    .shiftedBy(adjustedDecimalPlaces)
    .integerValue(BigNumber.ROUND_FLOOR)
  if (shifted.integerValue().isZero())
    return `> ${prefix}${BN_ONE.shiftedBy(-adjustedDecimalPlaces).toFormat(
      adjustedDecimalPlaces,
    )}`
  return `${prefix}${num.toFormat(adjustedDecimalPlaces)}`
}

export const formatAmt = (
  num: BigNumber,
  { symbol, ...opts }: FormatOption & { symbol?: string } = {},
) => `${formatNum(num, opts)}${symbol ? ` ${symbol}` : ''}`

export const formatAmtShort = (
  num: BigNumber,
  decimalPlaces = 2,
  prefix = '',
) => {
  if (!num.isFinite()) return num.toString()
  const scaleIdx =
    Math.min(Math.ceil(num.toFixed(0).length / 3), SCALES.length) - 1
  const scaledNum = num.shiftedBy(-(scaleIdx || 0) * 3)
  return `${prefix}${scaledNum.toFormat(decimalPlaces)}${SCALES[scaleIdx]}`
}

export const formatUSD = (
  num: BigNumberValue,
  option: FormatOption = { shorteningThreshold: 8, decimalPlaces: 2 },
) => `${formatNum(valueToBigNumber(num), { ...option, prefix: '$' })}`

export const formatUSDShort: typeof formatAmtShort = (num, decimalPlaces) =>
  `${formatAmtShort(num, decimalPlaces, '$')}`

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
