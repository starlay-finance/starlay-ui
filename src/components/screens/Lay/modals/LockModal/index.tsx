import { t } from '@lingui/macro'
import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import { useTokenSaleVesting } from 'src/hooks/contracts/useTokenSaleVesting'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { LockModalBody, LockModalBodyProps } from './Body'

export const Lock: VFC<
  ModalContentProps & Pick<LockModalBodyProps, 'current' | 'mode'>
> = ({ close, ...props }) => {
  const { lock } = useVotingEscrow()
  const { lock: lockVesting, userData } = useTokenSaleVesting()
  const { data: wallet } = useWalletBalance()
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={ASSETS_DICT.LAY} label={t`Lock LAY`} />}
      bodyNode={
        <LockModalBody
          {...props}
          lock={(from, ...args) => {
            if (from === 'wallet') return lock(...args)
            return lockVesting(from, args[0], args[1])
          }}
          inWallet={wallet[ASSETS_DICT.LAY.symbol]}
          vesting={userData}
        />
      }
      closeModal={close}
    />
  )
}

export const useLockModal = () => useModalDialog(requireSupportedChain(Lock))
