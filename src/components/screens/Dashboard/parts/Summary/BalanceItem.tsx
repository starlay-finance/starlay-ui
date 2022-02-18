import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Blink'
import { Reel } from 'src/components/parts/Reel'
import { fontWeightBold, fontWeightHeavy } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
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
  ${flexCenter};
  flex-direction: column;
  row-gap: 24px;
  span:first-child {
    font-size: 20px;
    font-weight: ${fontWeightHeavy};
    color: ${({ color }) => color};
  }
  span:last-child {
    font-size: 40px;
    font-weight: ${fontWeightBold};
  }
`
