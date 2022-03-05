import { BigNumber } from '@starlay-finance/math-utils'
import { IconArrowRight } from 'src/assets/svgs'
import { asStyled } from 'src/components/hoc/asStyled'
import { darkPurple, purple, trueBlack } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Item } from './Item'
import { ItemLabelProps } from './ItemLabel'

type NumberItemProps = ItemLabelProps & {
  num: BigNumber
  format: (num: BigNumber) => string
}
export const NumberItem = asStyled<NumberItemProps>(
  ({ num, format, ...props }) => <Item value={format(num)} {...props} />,
)``

type NumberItemWithDiffProps = {
  label: string
  current?: BigNumber
  after?: BigNumber | string
  formatter: (num: BigNumber) => string
}
export const NumberItemWithDiff = asStyled<NumberItemWithDiffProps>(
  ({ label, current, after, formatter }) => (
    <ItemDiv>
      <span>{label}</span>
      <Calculation>
        <span>{current ? formatter(current) : '-'}</span>
        {after != undefined ? (
          <>
            <ArrowsSpan>
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowRight />
            </ArrowsSpan>
            <span>{typeof after === 'string' ? after : formatter(after)}</span>
          </>
        ) : (
          <></>
        )}
      </Calculation>
    </ItemDiv>
  ),
)``

const ArrowsSpan = styled.span`
  ${flexCenter};
  margin: 0 8px;
  svg {
    width: 8px;
    height: 8px;
    fill: ${purple};
  }
`

const Calculation = styled.div`
  display: flex;
  column-gap: 4px;
  color: ${trueBlack};
`

const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid ${darkPurple}3a;
`
