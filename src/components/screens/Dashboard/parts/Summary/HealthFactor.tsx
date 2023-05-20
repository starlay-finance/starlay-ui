import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useEffect, useState } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { Barometer } from 'src/components/parts/Chart/Barometer'
import { Reel } from 'src/components/parts/Number/Reel'
import { blue, darkRed, lightYellow } from 'src/styles/colors'
import { formatAmtShort } from 'src/utils/number'
import styled, { css } from 'styled-components'

const BAROMETER_COLORS = [blue, lightYellow, darkRed]
const healthFactorRatio = (healthFactor: BigNumber) => {
  if (healthFactor.gte('1.5')) return 0
  if (healthFactor.lt('1')) return 1
  return 1 - healthFactor.minus('1').div('0.5').toNumber()
}

export const HealthFactor = asStyled<{
  healthFactor: BigNumber | undefined
}>(({ healthFactor, className }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(!!healthFactor?.isPositive())
    }, 100)
  }, [healthFactor])
  return (
    <HealthFactorDiv show={show} className={className}>
      {healthFactor && (
        <Barometer
          label={t`Health Factor`}
          value={<Reel text={formatAmtShort(healthFactor)} />}
          ratio={healthFactorRatio(healthFactor)}
          colors={BAROMETER_COLORS}
        />
      )}
    </HealthFactorDiv>
  )
})``
const HealthFactorDiv = styled.div<{ show: boolean }>`
  transition: all 0.2s ease-out;
  height: 0;
  > figure {
    transition: all 1s ease-in;
    opacity: 0;
    > div {
      transition: all 1s ease-in;
      clip-path: inset(0% 50%);
      ::after {
        transition: all 0.75s 1s ease-out;
        clip-path: circle(0%);
      }
    }
  }
  ${({ show }) =>
    show &&
    css`
      height: unset;
      > figure {
        opacity: 1;
        > div {
          clip-path: inset(-100% -50%);
          ::after {
            clip-path: circle(100%);
          }
        }
      }
    `}
`
