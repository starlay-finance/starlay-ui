import { t } from '@lingui/macro'
import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import { useTokenSaleVesting } from 'src/hooks/contracts/useTokenSaleVesting'
import { useVoter } from 'src/hooks/contracts/useVoter'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { gray } from 'src/styles/colors'
import { filterFalsy } from 'src/utils/array'
import styled from 'styled-components'
import { LockModalBody, LockModalBodyProps } from './Body'

export const Lock: VFC<
  ModalContentProps & Pick<LockModalBodyProps, 'current' | 'mode'>
> = ({ close, ...props }) => {
  const { lock } = useVotingEscrow()
  const { lock: lockVesting, userData } = useTokenSaleVesting()
  const { poke, userData: userVoteData } = useVoter()
  const { data: wallet } = useWalletBalance()
  const { open, close: closeMessageModal } = useMessageModal()
  const suggestPokeOnVotingPowerIncreased = () => {
    if (!userVoteData) return
    const weights = Object.values(userVoteData.data)
      .filter(filterFalsy)
      .map(({ weight }) => weight)
    if (!weights.length || !weights.some((weight) => weight.isZero())) return
    open({
      title: t`Let's Apply Voting Power You've Added`,
      children: (
        <SuggestDiv>
          {t`To apply the voting power you just added by locking additional LAY to your votes, please click "Apply". This can be done from "Apply" button in the "Vote" tab. Otherwise, the voting power you added won't be reflected in your current votes.`}
          <div>
            <SimpleCtaButton
              onClick={closeMessageModal}
            >{t`Later`}</SimpleCtaButton>
            <SimpleCtaButton onClick={() => poke()}>{t`Apply`}</SimpleCtaButton>
          </div>
        </SuggestDiv>
      ),
    })
  }
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={ASSETS_DICT.LAY} label={t`Lock LAY`} />}
      bodyNode={
        <LockModalBody
          {...props}
          lock={(from, ...args) => {
            if (from === 'wallet')
              return lock(...args, suggestPokeOnVotingPowerIncreased)
            return lockVesting(
              from,
              args[0],
              args[1],
              suggestPokeOnVotingPowerIncreased,
            )
          }}
          inWallet={wallet[ASSETS_DICT.LAY.symbol]}
          vesting={userData}
        />
      }
      closeModal={close}
    />
  )
}

const SuggestDiv = styled.div`
  > div {
    display: flex;
    column-gap: 16px;
    margin-top: 96px;
    button {
      :first-child {
        background-color: ${gray};
      }
    }
  }
`

export const useLockModal = () => useModalDialog(requireSupportedChain(Lock))
