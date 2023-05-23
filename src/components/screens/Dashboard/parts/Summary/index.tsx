import { t } from '@lingui/macro'
import { asStyled } from 'src/components/hoc/asStyled'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { lightYellow, purple } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
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
        <NetAPY
          netAPY={summary.netAPY}
          openWalletModal={!account ? open : undefined}
        />
        <div>
          <BalanceItem
            color={purple}
            label={t`Deposit Balance`}
            valueInUSD={summary.totalDepositedInUSD}
          />
          <BalanceItem
            color={lightYellow}
            label={t`Borrow Balance`}
            valueInUSD={summary.totalBorrowedInUSD}
          />
        </div>
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
  position: relative;
  display: flex;
  column-gap: 32px;
`
const BorrowLimitDiv = styled.div``
const HealthFactorDiv = styled.div``

const BalanceSection = styled.section`
  ${BalanceDiv} {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 10px;
    }
  }
  @media ${breakpoint.m} {
    ${BalanceDiv} {
      > div {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 320px;
        ${BalanceItem} {
          flex: 1;
        }
      }
      ${NetAPY} {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`
