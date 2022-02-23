import { LogoArthSwap, LogoAstar, LogoDIA } from 'src/assets/images/backers'
import { TopProps } from 'src/components/screens/Top'
import { ASSETS_DICT } from './assets'

// TODO fix display assets
export const TOP_ASSETS = [
  ASSETS_DICT.ASTR,
  ASSETS_DICT.WSDN,
  ASSETS_DICT.USDT,
  //
  ASSETS_DICT.USDC,
  ASSETS_DICT.ARSW,
  ASSETS_DICT.WETH,
  //
  ASSETS_DICT.USDT,
  ASSETS_DICT.WBTC,
  ASSETS_DICT.USDC,
  //
  ASSETS_DICT.WETH,
  ASSETS_DICT.LAY,
  ASSETS_DICT.WSDN,
]

export const TOP_BACKERS: TopProps['backers'] = [
  { name: 'Astar Network', Svg: LogoAstar },
  { name: 'ArthSwap', image: LogoArthSwap },
  { name: 'DIA', Svg: LogoDIA, containerStyle: { maxHeight: '108px' } },
]

export const TOP_PROPS: TopProps = {
  backers: TOP_BACKERS,
}
