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
  safeConnector,
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
const useActiveChain = () => useSWRLocal<number | null>('chain-active')

export const useEVMWallet = (
  forceNetworkActive: boolean = false,
): EVMWalletInterface => {
  const { data: networkType } = useNetworkType()
  const isNetworkActive = networkType === 'EVM' || forceNetworkActive

  const { library, error, account, active, chainId, activate, deactivate } =
    useWeb3React<ethers.providers.Web3Provider>()

  const signer = useMemo(() => library?.getSigner(), [library])
  const { data: activeWallet, mutate: mutateActiveWallet } = useActiveWallet()
  const { data: activeChain, mutate: mutateActiveChain } = useActiveChain()

  const connect = useCallback(
    async (type: EVMWalletType) => {
      const { connector, beforeConnect, onDisconnect, listen } =
        getConnector(type)
      if (beforeConnect) await beforeConnect()
      await activate(
        connector,
        (err) => {
          console.log(err)
        },
        true,
      )
      await mutateActiveWallet({ type, onDisconnect })
      setLastConnectedNetwork('EVM')
      setHasConnected('EVM')
      if (listen) listen({ onChangeChain: mutateActiveChain })
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
    if (library && activeWallet?.type !== 'Metamask') return
    metamask.addListenersOnConnected(connect, disconnect)
    return metamask.removeAllListeners
  }, [library, activeWallet, connect, disconnect])

  useEffect(() => {
    if (!connect || activeWallet?.type !== undefined) return
    metamask.connectIfAuthorized(connect)
  }, [connect, activeWallet])

  useEffect(() => {
    if (activeWallet?.type === 'Safe') return undefined
    ;(async () => {
      try {
        const isInSafeAppContext = await matchIsInSafeAppContext()
        if (isInSafeAppContext) {
          if (activeWallet?.onDisconnect !== undefined) {
            activeWallet.onDisconnect()
          }

          await activate(safeConnector, undefined, true)
          await mutateActiveWallet({
            type: 'Safe',
            onDisconnect: safeConnector.deactivate,
          })
        }
      } catch (error) {
        console.error('Error occurred on trying to connect Safe', error)
      }
    })()
  }, [activate, activeWallet])

  return {
    error,
    active,
    chainId: activeChain || chainId,
    account: account as EVMWalletInterface['account'],
    library,
    signer,
    activeWalletType: activeWallet?.type,
    connect,
    disconnect,
    switchChain: activeWallet?.type === 'Metamask' ? switchChain : undefined,
  }
}
