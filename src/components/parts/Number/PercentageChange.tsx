import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { negative, positive, secondary } from 'src/styles/colors'
import { BN_NAN, BN_ZERO, formatPct } from 'src/utils/number'
import styled from 'styled-components'

export type PercentageChangeProps = {
  current: BigNumber
  previous?: BigNumber
  isPercentage?: boolean
}
export const PercentageChange = asStyled<PercentageChangeProps>(
  ({ className, ...props }) => {
    const change = calcChange(props)
    const isNegative = change.isNegative()
    return (
      <StyledSpan
        isNegative={isNegative}
        isZeroOrNaN={change.isZero() || change.isNaN()}
        className={className}
      >
        {change.isNaN()
          ? '-'
          : formatPct(change, { prefix: isNegative ? '' : '+' })}
      </StyledSpan>
    )
  },
)``

const calcChange = ({
  current,
  previous,
  isPercentage,
}: PercentageChangeProps) => {
  if (!previous) return BN_NAN
  if (current.eq(previous)) return BN_ZERO
  if (isPercentage) return current.minus(previous)
  if (previous.isZero()) return BN_NAN
  return current.minus(previous).div(previous)
}

const StyledSpan = styled.span<{ isNegative: boolean; isZeroOrNaN: boolean }>`
  color: ${({ isZeroOrNaN, isNegative }) =>
    isZeroOrNaN ? secondary : isNegative ? negative : positive};
`
