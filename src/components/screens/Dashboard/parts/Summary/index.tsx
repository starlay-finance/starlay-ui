import { t } from '@lingui/macro'
import { asStyled } from 'src/components/hoc/asStyled'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { lightYellow, purple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { UserSummary } from 'src/types/models'
import styled from 'styled-components'
import { BalanceItem } from './BalanceItem'
import { BorrowLimit } from './BorrowLimit'
import { HealthFactor } from './HealthFactor'
import { NetAPY } from './NetAPY'

export const Summary = asStyled(({ className }) => {
  const { account } = useWallet()
  const { data: user } = useUserData()
  const { open } = useWalletModal()
  const summary: Partial<UserSummary> = user?.summary || {}
  return (
    <BalanceSection className={className}>
      <BalanceDiv>
        <BalanceItem
          color={purple}
          label={t`Deposit Balance`}
          valueInUSD={summary.totalDepositedInUSD}
        />
        <NetAPY
          netAPY={summary.netAPY}
          openWalletModal={!account ? open : undefined}
        />
        <BalanceItem
          color={lightYellow}
          label={t`Borrow Balance`}
          valueInUSD={summary.totalBorrowedInUSD}
        />
      </BalanceDiv>
      <BorrowLimit
        borrowLimitUsed={summary.borrowLimitUsed}
        borrowLimitInUSD={summary.borrowLimitInUSD}
      />
      <HealthFactor healthFactor={summary.healthFactor} />
    </BalanceSection>
  )
})``

const BalanceDiv = styled.div`
  ${flexCenter};
  column-gap: 80px;
  ${BalanceItem} {
    flex: 1;
  }
`

const BalanceSection = styled.section``
