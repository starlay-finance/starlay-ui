import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ARTHSWAP_ASSETS_DICT } from 'src/constants/assets'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { SuggestModalBody, SuggestModalBodyProps } from './Body'

export const Suggest: VFC<
  ModalContentProps &
    Omit<SuggestModalBodyProps, 'close' | 'arthswapPair'> & {
      arthswapPair: {
        apr: BigNumber
        symbols: [string, string]
        url: string
      }
    }
> = ({ arthswapPair, ...props }) => {
  const {
    apr,
    symbols: [symbol1, symbol2],
    url,
  } = arthswapPair
  return (
    <DefaultModalContent
      headerNode={t`Do you want to earn more?`}
      bodyNode={
        <SuggestModalBody
          {...props}
          arthswapPair={{
            apr,
            symbol1,
            symbol2,
            image1: ARTHSWAP_ASSETS_DICT[symbol1].icon,
            image2: ARTHSWAP_ASSETS_DICT[symbol2].icon,
            url,
          }}
        />
      }
      closeModal={props.close}
    />
  )
}

export const useSuggestModal = () => useModalDialog(Suggest)
