import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'

export const getManualGasPrice = () => {
  const value = localStorage.getItem('gasPriceMultiplier')
  return value ? valueToBigNumber(value) : undefined
}

export const setManualGasPrice = (value: BigNumber | undefined) =>
  value
    ? localStorage.setItem('gasPriceMultiplier', value.toString())
    : localStorage.removeItem('gasPriceMultiplier')

export const getGasPriceMultiplier = () => {
  const value = localStorage.getItem('gasPriceMultiplier_v2')
  return value ? valueToBigNumber(value) : undefined
}

export const setGasPriceMultiplier = (value: BigNumber | undefined) =>
  value
    ? localStorage.setItem('gasPriceMultiplier_v2', value.toString())
    : localStorage.removeItem('gasPriceMultiplier_v2')
