import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { BarChart, BarChartStyleProps } from 'src/components/parts/Chart'
import { Reel } from 'src/components/parts/Reel'
import {
  blue,
  darkPurple,
  darkRed,
  lightYellow,
  primary,
  secondary,
} from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { formatUSD } from 'src/utils/number'
import styled from 'styled-components'

type BorrowLimitProps = {
  borrowLimitUsed: BigNumber | undefined
  borrowLimitInUSD: BigNumber | undefined
}
export const BorrowLimit = asStyled<BorrowLimitProps>(
  ({ borrowLimitUsed, borrowLimitInUSD, className }) => {
    return (
      <BorrowLimitFigure className={className}>
        <figcaption>{t`Borrow Limit`}</figcaption>
        <BarChart
          ratio={borrowLimitUsed?.toNumber() || 0}
          filled={CHART_COMPOSITION}
          unfilled={`${darkPurple}a3`}
          showLabel
        />
        <figcaption>
          {borrowLimitInUSD ? (
            <Reel
              text={formatUSD(borrowLimitInUSD, {
                shorteningThreshold: 5,
                decimalPlaces: 2,
              })}
            />
          ) : (
            '-'
          )}
        </figcaption>
      </BorrowLimitFigure>
    )
  },
)``

const CHART_COMPOSITION: BarChartStyleProps['filled'] = [
  { gte: 0, color: blue },
  { gte: 50, color: lightYellow },
  { gte: 80, color: darkRed },
]

const BorrowLimitFigure = styled.figure`
  ${flexCenter};
  position: relative;
  width: 100%;
  column-gap: 16px;
  backdrop-filter: blur(8px) brightness(0.8);
  figcaption {
    width: 96px;
    color: ${secondary};
  }
  > ${BarChart} {
    flex: 1;
    height: 3px;
    color: ${primary};
  }
`
