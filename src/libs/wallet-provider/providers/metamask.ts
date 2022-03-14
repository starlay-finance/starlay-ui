import { BigNumber } from '@ethersproject/bignumber'
import { t } from '@lingui/macro'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnector, WalletType } from '../types'

const onConnect = async () => {
  const { ethereum } = window
  if (!(ethereum && ethereum.isMetaMask))
    return Promise.reject('Please make Metamask available')
  await ethereum.request({ method: 'eth_requestAccounts' })
}

const connector = new InjectedConnector({})

export const metamaskConnector: WalletConnector<InjectedConnector> = {
  type: 'Metamask',
  connector,
  onConnect,
}

export const connectIfAuthorized = (
  connect: (type: WalletType) => Promise<void>,
) => {
  metamaskConnector.connector.isAuthorized().then((isAuthorized) => {
    if (!isAuthorized) return
    connect('Metamask').catch((error) =>
      console.error('Error occured on trying to connect MetaMask', error),
    )
  })
}

export const removeAllListeners = () => {
  const { ethereum } = window
  if (!ethereum) return
  ethereum.removeAllListeners('chainChanged')
  ethereum.removeAllListeners('accountsChanged')
}

export const addListenersOnConnected = (
  connect: (type: WalletType) => Promise<void>,
  disconnect: VoidFunction,
) => {
  const { ethereum } = window
  if (ethereum?.isMetaMask) {
    removeAllListeners()
    ethereum.on('accountsChanged', (accounts) => {
      if (!accounts.length) {
        disconnect()
        return
      }
      connect('Metamask').catch((error) => {
        console.error('Failed to activate after accountsChanged', error)
      })
    })
    ethereum.on('chainChanged', () =>
      connect('Metamask').catch((error) => {
        console.error('Failed to activate after chainChanged', error)
      }),
    )
  }
}

export const requestSwitchChain = async (
  chainId: number,
  chainInfo?: AddEthereumChainParameter,
): Promise<{ error?: string }> => {
  const { ethereum } = window
  if (!ethereum?.isMetaMask)
    return { error: t`Your wallet needs to switch networks manually.` }
  try {
    const chainIdHex = `0x${(+BigNumber.from(chainId)).toString(16)}`
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    })
    return {}
  } catch (e: any) {
    if (e.code === 4902 && chainInfo) return requestAddEthereumChain(chainInfo)
    return { error: t`Your wallet needs to switch networks manually.` }
  }
}

export const requestAddEthereumChain = async (
  chainInfo: AddEthereumChainParameter,
) => {
  const { ethereum } = window
  if (!ethereum?.isMetaMask)
    return { error: 'Your wallet needs to switch networks manually.' }
  try {
    if (!chainInfo.rpcUrls.length) throw new Error()
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chainInfo],
    })
    return {}
  } catch (e) {
    return { error: 'Your wallet needs to switch networks manually.' }
  }
}
