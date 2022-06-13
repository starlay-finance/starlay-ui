import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { Reel } from 'src/components/parts/Number/Reel'
import { ASSETS_DICT } from 'src/constants/assets'
import { useIncentivesController } from 'src/hooks/contracts/useIncentivesController'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { darkGray, primary, purple, trueBlack } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { BN_ZERO, formatAmt, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const UnclaimedLAY = asStyled(({ className }) => {
  const { symbol } = ASSETS_DICT.LAY
  const { account, signer } = useWallet()
  const { data: user } = useUserData()
  const { claim } = useIncentivesController(account, signer)
  const rewards = user?.rewards.unclaimedBalance || BN_ZERO
  // TODO replace mock value
  const ido = BN_ZERO
  const tokenSale = BN_ZERO
  return (
    <LayBalance
      className={className}
      label={t`Unclaimed LAY`}
      amount={BigNumber.sum(rewards, ido, tokenSale)}
      details={[
        {
          label: t`Rewards`,
          value: formatAmt(rewards, { symbol, decimalPlaces: 2 }),
        },
        { label: t`IDO`, value: formatAmt(ido, { symbol, decimalPlaces: 2 }) },
        {
          label: t`Token Sale`,
          value: formatAmt(tokenSale, { symbol, decimalPlaces: 2 }),
        },
      ]}
      actions={[{ label: t`Claim`, onClick: claim }]}
    />
  )
})``

export const WalletBalance = asStyled(({ className }) => {
  const { data: balances } = useWalletBalance()
  return (
    <LayBalance
      className={className}
      label={t`Wallet Balance`}
      amount={(balances && balances[ASSETS_DICT.LAY.symbol]) || BN_ZERO}
      actions={[{ label: t`Lock`, onClick: () => {} }]}
    />
  )
})``

export const LockedLAY = asStyled(({ className }) => {
  // TODO replace mock value
  const lockedAmount = BN_ZERO
  const lockedUntil = 'May, 6 12:00 UTC'
  const currentAPY = '5.61%'
  return (
    <LayBalance
      className={className}
      label={t`Locked LAY`}
      amount={lockedAmount}
      details={[
        { label: t`Locked Until`, value: lockedUntil },
        { label: t`Current APY`, value: currentAPY },
      ]}
      actions={[
        { label: t`Add`, onClick: () => {} },
        { label: t`Extend`, onClick: () => {} },
      ]}
    />
  )
})``

type LayBalanceProps = {
  label: string
  amount: BigNumber
  details?: {
    label: string
    value: string
  }[]
  actions: {
    label: string
    onClick: VoidFunction
  }[]
}
const LayBalance = styled<VFC<LayBalanceProps & { className?: string }>>(
  ({ label, amount, actions, details, className }) => {
    const { icon, name, symbol } = ASSETS_DICT.LAY
    const { data: priceInUSD = BN_ZERO } = useLAYPrice()
    return (
      <LayBalanceDiv className={className}>
        <p>{label}</p>
        <Reel text={formatUSD(amount.multipliedBy(priceInUSD))} />
        <LayAmount>
          <Image src={icon} alt={name} width={32} height={32} />
          <Reel text={formatAmt(amount, { symbol, decimalPlaces: 2 })} />
        </LayAmount>
        {details && (
          <DetailsDiv>
            {details.map(({ label, value }) => (
              <DetailDiv key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </DetailDiv>
            ))}
          </DetailsDiv>
        )}
        <ActionsDiv>
          {actions.map(({ label, onClick }) => (
            <Button key={label} onClick={onClick}>
              {label}
            </Button>
          ))}
        </ActionsDiv>
      </LayBalanceDiv>
    )
  },
)``

const ActionsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
`

const DetailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span:last-child {
    color: ${primary}a3;
  }
`

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid ${darkGray}7a;
  border-bottom: 1px solid ${darkGray}7a;

  font-size: 14px;
  font-weight: ${fontWeightSemiBold};
`

const LayAmount = styled.div`
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
const Button = styled.button`
  padding: 16px;
  width: 100%;
  border-radius: 4px;
  background-color: ${darkGray};
  backdrop-filter: blur(16px) brightness(1.16);
  text-align: center;
  transition: all 0.2s ease-in;
  :enabled:hover {
    background-color: ${purple};
  }
  :disabled {
    background-color: rgba(255, 255, 255, 0.16);
    opacity: 0.32;
  }
`
const LayBalanceDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
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
  ${LayAmount} {
    margin-top: 16px;
  }
  ${ActionsDiv} {
    margin-top: auto;
  }
`
