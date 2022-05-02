import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { ChainId } from 'src/libs/config'
import { getChainInfo } from 'src/libs/config/chain'
import { getConnector, metamask, WalletType } from 'src/libs/wallet-provider'
import { EthereumAddress } from 'src/types/web3'
import { useSWRLocal } from './base/useSWRLocal'

type ActiveWallet = {
  type: WalletType
  onDisconnect?: VoidFunction
}
type WalletInterface = {
  error: Error | undefined
  active: boolean
  chainId: number | undefined
  account: EthereumAddress | null | undefined
  library: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  activeWalletType: WalletType | null | undefined
  connect: (type: WalletType) => Promise<void>
  disconnect: () => void
  switchChain?: (chainId: ChainId) => Promise<{ error?: string }>
}
const useActiveWallet = () => useSWRLocal<ActiveWallet | null>('wallet-active')

export const useWallet = (): WalletInterface => {
  const { library, error, account, active, chainId, activate, deactivate } =
    useWeb3React<ethers.providers.Web3Provider>()

  const signer = useMemo(() => library?.getSigner(), [library])
  const { data: activeWallet, mutate: mutateActiveWallet } = useActiveWallet()

  const connect = useCallback(
    async (type: WalletType) => {
      const { connector, onConnect, onDisconnect } = getConnector(type)
      if (onConnect) await onConnect()
      await activate(connector, undefined, true)
      await mutateActiveWallet({ type, onDisconnect })
    },
    [activate],
  )

  const disconnect = useCallback(async () => {
    if (activeWallet?.onDisconnect) activeWallet.onDisconnect()
    await mutateActiveWallet(null)
    deactivate()
  }, [activeWallet, deactivate])

  const switchChain = useCallback(
    async (chainId: ChainId) => {
      return metamask.requestSwitchChain(chainId, getChainInfo(chainId))
    },
    [activeWallet],
  )

  useEffect(() => {
    if (library && activeWallet?.type !== 'Metamask') return
    metamask.addListenersOnConnected(connect, disconnect)
    return metamask.removeAllListeners
  }, [library, activeWallet, connect, disconnect])

  useEffect(() => {
    if (!connect || activeWallet?.type === 'Metamask') return
    metamask.connectIfAuthorized(connect)
  }, [connect, activeWallet])

  return {
    error,
    active,
    chainId,
    account: account as WalletInterface['account'],
    library,
    signer,
    activeWalletType: activeWallet?.type,
    connect,
    disconnect,
    switchChain: activeWallet?.type === 'Metamask' ? switchChain : undefined,
  }
}
