import { t } from '@lingui/macro'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { Reel } from 'src/components/parts/Number/Reel'
import { ASSETS_DICT } from 'src/constants/assets'
import { useIncentivesController } from 'src/hooks/contracts/useIncentivesController'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { purple, trueBlack } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { BN_ZERO, formatAmt, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const UnclaimedReward = asStyled(({ className }) => {
  const { account, signer } = useWallet()
  const { data: user } = useUserData()

  const { claim } = useIncentivesController(account, signer)

  const { icon, name, symbol } = ASSETS_DICT.LAY
  const unclaimed = user?.rewards.unclaimedBalance || BN_ZERO
  const { data: layPrice } = useLAYPrice()
  return (
    <UnclaimedRewardDiv className={className}>
      <p>{t`Unclaimed Reward`}</p>
      <Reel text={formatUSD(unclaimed.multipliedBy(layPrice || BN_ZERO))} />
      <UnclaimedAmount>
        <Image src={icon} alt={name} width={32} height={32} />
        <Reel text={formatAmt(unclaimed, { symbol, decimalPlaces: 2 })} />
      </UnclaimedAmount>
      <ClaimButton onClick={claim}>{t`Claim`}</ClaimButton>
    </UnclaimedRewardDiv>
  )
})``

const UnclaimedAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-right: 32px;
  border-radius: 12px;
  background: ${trueBlack}52;
  ${Reel} {
    font-size: 18px;
    font-weight: ${fontWeightSemiBold};
  }
`
const ClaimButton = styled.button`
  padding: 16px;
  width: 100%;
  border-radius: 4px;
  background-color: ${purple};
  backdrop-filter: blur(16px) brightness(1.16);
  text-align: center;
  :disabled {
    background-color: rgba(255, 255, 255, 0.16);
    opacity: 0.32;
  }
`
const UnclaimedRewardDiv = styled.div`
  padding: 32px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px) brightness(1.16);
  p:first-child {
    font-size: 18px;
    font-weight: ${fontWeightMedium};
  }
  > ${Reel} {
    margin-top: 16px;
    font-size: 32px;
    font-weight: ${fontWeightBold};
  }
  ${UnclaimedAmount} {
    margin-top: 16px;
  }
  ${ClaimButton} {
    margin-top: 24px;
  }
`
