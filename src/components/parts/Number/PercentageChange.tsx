import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { negative, positive } from 'src/styles/colors'
import { formatPct } from 'src/utils/number'
import styled from 'styled-components'

export type PercentageChangeProps = {
  current: BigNumber
  previous: BigNumber
}
export const PercentageChange = asStyled<PercentageChangeProps>(
  ({ current, previous, className }) => {
    const change = current.minus(previous).div(previous)
    if (change.isZero()) return <span className={className}>-</span>
    const isNegative = change.isNegative()
    return (
      <StyledSpan isNegative={isNegative} className={className}>
        {formatPct(change, { prefix: isNegative ? '' : '+' })}
      </StyledSpan>
    )
  },
)``

const StyledSpan = styled.span<{ isNegative: boolean }>`
  color: ${({ isNegative }) => (isNegative ? negative : positive)};
`
