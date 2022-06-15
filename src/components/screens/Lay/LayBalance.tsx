import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { Reel } from 'src/components/parts/Number/Reel'
import { ASSETS_DICT } from 'src/constants/assets'
import { useClaimer } from 'src/hooks/contracts/useClaimer'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useVoteData } from 'src/hooks/useVoteData'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { darkGray, primary, purple, trueBlack } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

const EMTPY_DATA = {
  rewards: BN_ZERO,
  ido: BN_ZERO,
  tokenSale: BN_ZERO,
}
export const UnclaimedLAY = asStyled(({ className }) => {
  const { symbol } = ASSETS_DICT.LAY
  const { data, claim } = useClaimer()
  const { rewards, ido, tokenSale } = data || EMTPY_DATA
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
  const { userData } = useVotingEscrow()
  const { userData: voteData } = useVoteData()
  const { data: layPrice } = useLAYPrice()
  const locked = userData?.locked || BN_ZERO
  return (
    <LayBalance
      className={className}
      label={t`Locked LAY`}
      amount={locked}
      details={[
        {
          label: t`Locked Until`,
          value: userData?.lockedEnd.format('DD/MM/YYYY') || '-',
        },
        {
          label: t`Current APY`,
          value:
            locked.gt(BN_ZERO) && voteData && layPrice
              ? formatPct(
                  voteData.claimableTotalInUSD.div(locked).div(layPrice),
                )
              : '-',
        },
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
