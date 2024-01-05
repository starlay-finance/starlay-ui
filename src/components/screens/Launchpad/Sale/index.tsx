import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { FC } from 'react'
import { ASSETS_DICT } from 'src/constants/assets'
import { useLaunchpad } from 'src/hooks/contracts/useLaunchpad'
import { assetFromSymbolAndAddress } from 'src/utils/assets'
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

export const Sale: FC<SaleProps> = ({
  data: { token, sale, vesting },
  status,
  market,
  maxAmount,
}) => {
  const { launchpadAddress } = useLaunchpadContext()
  const { currentBid, userResult, refund } = useLaunchpad()

  const { open } = useBiddingModal()
  const openBiddingModal = () =>
    launchpadAddress &&
    open({
      launchpadAddress,
      currentBid,
      maxAmount,
      biddingAssets: sale.biddingAssets.map((asset) => ({
        ...asset,
        icon: assetFromSymbolAndAddress(asset.symbol, asset.address)?.icon,
      })),
      currentEstimatedPrice: market?.currentPriceInUSD,
      boostedRaisedAmount: market?.boostedRaisedAmountInUSD,
      receivingAsset: ASSETS_DICT.DOT,
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
          receivableAmount={userResult?.claimable}
          refundableAmount={userResult?.refundable}
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
