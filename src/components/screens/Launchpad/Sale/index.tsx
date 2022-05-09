import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ASSETS_DICT } from 'src/constants/assets'
import { assetFromSymbol } from 'src/utils/assets'
import styled from 'styled-components'
import { Bid, LaunchpadData, Market, Status } from '../types'
import { BidSecion } from './Bid'
import { useBiddingModal } from './BiddingModal'
import { SaleInformation } from './SaleInformation'

type SaleProps = {
  token: LaunchpadData['token']
  information: LaunchpadData['sale']
  status: Status
  market?: Market
  maxAmount: BigNumber
  currentBid?: Bid
}

export const Sale: VFC<SaleProps> = ({
  token,
  information,
  status,
  market,
  maxAmount,
  currentBid,
}) => {
  const { open } = useBiddingModal()
  const openBiddingModal = () =>
    open({
      currentBid,
      maxAmount,
      biddingAssets: information.biddingAssets.map((asset) => ({
        ...asset,
        icon: assetFromSymbol(asset.symbol).icon,
      })),
      currentEstimatedPrice: market?.currentPriceInUSD,
      boostedRaisedAmount: market?.boostedRaisedAmountInUSD,
      receivingAsset: ASSETS_DICT.LAY,
    })

  return (
    <SaleDiv>
      {currentBid && (
        <BidSecion
          bid={currentBid}
          market={market}
          hasEnded={status === 'Ended'}
          token={token}
          openBiddingModal={openBiddingModal}
        />
      )}
      <SaleInformation
        status={status}
        token={token}
        information={information}
        openBiddingModal={openBiddingModal}
        hasBidded={!!currentBid}
      />
    </SaleDiv>
  )
}

const SaleDiv = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`
