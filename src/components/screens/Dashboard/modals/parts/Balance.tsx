import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { trueBlack } from 'src/styles/colors'
import { AssetSymbol } from 'src/types/models'
import { formatAmt } from 'src/utils/number'
import styled from 'styled-components'

type BalanceProps = {
  label: string
  balance: BigNumber
  symbol: AssetSymbol
}
export const Balance = asStyled<BalanceProps>(
  ({ label, balance, symbol, className }) => (
    <BalanceDiv className={className}>
      <span>{label}</span>
      <span>{formatAmt(balance, { symbol, shorteningThreshold: 20 })}</span>
    </BalanceDiv>
  ),
)``

const BalanceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  span:last-child {
    color: ${trueBlack};
  }
`
