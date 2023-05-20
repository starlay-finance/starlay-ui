import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { FC, ReactNode } from 'react'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { Reel } from 'src/components/parts/Number/Reel'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import { ASSETS_DICT } from 'src/constants/assets'
import { useClaimer } from 'src/hooks/contracts/useClaimer'
import { useTokenSaleVesting } from 'src/hooks/contracts/useTokenSaleVesting'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useSwitchChainIfUnsupported } from 'src/hooks/useUnsupportedChainAlert'
import { useVoteData } from 'src/hooks/useVoteData'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { darkGray, primary, purple, trueBlack } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import {
  BN_ZERO,
  formatAmt,
  formatAmtShort,
  formatPct,
  formatUSD,
} from 'src/utils/number'
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

  const { switchChainIfUnsupported } = useSwitchChainIfUnsupported()
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
        {
          label: t`IDO on ArthSwap`,
          value: formatAmt(ido, { symbol, decimalPlaces: 2 }),
        },
        {
          label: t`Token Sale on Starlay`,
          value: formatAmt(tokenSale, { symbol, decimalPlaces: 2 }),
        },
      ]}
      actions={[
        {
          label: t`Claim`,
          onClick: switchChainIfUnsupported(claim),
          disabled: !data,
        },
      ]}
    />
  )
})``

export const WalletBalance = asStyled(({ className }) => {
  const { symbol } = ASSETS_DICT.LAY
  const { data: balances } = useWalletBalance(false)
  const { userData, isValidating } = useVotingEscrow()
  const { userData: vestingData } = useTokenSaleVesting()
  const inWallet = balances && balances[ASSETS_DICT.LAY.symbol]
  const lockable =
    inWallet &&
    vestingData &&
    BigNumber.sum(
      inWallet,
      vestingData.ido.lockable,
      vestingData.tokenSale.lockable,
    )
  const { open } = useLockModal()
  return (
    <LayBalance
      className={className}
      label={t`Lockable Balance`}
      amount={lockable}
      details={[
        {
          label: t`Wallet`,
          value: formatAmt(inWallet || BN_ZERO, { symbol, decimalPlaces: 2 }),
        },
        {
          label: t`IDO on ArthSwap`,
          value: formatAmt(vestingData?.ido.lockable || BN_ZERO, {
            symbol,
            decimalPlaces: 2,
          }),
          tooltip: t`You can use your unvested LAY from IDO on ArthSwap or Token Sale on Launchpad to acquire veLAY. You need to lock longer the vesting period.`,
        },
        {
          label: t`Token Sale on Starlay`,
          value: formatAmt(vestingData?.tokenSale.lockable || BN_ZERO, {
            symbol,
            decimalPlaces: 2,
          }),
          tooltip: t`You can use your unvested LAY from IDO on ArthSwap or Token Sale on Launchpad to acquire veLAY. You need to lock longer the vesting period.`,
        },
      ]}
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
  const { userData, withdraw, isValidating } = useVotingEscrow()
  const { data, userData: voteData } = useVoteData()
  const { data: layPrice } = useLAYPrice()
  const { open } = useLockModal()
  const { open: openMessageModal } = useMessageModal()

  const locked = userData?.locked || BN_ZERO
  const expired = userData?.lockedEnd.isBefore(dayjs())
  const claimable = voteData?.claimableTotalInUSD.gt(BN_ZERO)
  const lastWeekRewardInUSD =
    data &&
    voteData &&
    Object.keys(voteData.data)
      .filter((key) => voteData.data[key]?.vote.gt(BN_ZERO))
      .reduce((res, key) => {
        const voted = voteData.data[key]!.vote
        const { weight, lastWeekRevenueInUSD } = data.data[key]!
        const reward = lastWeekRevenueInUSD.times(voted.div(weight))
        return res.plus(reward)
      }, BN_ZERO)
  const estimatedAnnualReward =
    lastWeekRewardInUSD && lastWeekRewardInUSD.div(14).times(365)
  return (
    <LayBalance
      className={className}
      label={t`Locked LAY`}
      amount={userData?.locked || (isValidating ? undefined : BN_ZERO)}
      details={[
        {
          label: t`Locked Until`,
          value: userData?.lockedEnd.format('DD/MM/YYYY HH:mm:ss') || '-',
          tooltip: t`Your LAY is locked until this date and time. You cannot withdraw your LAY even partially until the date and time comes.`,
        },
        {
          label: t`Current Voting Power`,
          value: voteData ? formatAmtShort(voteData.powerTotal) : '-',
          tooltip: t`As the remaining lock period gets shorter, voting power decreases linearly.`,
        },
        {
          label: t`Current Est. Avg. APR`,
          value:
            locked.gt(BN_ZERO) && estimatedAnnualReward && layPrice
              ? formatPct(estimatedAnnualReward.div(locked.times(layPrice)))
              : '-',
          tooltip: t`The volume weighted average APR of assets you voted.`,
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
          : [
              {
                label: t`Withdraw`,
                onClick: claimable
                  ? () =>
                      openMessageModal({
                        title: t`Please Claim Rewards Before Withdrawing LAY`,
                        message: t`You need to claim rewards before withdrawing unlocked LAY.`,
                        type: 'Alert',
                      })
                  : withdraw,
                disabled: !voteData,
              },
            ]
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
    tooltip?: ReactNode
  }[]
  actions: {
    label: string
    onClick: VoidFunction
    disabled?: boolean
  }[]
}
const LayBalance = styled<FC<LayBalanceProps & { className?: string }>>(
  ({ label, amount, actions, details, className }) => {
    const { account } = useEVMWallet()
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
            {details.map(({ label, value, tooltip }) => (
              <DetailDiv key={label}>
                <span>
                  {label}
                  {tooltip && <TooltipMessage message={tooltip} />}
                </span>
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
  > span:first-child {
    display: flex;
    column-gap: 4px;
  }
  > span:last-child {
    color: ${primary}a3;
  }
  ${TooltipMessage} {
    width: 240px;
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
  backdrop-filter: blur(16px) brightness(1.08);
  text-align: center;
  transition: all 0.2s ease-in;
  :enabled:hover {
    background-color: ${purple};
  }
  :disabled {
    background-color: rgba(255, 255, 255, 0.08);
    opacity: 0.32;
  }
`
const LayBalanceDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
  padding: 32px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px) brightness(1.08);
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
