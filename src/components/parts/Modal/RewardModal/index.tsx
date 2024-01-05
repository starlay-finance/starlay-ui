import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { FC } from 'react'
import { Image } from 'src/components/elements/Image'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ASSETS_DICT } from 'src/constants/assets'
import { useClaimer } from 'src/hooks/contracts/useClaimer'
import { useMarketData } from 'src/hooks/useMarketData'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useSwitchChainIfUnsupported } from 'src/hooks/useUnsupportedChainAlert'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { offWhite } from 'src/styles/colors'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import { BN_ZERO, formatAmt, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { SimpleCtaButton } from '../../Cta'
import { NumberItem } from '../parts'

const Reward: FC<ModalContentProps> = ({ close }) => {
  return (
    <DefaultModalContent
      headerNode={t`LAY Balance`}
      bodyNode={<RewardModalBody />}
      closeModal={close}
    />
  )
}

const RewardModalBody = () => {
  const { switchChainIfUnsupported } = useSwitchChainIfUnsupported()
  const { data: marketData } = useMarketData()
  const { data: balance } = useWalletBalance()
  const { data, claim } = useClaimer()

  const { icon, name, symbol } = ASSETS_DICT.DOT
  const unclaimed = data?.total || BN_ZERO
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
        <p>{formatUSD(totalInUSD, { shorteningThreshold: 8 })}</p>
      </SummaryDiv>
      <NumberItem
        label={t`Wallet Balance`}
        num={valueToBigNumber(inWallet)}
        format={formatter}
      />
      <NumberItem
        label={t`Unclaimed Reward`}
        num={valueToBigNumber(data?.rewards || BN_ZERO)}
        format={formatter}
      />
      {data && (
        <>
          {!data.ido.isZero() && (
            <NumberItem
              label={t`IDO on ArthSwap Vested`}
              num={valueToBigNumber(data.ido)}
              format={formatter}
            />
          )}
          {!data.tokenSale.isZero() && (
            <NumberItem
              label={t`Token Sale on Starlay Vested`}
              num={valueToBigNumber(data.tokenSale)}
              format={formatter}
            />
          )}
        </>
      )}
      <NumberItem
        label={t`Price`}
        num={priceInUSD}
        format={(num) => formatUSD(num, { decimalPlaces: 8 })}
      />
      <SimpleCtaButton
        onClick={switchChainIfUnsupported(claim)}
      >{t`CLAIM`}</SimpleCtaButton>
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
      color: ${offWhite};
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
  ${SimpleCtaButton} {
    margin-top: 48px;
  }
`

export const useRewardModal = () => useModalDialog(Reward)
