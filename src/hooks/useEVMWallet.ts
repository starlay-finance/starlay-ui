import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { useNetworkType } from 'src/hooks/useNetwork'
import { EVMChainId } from 'src/libs/config'
import { getEVMChainInfo } from 'src/libs/config/chain'
import {
  EVMWalletType,
  getConnector,
  matchIsInSafeAppContext,
  metamask,
} from 'src/libs/wallet-provider-evm'
import { EthereumAddress } from 'src/types/web3'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
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
  active: boolean
  chainId: number | undefined
  account: EthereumAddress | null | undefined
  provider: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  activeWalletType: EVMWalletType | null | undefined
  connect: (type: EVMWalletType) => Promise<void>
  disconnect: () => void
  switchChain?: (chainId: EVMChainId) => Promise<{ error?: string }>
}
const useActiveWallet = () => useSWRLocal<ActiveWallet | null>('wallet-active')
const useActiveChain = () => useSWRLocal<number | null>('chain-active')

export const useEVMWallet = (
  forceNetworkActive: boolean = false,
): EVMWalletInterface => {
  const { data: networkType } = useNetworkType()
  const isNetworkActive = networkType === 'EVM' || forceNetworkActive

  const { data: activeWallet, mutate: mutateActiveWallet } = useActiveWallet()
  const { data: activeChain, mutate: mutateActiveChain } = useActiveChain()
  const {
    connector: [connector],
  } = getConnector(activeWallet?.type || 'Metamask')

  const {
    hooks: {
      useSelectedAccount,
      useSelectedChainId,
      useSelectedIsActive,
      useSelectedProvider,
    },
  } = useWeb3React<ethers.providers.Web3Provider>()

  const account = useSelectedAccount(connector)
  const chainId = useSelectedChainId(connector) || DEFAULT_CHAIN_ID
  const active = useSelectedIsActive(connector)
  const provider = useSelectedProvider(connector)

  const signer = useMemo(() => provider?.getSigner(), [provider])

  const connect = useCallback(async (type: EVMWalletType) => {
    const { connect, beforeConnect, onDisconnect, listen } = getConnector(type)
    if (beforeConnect) await beforeConnect()
    await connect()
    await mutateActiveWallet({ type, onDisconnect })
    setLastConnectedNetwork('EVM')
    setHasConnected('EVM')
    if (listen) listen({ onChangeChain: mutateActiveChain })
  }, [])

  const disconnect = useCallback(async () => {
    if (!activeWallet) return
    if (activeWallet.onDisconnect) activeWallet.onDisconnect()

    const { disconnect } = getConnector(activeWallet.type)
    await mutateActiveWallet(null)
    if (disconnect) disconnect()
  }, [activeWallet])

  const switchChain = useCallback(
    async (chainId: EVMChainId) => {
      return metamask.requestSwitchChain(
        chainId,
        getEVMChainInfo(DEFAULT_CHAIN_ID),
      )
    },
    [activeWallet],
  )

  useEffect(() => {
    if (provider && activeWallet?.type !== 'Metamask') return
    metamask.addListenersOnConnected(connect, disconnect)
    return metamask.removeAllListeners
  }, [provider, activeWallet, connect, disconnect])

  useEffect(() => {
    if (!isNetworkActive || activeWallet) return
    const { connectEagerly } = getConnector('Metamask')
    if (connectEagerly) connectEagerly()
  }, [activeWallet])

  useEffect(() => {
    if (activeWallet?.type === 'Safe') return undefined
    ;(async () => {
      try {
        const isInSafeAppContext = await matchIsInSafeAppContext()
        if (isInSafeAppContext) {
          if (activeWallet?.onDisconnect !== undefined) {
            activeWallet.onDisconnect()
          }
          connect('Safe')
        }
      } catch (error) {
        console.error('Error occurred on trying to connect Safe', error)
      }
    })()
  }, [activeWallet])

  return {
    active,
    chainId: activeChain || chainId,
    account: account as EVMWalletInterface['account'],
    provider,
    signer,
    activeWalletType: activeWallet?.type,
    connect,
    disconnect,
    switchChain:
      provider?.connection.url === 'metamask' ? switchChain : undefined,
  }
}
