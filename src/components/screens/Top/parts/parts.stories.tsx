import { boolean, withKnobs } from '@storybook/addon-knobs'
import { ASSETS } from 'src/constants/assets'
import { MarketComposition } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'
import { bignumber } from 'src/__tests__/utils/knobsHelper'
import { AssetsComponent } from './Assets'
import { CurrentMarketsComponent } from './CurrentMarkets'

export default {
  title: 'screens/Top/parts',
  parameters: { screenshot: { skip: true } },
  decorators: [withKnobs],
}

export const Assets = () => {
  const loading = boolean('Loading', false)
  const depositAPY = bignumber('depositAPY', 0, BN_ZERO)
  const variableBorrowAPY = bignumber('variableBorrowAPY', 0, BN_ZERO)
  return (
    <AssetsComponent
      assets={ASSETS}
      markets={
        loading
          ? []
          : ASSETS.map(({ symbol }) => ({
              symbol,
              depositAPY,
              variableBorrowAPY,
            }))
      }
    />
  )
}

export const CurrentMarkets = () => {
  const touched = boolean('InView', true)
  const totalInUSD = bignumber('TotalInUSD', 100, BN_ZERO)
  const amountInUSD1 = bignumber('amountInUSD1', 50, BN_ZERO)
  const amountInUSD2 = bignumber('amountInUSD2', 20, BN_ZERO)
  const amountInUSD3 = bignumber('amountInUSD3', 15, BN_ZERO)
  const market = {
    totalInUSD,
    amountByAssets: [
      { symbol: 'LAY', amountInUSD: amountInUSD1 },
      { symbol: 'WETH', amountInUSD: amountInUSD2 },
      { symbol: 'WBTC', amountInUSD: amountInUSD3 },
    ],
  } as MarketComposition
  return (
    <CurrentMarketsComponent
      borrow={market}
      deposit={market}
      touched={touched}
    />
  )
}
