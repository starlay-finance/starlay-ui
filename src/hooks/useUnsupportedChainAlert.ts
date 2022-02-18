import { t } from '@lingui/macro'
import { useEffect, useMemo } from 'react'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { isSupportedChain } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { useWallet } from './useWallet'

export const useUnsupportedChainAlert = (params?: {
  forceChangeChain: boolean
}) => {
  const { chainId, switchChain } = useWallet()
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
        close()
        return
      }
      openMessageModal({
        title: t`Failed to switch the chain`,
        message: error,
        type: 'Alert',
      })
    })
  }, [isUnsupportedChain, params])

  useEffect(() => {
    if (!isUnsupportedChain && isOpen) close()
  }, [isUnsupportedChain, isOpen])

  return { isUnsupportedChain }
}
