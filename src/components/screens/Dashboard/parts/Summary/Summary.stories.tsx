import { BigNumber } from '@starlay-finance/math-utils'
import { withKnobs } from '@storybook/addon-knobs'
import { useEffect } from 'react'
import { disableSVGAnimation } from 'src/__tests__/utils/disableAnimation'
import { bignumber } from 'src/__tests__/utils/knobsHelper'
import { purple } from 'src/styles/colors'
import { BN_HUNDRED, BN_ONE, BN_ZERO } from 'src/utils/number'
import { isScreenshot } from 'storycap'
import { BalanceItem } from './BalanceItem'
import { BorrowLimit } from './BorrowLimit'
import { NetAPY } from './NetAPY'

export default {
  title: 'screens/Dashboard/parts/Summary',
  parameters: { screenshot: { skip: true } },
  decorators: [withKnobs],
}

export const BalanceComponent = () => {
  const valueInUSD = bignumber('valueInUSD', 0, BN_ZERO)
  return <BalanceItem label="Balance" color={purple} valueInUSD={valueInUSD} />
}

export const NetAPYComponent = () => {
  const netAPY = bignumber('netAPY', 0)
  useEffect(() => {
    if (isScreenshot()) disableSVGAnimation()
  }, [])
  return (
    <NetAPY
      netAPY={netAPY ? netAPY.div(BN_HUNDRED) : undefined}
      openWalletModal={() => {}}
    />
  )
}

export const BorrowLimitComponent = () => {
  const borrowLimitInUSD = bignumber('borrowLimitInUSD', 0)
  const borrowLimitUsed = bignumber('borrowLimitUsed', 0)
  return (
    <BorrowLimit
      borrowLimitInUSD={borrowLimitInUSD}
      borrowLimitUsed={
        borrowLimitUsed
          ? BigNumber.min(borrowLimitUsed.div(BN_HUNDRED), BN_ONE)
          : undefined
      }
      shouldShow
    />
  )
}
