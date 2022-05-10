import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { GlassModalContent } from 'src/components/parts/Modal/base/Content/Glass'
import { useLaunchpad } from 'src/hooks/contracts/useLaunchpad'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { Asset, ERC20Asset } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { BN_ZERO } from 'src/utils/number'
import { Bid } from '../../types'
import { BiddingForm } from './BiddingForm'
import { CurrentPrice } from './CurrentPrice'
import { Title } from './parts'

type BiddingModalProps = {
  launchpadAddress: EthereumAddress
  receivingAsset: Asset
  maxAmount: BigNumber
  biddingAssets: ERC20Asset[]
  boostedRaisedAmount?: BigNumber
  currentEstimatedPrice?: BigNumber
  currentBid?: Bid
}

const BiddingModal: VFC<ModalContentProps & BiddingModalProps> = ({
  launchpadAddress,
  close,
  receivingAsset,
  maxAmount,
  biddingAssets,
  boostedRaisedAmount = BN_ZERO,
  currentEstimatedPrice = BN_ZERO,
  currentBid,
}) => {
  const { bid, update, cancel } = useLaunchpad({ launchpadAddress })
  const submit = (newBid: Bid & { asset: EthereumAddress }) => {
    if (!currentBid) return bid(newBid)
    if (currentBid?.cancelable) return cancel()
    return update(newBid)
  }
  return (
    <GlassModalContent closeModal={close}>
      <Title>
        <p>
          {currentBid?.cancelable
            ? t`Cancel Bid`
            : currentBid
            ? t`Increase Bid Amount and/or Limit Price`
            : t`Bid on ${receivingAsset.symbol}`}
        </p>
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

export const useBiddingModal = () =>
  useModalDialog(requireSupportedChain(BiddingModal))
