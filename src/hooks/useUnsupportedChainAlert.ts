import { t } from '@lingui/macro'
import { useEffect, useMemo } from 'react'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { isSupportedChain } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { EVMWalletInterface, useEVMWallet } from './useEVMWallet'

export const useUnsupportedChainAlert = (params?: {
  forceChangeChain: boolean
}) => {
  const { chainId, switchChain } = useEVMWallet()
  const isUnsupportedChain = useMemo(
    () => chainId && !isSupportedChain(chainId),
    [chainId],
  )
  const { open: openWalletModal } = useWalletModal()
  const { isOpen, open: openMessageModal, close } = useMessageModal()

  useEffect(() => {
    if (!params?.forceChangeChain || chainId) return
    openWalletModal()
  }, [chainId])

  useEffect(() => {
    if (!params?.forceChangeChain || !isUnsupportedChain) return
    requestSwitchChain({ switchChain, openMessageModal, onSuccess: close })
  }, [isUnsupportedChain, params])

  useEffect(() => {
    if (!isUnsupportedChain && isOpen) close()
  }, [isUnsupportedChain, isOpen])

  return { isUnsupportedChain }
}

export const useSwitchChainIfUnsupported = () => {
  const { chainId, switchChain } = useEVMWallet()
  const { open: openMessageModal, close } = useMessageModal()

  const switchChainIfUnsupported = (fn: VoidFunction) => () => {
    if (chainId && !isSupportedChain(chainId)) {
      requestSwitchChain({
        switchChain,
        openMessageModal,
        onSuccess: close,
      })
      return
    }
    fn()
  }
  return { switchChainIfUnsupported }
}

const requestSwitchChain = ({
  switchChain,
  openMessageModal,
  onSuccess,
}: {
  switchChain: EVMWalletInterface['switchChain']
  openMessageModal: ReturnType<typeof useMessageModal>['open']
  onSuccess?: VoidFunction
}) => {
  if (!switchChain) {
    openMessageModal({
      type: 'Alert',
      title: t`You need to change to a supported chain`,
      message: t`Please switch the chain with your wallet.`,
    })
    return
  }
  openMessageModal({
    type: 'Loading',
    title: t`You need to change to a supported chain`,
    message: t`Please switch the chain with your wallet...`,
  })
  switchChain(DEFAULT_CHAIN_ID).then(({ error }) => {
    if (!error) {
      onSuccess && onSuccess()
      return
    }
    openMessageModal({
      title: t`Failed to switch the chain`,
      message: error,
      type: 'Alert',
    })
  })
}
