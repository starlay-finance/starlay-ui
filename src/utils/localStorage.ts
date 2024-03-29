import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { NetworkType } from 'src/libs/config'

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

export const getLastConnectedNetwork = () =>
  localStorage.getItem('lastConnectedNetwork')

export const setLastConnectedNetwork = (value: NetworkType) =>
  localStorage.setItem('lastConnectedNetwork', value)

export const getLastConnectedAccount = (network: NetworkType) =>
  localStorage.getItem('lastConnectedAccount_' + network)

export const setLastConnectedAccount = (network: NetworkType, value: string) =>
  localStorage.setItem('lastConnectedAccount_' + network, value)

export const getHasConnected = (network: NetworkType) =>
  localStorage.getItem('hasConnected_' + network) === 'true'

export const setHasConnected = (network: NetworkType, value = true) =>
  localStorage.setItem('hasConnected_' + network, `${value}`)
