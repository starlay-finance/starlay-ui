import {
  LogoArthSwap,
  LogoAstar,
  LogoDFG,
  LogoDIA,
} from 'src/assets/images/backers'
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
  { name: 'Astar Network', Svg: LogoAstar, url: 'https://astar.network' },
  { name: 'ArthSwap', image: LogoArthSwap, url: 'https://app.arthswap.org' },
  {
    name: 'DIA',
    Svg: LogoDIA,
    url: 'https://www.diadata.org',
    containerStyle: { maxHeight: '108px' },
  },
  { name: 'DFG', Svg: LogoDFG, url: 'https://www.dfg.group' },
]

export const TOP_PROPS: TopProps = {
  backers: TOP_BACKERS,
}
