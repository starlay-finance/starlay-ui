import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { Reel } from 'src/components/parts/Number/Reel'
import { fontWeightBold, fontWeightHeavy } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import { BN_ZERO, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const BalanceItem = asStyled<{
  color: Color
  label: string
  valueInUSD: BigNumber | undefined
}>(({ color, label, valueInUSD = BN_ZERO, className }) => {
  const displayValue = formatUSD(valueInUSD, { shorteningThreshold: 10 })
  return (
    <BalanceItemDiv color={color} className={className}>
      <span>{label}</span>
      <BlinkWrapper value={displayValue}>
        <Reel text={displayValue} />
      </BlinkWrapper>
    </BalanceItemDiv>
  )
})``

const BalanceItemDiv = styled.div<{ color: Color }>`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  span:first-child {
    font-size: 12px;
    font-weight: ${fontWeightHeavy};
    color: ${({ color }) => color};
  }
  span:last-child {
    font-size: 20px;
    font-weight: ${fontWeightBold};
  }
  @media ${breakpoint.m} {
    row-gap: 12px;
    justify-content: center;
    align-items: center;
    span:first-child {
      font-size: 16px;
    }
    span:last-child {
      font-size: 24px;
    }
  }
  @media ${breakpoint.l} {
    row-gap: 24px;
    span:first-child {
      font-size: 20px;
    }
    span:last-child {
      font-size: 40px;
    }
  }
`
