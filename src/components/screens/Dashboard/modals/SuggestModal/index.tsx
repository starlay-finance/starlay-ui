import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { FC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { css } from 'styled-components'
import { SuggestModalBody, SuggestModalBodyProps } from './Body'

export const Suggest: FC<
  ModalContentProps &
    Omit<SuggestModalBodyProps, 'close' | 'arthswapPair'> & {
      arthswapPair?: {
        apr: BigNumber
        symbols: [string, string]
        url: string
      }
    }
> = ({ arthswapPair, ...props }) => {
  const { data: balance } = useWalletBalance()
  const symbol = props.asset.displaySymbol || props.asset.symbol
  return (
    <DefaultModalContent
      headerNode={t`Comparing ${symbol} APYs for Next Action`}
      headerStyle={headerStyle}
      bodyNode={
        <SuggestModalBody
          {...props}
          inWallet={(balance && balance[props.asset.symbol]) || props.inWallet}
          arthswapPair={arthswapPair}
        />
      }
      closeModal={props.close}
    />
  )
}
const headerStyle = css`
  border-bottom: none;
`

export const useSuggestModal = () => useModalDialog(Suggest)
