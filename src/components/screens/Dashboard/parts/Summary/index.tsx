import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { Barometer } from 'src/components/parts/Chart/Barometer'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { blue, darkRed, lightYellow, purple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { UserSummary } from 'src/types/models'
import { formatAmtShort } from 'src/utils/number'
import styled from 'styled-components'
import { BalanceItem } from './BalanceItem'
import { BorrowLimit } from './BorrowLimit'
import { NetAPY } from './NetAPY'

const BAROMETER_COLORS = [blue, lightYellow, darkRed]
const healthFactorRatio = (healthFactor: BigNumber) => {
  if (healthFactor.gte('1.5')) return 0
  if (healthFactor.lt('1')) return 1
  return 1 - healthFactor.minus('1').div('0.5').toNumber()
}

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
      {summary.healthFactor?.isPositive() && (
        <Barometer
          label={t`Health Factor`}
          value={formatAmtShort(summary.healthFactor)}
          ratio={healthFactorRatio(summary.healthFactor)}
          colors={BAROMETER_COLORS}
        />
      )}
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

const BalanceSection = styled.section`
  ${BorrowLimit} {
    margin: 80px auto 0;
    padding: 24px 80px;
  }
  ${Barometer} {
    padding: 24px 104px;
  }
`
