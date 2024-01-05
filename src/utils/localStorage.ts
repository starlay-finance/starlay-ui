import { NetworkType } from 'src/libs/config'

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
