import { ReturnNumber } from '@727-ventures/typechain-types'
import {
  BigNumber,
  BigNumberValue,
  valueToBigNumber,
  valueToZDBigNumber,
} from '@starlay-finance/math-utils'

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

export const toAPY = (_ratePerMilliSec: ReturnNumber) => {
  const ratePerMilliSec = toBigNumber(
    _ratePerMilliSec,
    UNIT_DECIMALS - DEFAULT_SCALE,
  )
  const exp = valueToZDBigNumber(MILLISECONDS_PER_YEAR)
  const expMinusOne = exp.minus(1)
  const expMinusTwo = exp.minus(2)
  const basePowerTwo = unitMul(ratePerMilliSec, ratePerMilliSec)
  const basePowerThree = unitMul(basePowerTwo, ratePerMilliSec)
  const secondTerm = exp.times(expMinusOne).times(basePowerTwo).idiv(2)
  const thirdTerm = exp
    .times(expMinusOne)
    .times(expMinusTwo)
    .times(basePowerThree)
    .idiv(6)
  return UNIT.plus(ratePerMilliSec.times(exp)).plus(secondTerm).plus(thirdTerm)
}

const UNIT_DECIMALS = 27
const UNIT = valueToZDBigNumber(10).pow(UNIT_DECIMALS)
const HALF_UNIT = UNIT.dividedBy(2)

const unitMul = (a: BigNumberValue, b: BigNumberValue): BigNumber =>
  HALF_UNIT.plus(valueToZDBigNumber(a).multipliedBy(b)).div(UNIT)
