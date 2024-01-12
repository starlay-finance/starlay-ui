import { BigNumber } from '@ethersproject/bignumber'
import { t } from '@lingui/macro'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { METAMASK_EXT_URL } from 'src/utils/routes'
import { EVMWalletConnector, EVMWalletType } from '../types'

const connector = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions }),
)

const beforeConnect = async () => {
  const { ethereum } = window
  if (!(ethereum && ethereum.isMetaMask)) {
    window.open(METAMASK_EXT_URL, '_blank', 'noopener')
    return Promise.reject('Please make Metamask available')
  }
  await ethereum.request({ method: 'eth_requestAccounts' })
}

const connect = () => connector[0].activate()

const connectEagerly = () => connector[0].connectEagerly()

export const metamaskConnector: EVMWalletConnector<MetaMask> = {
  type: 'Metamask',
  connector,
  connect,
  connectEagerly,
  beforeConnect,
}

export const connectIfAuthorized = () => {
  metamaskConnector.connector[0].connectEagerly().catch((error) => {
    console.error('Error occured on trying to connect MetaMask', error)
  })
}

export const removeAllListeners = () => {
  const { ethereum } = window
  if (!ethereum) return
  ethereum.removeAllListeners('chainChanged')
  ethereum.removeAllListeners('accountsChanged')
}

export const addListenersOnConnected = (
  connect: (type: EVMWalletType) => Promise<void>,
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
    console.log('chainInfo', chainInfo)
    if (e.code === 4902 && chainInfo) return requestAddEthereumChain(chainInfo)
    if (e.code === -32002 && e.message?.includes('already pending'))
      return { error: 'duplicate_request' }
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
