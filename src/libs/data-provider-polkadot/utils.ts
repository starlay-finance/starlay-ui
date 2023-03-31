import { ReturnNumber } from '@727-ventures/typechain-types'
import {
  BigNumber,
  BigNumberValue,
  valueToBigNumber,
  valueToZDBigNumber,
} from '@starlay-finance/math-utils'
import { BN_ZERO } from 'src/utils/number'

const MILLISECONDS_PER_YEAR = 60 * 60 * 24 * 365 * 1000
const DEFAULT_SCALE = 18

export const toBigNumber = (
  num: ReturnNumber,
  shift: number = -DEFAULT_SCALE,
) => valueToBigNumber(num.toString()).shiftedBy(shift)

export const toString = (maybeString: string | number[]) => {
  const hexStr =
    typeof maybeString === 'string' ? maybeString : maybeString.toString()
  return Buffer.from(hexStr.replace('0x', ''), 'hex').toString('utf-8')
}

export const toAPY = (ratePerMilliSec: ReturnNumber) => {
  const ratePerMilliSecBn = toBigNumber(
    ratePerMilliSec,
    UNIT_DECIMALS - DEFAULT_SCALE,
  )
  return ratePerMilliSecBn.isZero()
    ? BN_ZERO
    : unitPow(ratePerMilliSecBn.plus(UNIT), MILLISECONDS_PER_YEAR)
        .minus(UNIT)
        .shiftedBy(-UNIT_DECIMALS)
}

const UNIT_DECIMALS = 18
const UNIT = valueToZDBigNumber(10).pow(UNIT_DECIMALS)
const HALF_UNIT = UNIT.dividedBy(2)

const unitMul = (a: BigNumberValue, b: BigNumberValue): BigNumber =>
  HALF_UNIT.plus(valueToZDBigNumber(a).multipliedBy(b)).div(UNIT)

const unitPow = (a: BigNumberValue, p: BigNumberValue): BigNumber => {
  let x = valueToZDBigNumber(a)
  let n = valueToZDBigNumber(p)
  let z = n.modulo(2).eq(0) ? valueToZDBigNumber(UNIT) : x

  for (n = n.div(2); !n.eq(0); n = n.div(2)) {
    x = unitMul(x, x)

    if (!n.modulo(2).eq(0)) {
      z = unitMul(z, x)
    }
  }

  return z
}
