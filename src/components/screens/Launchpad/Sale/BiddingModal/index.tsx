import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { GlassModalContent } from 'src/components/parts/Modal/base/Content/Glass'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { Asset } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'
import { Bid } from '../../types'
import { BiddingForm } from './BiddingForm'
import { CurrentPrice } from './CurrentPrice'
import { Title } from './parts'

type BiddingModalProps = {
  receivingAsset: Asset
  maxAmount: BigNumber
  boostedRaisedAmount?: BigNumber
  currentEstimatedPrice?: BigNumber
  bid?: Bid
}

const BiddingModal: VFC<ModalContentProps & BiddingModalProps> = ({
  close,
  receivingAsset,
  maxAmount,
  boostedRaisedAmount = BN_ZERO,
  currentEstimatedPrice = BN_ZERO,
  bid,
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
        bid={bid}
        submit={submit}
      />
    </GlassModalContent>
  )
}

export const useBiddingModal = () => useModalDialog(BiddingModal)
