import {
  BigNumber,
  BigNumberValue,
  valueToBigNumber,
} from '@starlay-finance/math-utils'

const SCALES = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'] as const

export const BN_ONE: BigNumber = valueToBigNumber('1')
export const BN_HUNDRED: BigNumber = valueToBigNumber('100')

export const BN_ZERO = valueToBigNumber('0')
export const BN_NAN = valueToBigNumber('NaN')

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
    return formatAmtShort(num, {
      decimalPlaces: Math.max(
        shorteningThreshold - int.toString().length - 1,
        Math.min(shorteningThreshold - 4, 2),
      ),
      prefix,
    })
  }

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

  const formatted = `${num.toFormat(decimalPlaces)}`
  if (!shorteningThreshold || formatted.length < shorteningThreshold)
    return `${prefix}${formatted}`

  return `${prefix}${num.toFormat(adjustedDecimalPlaces)}`
}

export const formatAmt = (
  num: BigNumber,
  { symbol, ...opts }: FormatOption & { symbol?: string } = {},
) => `${formatNum(num, opts)}${symbol ? ` ${symbol}` : ''}`

export const formatAmtShort = (
  num: BigNumber,
  opts: Omit<FormatOption, 'shorteningThreshold'> = {},
) => {
  const {
    decimalPlaces = 2,
    prefix = '',
    roundingMode = BigNumber.ROUND_FLOOR,
  } = opts
  if (!num.isFinite()) return num.toString()
  const scaleIdx =
    Math.min(Math.ceil(num.toFixed(0).length / 3), SCALES.length) - 1
  const scaledNum = num.shiftedBy(-(scaleIdx || 0) * 3)
  return `${prefix}${scaledNum.toFormat(decimalPlaces, roundingMode)}${
    SCALES[scaleIdx]
  }`
}

export const formatUSD = (
  num: BigNumberValue,
  option: FormatOption = { shorteningThreshold: 8, decimalPlaces: 2 },
) => `${formatNum(valueToBigNumber(num), { ...option, prefix: '$' })}`

export const formatUSDShort: typeof formatAmtShort = (num, opts) =>
  `${formatAmtShort(num, { ...opts, prefix: '$' })}`

export const formatPct = (num: BigNumberValue, option: FormatOption = {}) => {
  const { shorteningThreshold = 5, decimalPlaces = 2 } = option
  return `${formatNum(BN_HUNDRED.multipliedBy(num), {
    ...option,
    shorteningThreshold,
    decimalPlaces,
  })}%`
}

export const formattedToBigNumber = (
  formattedAmount: string,
  defaultValue?: BigNumber,
) => {
  const value = formattedAmount.replace(/,/g, '')
  const bn = valueToBigNumber(value)
  return bn.isNaN() ? defaultValue : bn
}

const AMOUNT_REGEX = /^\d*\.?\d*$/
const TRAILING_ZEROS_REGEXP = /(0*)$/
export const parseInput = (input: string, significantDigits: number) => {
  if (input === '') return input
  const value = input.replace(/,/g, '')
  if (!AMOUNT_REGEX.test(value)) return
  const [_int, decimals] = value.split('.')
  if (decimals?.length > significantDigits) return
  if (value.startsWith('.') || value.endsWith('.')) {
    return value
  }
  const bn = valueToBigNumber(value)
  if (bn.isNaN() || bn.isZero()) return value
  const trailingZerosResult = TRAILING_ZEROS_REGEXP.exec(decimals)
  const trailingZeros = (trailingZerosResult && trailingZerosResult[1]) || ''
  const formatted = formatAmt(bn)
  return `${formatted}${
    trailingZeros.length && !formatted.includes('.')
      ? `.${trailingZeros}`
      : trailingZeros
  }`
}

export const handleArrow = (
  code: string,
  value: BigNumber,
  step: number,
  onChange: (value: BigNumber) => void,
) => {
  switch (code) {
    case 'ArrowUp':
      onChange(value.plus(step))
      return
    case 'ArrowDown':
      onChange(BigNumber.max(value.minus(step), BN_ZERO))
      return
  }
}
