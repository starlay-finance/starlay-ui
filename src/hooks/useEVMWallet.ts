import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { useNetworkType } from 'src/hooks/useNetwork'
import { EVMChainId } from 'src/libs/config'
import { getEVMChainInfo } from 'src/libs/config/chain'
import {
  EVMWalletType,
  getConnector,
  metamask,
} from 'src/libs/wallet-provider-evm'
import { EthereumAddress } from 'src/types/web3'
import {
  setHasConnected,
  setLastConnectedNetwork,
} from 'src/utils/localStorage'
import { useSWRLocal } from './base/useSWRLocal'

type ActiveWallet = {
  type: EVMWalletType
  onDisconnect?: VoidFunction
}
export type EVMWalletInterface = {
  error: Error | undefined
  active: boolean
  chainId: number | undefined
  account: EthereumAddress | null | undefined
  library: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  activeWalletType: EVMWalletType | null | undefined
  connect: (type: EVMWalletType) => Promise<void>
  disconnect: () => void
  switchChain?: (chainId: EVMChainId) => Promise<{ error?: string }>
}
const useActiveWallet = () => useSWRLocal<ActiveWallet | null>('wallet-active')

export const useEVMWallet = (
  forceNetworkActive: boolean = false,
): EVMWalletInterface => {
  const { data: networkType } = useNetworkType()
  const isNetworkActive = networkType === 'EVM' || forceNetworkActive

  const { library, error, account, active, chainId, activate, deactivate } =
    useWeb3React<ethers.providers.Web3Provider>()

  const signer = useMemo(() => library?.getSigner(), [library])
  const { data: activeWallet, mutate: mutateActiveWallet } = useActiveWallet()

  const connect = useCallback(
    async (type: EVMWalletType) => {
      const { connector, onConnect, onDisconnect } = getConnector(type)
      if (onConnect) await onConnect()
      await activate(connector, undefined, true)
      await mutateActiveWallet({ type, onDisconnect })
      setLastConnectedNetwork('EVM')
      setHasConnected('EVM')
    },
    [activate],
  )

  const disconnect = useCallback(async () => {
    if (activeWallet?.onDisconnect) activeWallet.onDisconnect()
    await mutateActiveWallet(null)
    deactivate()
  }, [activeWallet, deactivate])

  const switchChain = useCallback(
    async (chainId: EVMChainId) => {
      return metamask.requestSwitchChain(chainId, getEVMChainInfo(chainId))
    },
    [activeWallet],
  )

  useEffect(() => {
    if (!isNetworkActive || (library && activeWallet?.type !== 'Metamask'))
      return
    metamask.addListenersOnConnected(connect, disconnect)
    return metamask.removeAllListeners
  }, [isNetworkActive, library, activeWallet, connect, disconnect])

  useEffect(() => {
    if (!isNetworkActive || !connect) return
    metamask.connectIfAuthorized(connect)
  }, [isNetworkActive, connect, activeWallet])

  return {
    error,
    active,
    chainId,
    account: account as EVMWalletInterface['account'],
    library,
    signer,
    activeWalletType: activeWallet?.type,
    connect,
    disconnect,
    switchChain: activeWallet?.type === 'Metamask' ? switchChain : undefined,
  }
}
