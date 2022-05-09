import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { GlassModalContent } from 'src/components/parts/Modal/base/Content/Glass'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { Asset, ERC20Asset } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { BN_ZERO } from 'src/utils/number'
import { Bid } from '../../types'
import { BiddingForm } from './BiddingForm'
import { CurrentPrice } from './CurrentPrice'
import { Title } from './parts'

type BiddingModalProps = {
  receivingAsset: Asset
  maxAmount: BigNumber
  biddingAssets: ERC20Asset[]
  boostedRaisedAmount?: BigNumber
  currentEstimatedPrice?: BigNumber
  currentBid?: Bid
}

const BiddingModal: VFC<ModalContentProps & BiddingModalProps> = ({
  close,
  receivingAsset,
  maxAmount,
  biddingAssets,
  boostedRaisedAmount = BN_ZERO,
  currentEstimatedPrice = BN_ZERO,
  currentBid,
}) => {
  const submit = (newBid: Bid) => {
    if (!bid) {
      // TODO new bid
      return
    }
    if (bid?.cancelable) {
      // TODO cancel
      return
    }
    // TODO update bid
  }
  return (
    <GlassModalContent closeModal={close}>
      <Title>
        <p>{t`Bid on ${receivingAsset.symbol}`}</p>
      </Title>
      <CurrentPrice
        receivingAsset={receivingAsset}
        currentEstimatedPrice={currentEstimatedPrice}
      />
      <BiddingForm
        receivingAsset={receivingAsset}
        currentEstimatedPrice={currentEstimatedPrice}
        maxAmount={maxAmount}
        boostedRaisedAmount={boostedRaisedAmount}
        biddingAssets={biddingAssets}
        currentBid={currentBid}
        submit={submit}
      />
    </GlassModalContent>
  )
}

export const useBiddingModal = () => useModalDialog(BiddingModal)
