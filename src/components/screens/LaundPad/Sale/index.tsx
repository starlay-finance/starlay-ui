import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ASSETS_DICT } from 'src/constants/assets'
import { BN_ZERO } from 'src/utils/number'
import styled from 'styled-components'
import { useBiddingModal } from '../BiddingModal'
import { Bid, LaunchPadData, Status } from '../types'
import { BidSecion } from './Bid'
import { SaleInformation } from './SaleInformation'

type SaleProps = {
  token: LaunchPadData['token']
  information: LaunchPadData['sale']
  status: Status
  currentEstimatedPrice?: BigNumber
  bid?: Bid
}

export const Sale: VFC<SaleProps> = ({
  token,
  information,
  status,
  currentEstimatedPrice = BN_ZERO,
  bid,
}) => {
  const { open } = useBiddingModal()
  const openBiddingModal = () =>
    open({
      currentEstimatedPrice,
      receivingAsset: ASSETS_DICT.LAY,
    })

  return (
    <SaleDiv>
      {bid && (
        <BidSecion
          bid={bid}
          currentEstimatedPrice={currentEstimatedPrice}
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
        hasBidded={!!bid}
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
