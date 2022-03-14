import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { Item, ItemDiv, ItemWithDiff } from './Item'
import { ItemLabelAstarPair, ItemLabelProps } from './ItemLabel'

type NumberItemProps = ItemLabelProps & {
  num: BigNumber
  format: (num: BigNumber) => string
}
export const NumberItem = asStyled<NumberItemProps>(
  ({ num, format, ...props }) => <Item value={format(num)} {...props} />,
)``

export const NumberItemAstarPair = asStyled<NumberItemProps>(
  ({ num, format, className, ...props }) => (
    <ItemDiv className={className}>
      <ItemLabelAstarPair {...props} />
      <div>{format(num)}</div>
    </ItemDiv>
  ),
)``

type NumberItemWithDiffProps = {
  label: string
  current?: BigNumber
  after?: BigNumber | string
  formatter: (num: BigNumber) => string
}
export const NumberItemWithDiff = asStyled<NumberItemWithDiffProps>(
  ({ label, current, after, formatter }) => (
    <ItemWithDiff
      label={label}
      current={current ? formatter(current) : '-'}
      after={
        after
          ? typeof after === 'string'
            ? after
            : formatter(after)
          : undefined
      }
    />
  ),
)``
