import { t } from '@lingui/macro'
import { VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { BN_ZERO } from 'src/utils/number'
import { SuggestModalBody, SuggestModalBodyProps } from './Body'

export const Suggest: VFC<
  ModalContentProps & Omit<SuggestModalBodyProps, 'arthswapAPY' | 'close'>
> = ({ ...props }) => {
  // TODO fetch from arthswap
  const arthswapAPY = BN_ZERO
  return (
    <DefaultModalContent
      headerNode={t`Do you want to earn more?`}
      bodyNode={<SuggestModalBody {...props} arthswapAPY={arthswapAPY} />}
      closeModal={props.close}
    />
  )
}

export const useSuggestModal = () => useModalDialog(Suggest)
