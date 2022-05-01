import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { BN_ONE } from './number'

export const getGasPriceMultiplier = () => {
  const value = localStorage.getItem('gasPriceMultiplier')
  return value ? valueToBigNumber(value) : BN_ONE
}

export const setGasPriceMultiplier = (value: BigNumber) =>
  localStorage.setItem('gasPriceMultiplier', `${value.toFixed(0)}`)
