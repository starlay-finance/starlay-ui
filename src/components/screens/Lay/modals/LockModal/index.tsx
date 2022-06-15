import { t } from '@lingui/macro'
import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { BN_ZERO } from 'src/utils/number'
import { LockModalBody } from './Body'

export const Lock: VFC<ModalContentProps> = ({ close, ...props }) => {
  const { lock } = useVotingEscrow()
  const { data: wallet } = useWalletBalance()
  const balances = {
    wallet: wallet[ASSETS_DICT.LAY.symbol],
    // TODO replace mock value
    ido: BN_ZERO,
    tokenSale: BN_ZERO,
  }
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={ASSETS_DICT.LAY} label={t`Lock LAY`} />}
      bodyNode={<LockModalBody {...props} lock={lock} balances={balances} />}
      closeModal={close}
    />
  )
}

export const useLockModal = () => useModalDialog(requireSupportedChain(Lock))
