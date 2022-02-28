import {
  LogoArthSwap,
  LogoAstar,
  LogoAu21,
  LogoDFG,
  LogoDIA,
  LogoNextWebCapital,
} from 'src/assets/images/backers'
import { TopProps } from 'src/components/screens/Top'
import { ASSETS_DICT } from './assets'

export const TOP_ASSETS = [
  ASSETS_DICT.ASTR,
  ASSETS_DICT.SDN,
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
  ASSETS_DICT.SDN,
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
  {
    name: 'Next Web Capital',
    image: LogoNextWebCapital,
    url: 'https://nextweb.capital',
    containerStyle: { maxHeight: '144px' },
  },
  { name: 'DFG', Svg: LogoDFG, url: 'https://www.dfg.group' },
  {
    name: 'AU21 Capital',
    image: LogoAu21,
    url: 'https://au21.capital',
    containerStyle: { maxHeight: '144px' },
  },
]

export const TOP_PROPS: TopProps = {
  backers: TOP_BACKERS,
}
