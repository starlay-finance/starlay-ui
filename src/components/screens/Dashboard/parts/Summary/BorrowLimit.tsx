import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useEffect, useState } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { BarChart, BarChartProps } from 'src/components/parts/Chart'
import { Reel } from 'src/components/parts/Reel'
import {
  darkPurple,
  darkRed,
  lightYellow,
  primary,
  purple,
  secondary,
  trueBlack,
} from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { formatUSD } from 'src/utils/number'
import styled, { css } from 'styled-components'

type BorrowLimitProps = {
  borrowLimitUsed: BigNumber | undefined
  borrowLimitInUSD: BigNumber | undefined
}
export const BorrowLimit = asStyled<BorrowLimitProps>(
  ({ borrowLimitUsed, borrowLimitInUSD, className }) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setShow(!!borrowLimitInUSD?.isPositive())
      }, 100)
    }, [borrowLimitInUSD])
    return (
      <BorrowLimitFigure className={className} show={show}>
        <figcaption>{t`Borrow Limit`}</figcaption>
        <BarChart
          ratio={borrowLimitUsed?.toNumber() || 0}
          filledStyles={CHART_COMPOSITION}
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

const CHART_COMPOSITION: BarChartProps['filledStyles'] = [
  { gte: 0, bgColor: purple },
  { gte: 50, bgColor: lightYellow, color: trueBlack },
  { gte: 80, bgColor: darkRed },
]

const BorrowLimitFigure = styled.figure<{ show: boolean }>`
  transition: all 0.2s ease-in;
  margin: 80px auto 0;
  padding: 24px 80px;
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
  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      height: 0;
      margin: 0;
    `}
`
