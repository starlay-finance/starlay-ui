import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ASSETS_DICT } from 'src/constants/assets'
import { useMarketData } from 'src/hooks/useMarketData'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useUserData } from 'src/hooks/useUserData'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { trueBlack } from 'src/styles/colors'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import { BN_ZERO, formatAmt, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { NumberItem } from '../parts'

const Reward: VFC<ModalContentProps> = ({ close }) => {
  return (
    <DefaultModalContent
      headerNode={t`LAY Balance`}
      bodyNode={<RewardModalBody />}
      closeModal={close}
    />
  )
}

const RewardModalBody = () => {
  const { locale } = useRouter()
  const { data: marketData } = useMarketData()
  const { data: user } = useUserData()
  const { data: balance } = useWalletBalance()
  const { icon, name, symbol } = ASSETS_DICT.LAY
  const unclaimed = user?.rewards.unclaimedBalance || BN_ZERO
  const inWallet = balance?.LAY || BN_ZERO
  const total = unclaimed.plus(inWallet)
  const priceInUSD = (
    marketData?.marketReferenceCurrencyPriceInUSD || BN_ZERO
  ).multipliedBy(
    marketData?.assets.find((asset) => asset.symbol === symbol)
      ?.priceInMarketReferenceCurrency || BN_ZERO,
  )
  const totalInUSD = total.multipliedBy(priceInUSD)

  return (
    <BodyDiv>
      <SummaryDiv>
        <Image src={icon} alt={name} width={80} height={80} />
        <p>{formatter(total)}</p>
        {locale !== 'ja' && (
          <p>{formatUSD(totalInUSD, { shorteningThreshold: 8 })}</p>
        )}
      </SummaryDiv>
      <NumberItem
        label={t`Wallet Balance`}
        num={valueToBigNumber(inWallet)}
        format={formatter}
      />
      <NumberItem
        label={t`Unclaimed Balance`}
        num={valueToBigNumber(unclaimed)}
        format={formatter}
      />
      {locale !== 'ja' && (
        <NumberItem label={t`Price`} num={priceInUSD} format={formatUSD} />
      )}
    </BodyDiv>
  )
}

const formatter = (num: BigNumber) => formatAmt(num, { decimalPlaces: 18 })

const SummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
  > {
    p:nth-of-type(1) {
      margin-top: 16px;
      font-size: 24px;
      color: ${trueBlack};
    }
    p:nth-of-type(2) {
      font-size: 14px;
      font-weight: ${fontWeightMedium};
    }
  }
`

const BodyDiv = styled.div`
  padding: 32px;
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};
  ${SummaryDiv} {
    margin-bottom: 16px;
  }
`

export const useRewardModal = () => useModalDialog(Reward)
