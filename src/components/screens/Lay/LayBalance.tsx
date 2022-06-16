import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { Reel } from 'src/components/parts/Number/Reel'
import { ASSETS_DICT } from 'src/constants/assets'
import { useClaimer } from 'src/hooks/contracts/useClaimer'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useVoteData } from 'src/hooks/useVoteData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { darkGray, primary, purple, trueBlack } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { useLockModal } from './modals/LockModal'

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
      amount={data && BigNumber.sum(rewards, ido, tokenSale)}
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
      actions={[{ label: t`Claim`, onClick: claim, disabled: !data }]}
    />
  )
})``

export const WalletBalance = asStyled(({ className }) => {
  const { data: balances } = useWalletBalance()
  const { userData, isValidating } = useVotingEscrow()
  const { open } = useLockModal()
  return (
    <LayBalance
      className={className}
      label={t`Wallet Balance`}
      amount={balances[ASSETS_DICT.LAY.symbol]}
      actions={[
        {
          label: t`Lock`,
          onClick: open,
          disabled: isValidating || !!userData,
        },
      ]}
    />
  )
})``

export const LockedLAY = asStyled(({ className }) => {
  const { userData, withdraw } = useVotingEscrow()
  const { userData: voteData } = useVoteData()
  const { data: layPrice } = useLAYPrice()
  const { open } = useLockModal()

  const locked = userData?.locked || BN_ZERO
  const expired = userData?.lockedEnd.isBefore(dayjs())
  return (
    <LayBalance
      className={className}
      label={t`Locked LAY`}
      amount={userData?.locked}
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
      actions={
        !expired
          ? [
              {
                label: t`Add`,
                onClick: () => open({ mode: 'amount', current: userData }),
                disabled: !userData,
              },
              {
                label: t`Extend`,
                onClick: () => open({ mode: 'duration', current: userData }),
                disabled: !userData,
              },
            ]
          : [{ label: t`Withdraw`, onClick: withdraw }]
      }
    />
  )
})``

type LayBalanceProps = {
  label: string
  amount: BigNumber | undefined
  details?: {
    label: string
    value: string
  }[]
  actions: {
    label: string
    onClick: VoidFunction
    disabled?: boolean
  }[]
}
const LayBalance = styled<VFC<LayBalanceProps & { className?: string }>>(
  ({ label, amount, actions, details, className }) => {
    const { account } = useWallet()
    const { icon, name, symbol } = ASSETS_DICT.LAY
    const { data: priceInUSD = BN_ZERO } = useLAYPrice()
    return (
      <LayBalanceDiv className={className}>
        <p>{label}</p>
        <AmountInUSDDiv>
          {amount ? (
            <Reel text={formatUSD(amount.multipliedBy(priceInUSD))} />
          ) : (
            <ShimmerPlaceholder />
          )}
        </AmountInUSDDiv>
        <LayAmount>
          <Image src={icon} alt={name} width={32} height={32} />
          {amount ? (
            <Reel text={formatAmt(amount, { symbol, decimalPlaces: 2 })} />
          ) : (
            <ShimmerPlaceholder />
          )}
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
          {actions.map(({ label, onClick, disabled }) => (
            <Button
              key={label}
              onClick={onClick}
              disabled={!account || disabled}
            >
              {label}
            </Button>
          ))}
        </ActionsDiv>
      </LayBalanceDiv>
    )
  },
)``
const AmountInUSDDiv = styled.div``
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
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};

  ${ShimmerPlaceholder} {
    width: 50%;
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
  > ${AmountInUSDDiv} {
    margin-top: 16px;
    font-size: 32px;
    font-weight: ${fontWeightBold};
    ${ShimmerPlaceholder} {
      width: 75%;
    }
  }
  ${LayAmount} {
    margin-top: 16px;
  }
  ${ActionsDiv} {
    margin-top: auto;
  }
`
