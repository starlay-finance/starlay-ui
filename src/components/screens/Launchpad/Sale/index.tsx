import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ASSETS_DICT } from 'src/constants/assets'
import { useLaunchpad } from 'src/hooks/contracts/useLaunchpad'
import { assetFromSymbol } from 'src/utils/assets'
import styled from 'styled-components'
import { useLaunchpadContext } from '../LaunchpadContext'
import { Market, ProjectData, Status } from '../types'
import { BidSecion } from './Bid'
import { useBiddingModal } from './BiddingModal'
import { SaleInformation } from './SaleInformation'

type SaleProps = {
  data: ProjectData
  status: Status
  market?: Market
  maxAmount: BigNumber
}

export const Sale: VFC<SaleProps> = ({
  data: { token, sale, vesting },
  status,
  market,
  maxAmount,
}) => {
  const { launchpadAddress } = useLaunchpadContext()
  const { userData, refund } = useLaunchpad()
  const currentBid = userData?.bid

  const { open } = useBiddingModal()
  const openBiddingModal = () =>
    launchpadAddress &&
    open({
      launchpadAddress,
      currentBid,
      maxAmount,
      biddingAssets: sale.biddingAssets.map((asset) => ({
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
          vesting={vesting}
          openBiddingModal={openBiddingModal}
          maxAmount={valueToBigNumber(sale.emissionAmount)}
          receivableAmount={userData.claimable}
          refundableAmount={userData.refundable}
          requestRefund={refund}
        />
      )}
      <SaleInformation
        status={status}
        token={token}
        information={sale}
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
