import { asStyled } from 'src/components/hoc/asStyled'
import { darkPurple, trueBlack } from 'src/styles/colors'
import styled from 'styled-components'
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

const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid ${darkPurple}3a;
  > div:last-child {
    color: ${trueBlack};
  }
`
