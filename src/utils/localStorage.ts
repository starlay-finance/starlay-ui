import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { BN_ONE } from './number'

export const getGasFeeRatio = () => {
  const value = localStorage.getItem('gasFeeRatio')
  return value ? valueToBigNumber(value) : BN_ONE
}

export const setGasFeeRatio = (ratio: BigNumber) =>
  localStorage.setItem('gasFeeRatio', `${ratio.toFixed(0)}`)
