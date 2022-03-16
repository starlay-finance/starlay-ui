import { IconArrowRight } from 'src/assets/svgs'
import { asStyled } from 'src/components/hoc/asStyled'
import { darkPurple, purple, trueBlack } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled, { keyframes } from 'styled-components'
import { ItemLabel, ItemLabelProps } from './ItemLabel'

type ItemProps = ItemLabelProps & {
  value: string
}
export const Item = asStyled<ItemProps>(({ value, className, ...props }) => (
  <ItemDiv className={className}>
    <ItemLabel {...props} />
    <div>{value}</div>
  </ItemDiv>
))``

type ItemWithDiffProps = {
  label?: string
  current?: string
  after?: string
}
export const ItemWithDiff = asStyled<ItemWithDiffProps>(
  ({ label, current, after, className }) => (
    <ItemDiv className={className}>
      {label && <span>{label}</span>}
      <BeforeAfterDiv>
        <span>{current || '-'}</span>
        {after != undefined && (
          <>
            <AnimatedArrows />
            <span>{after}</span>
          </>
        )}
      </BeforeAfterDiv>
    </ItemDiv>
  ),
)``

const BeforeAfterDiv = styled.div`
  display: flex;
  column-gap: 4px;
  color: ${trueBlack};
`
const AnimatedArrows = () => (
  <ArrowsSpan>
    <IconArrowRight />
    <IconArrowRight />
    <IconArrowRight />
  </ArrowsSpan>
)

const blinkKeyframes = keyframes`
 0%, 100% {
   opacity: 0.5;
 }
 50% {
   opacity: 1;
 }
`

const ArrowsSpan = styled.span`
  ${flexCenter};
  margin: 0 8px;
  svg {
    width: 8px;
    height: 8px;
    color: ${purple};
    animation: ${blinkKeyframes} 1.5s infinite;
    :nth-child(2) {
      animation-delay: 0.375s;
    }
    :nth-child(3) {
      animation-delay: 0.75s;
    }
  }
`

export const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid ${darkPurple}3a;
  > div:last-child {
    color: ${trueBlack};
  }
`
