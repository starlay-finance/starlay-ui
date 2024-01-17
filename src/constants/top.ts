import {
  LogoAcala,
  LogoArthSwap,
  LogoAstar,
  LogoAstarDegens,
  LogoAu21,
  LogoDFG,
  LogoDIA,
  LogoNextWebCapital,
  LogoTRGC,
} from 'src/assets/images/backers'
import { TopProps } from 'src/components/screens/Top'
import { ASSETS_DICT } from './assets'

export const TOP_ASSETS = [
  ASSETS_DICT.DOT,
  ASSETS_DICT.LDOT,
  ASSETS_DICT.USDC,

  //
  ASSETS_DICT.LDOT,
  ASSETS_DICT.USDC,
  ASSETS_DICT.DOT,
  //
  ASSETS_DICT.USDC,
  ASSETS_DICT.DOT,
  ASSETS_DICT.LDOT,
]

export const TOP_BACKERS: TopProps['backers'] = [
  { name: 'Astar Network', Svg: LogoAstar, url: 'https://astar.network' },
  { name: 'ArthSwap', Svg: LogoArthSwap, url: 'https://app.arthswap.org' },
  {
    name: 'Astar Degens',
    Svg: LogoAstarDegens,
    url: 'https://www.astardegens.com',
  },
  {
    name: 'DIA',
    Svg: LogoDIA,
    url: 'https://www.diadata.org',
    containerStyle: { maxHeight: '140px' },
  },
  {
    name: 'Next Web Capital',
    Svg: LogoNextWebCapital,
    url: 'https://nextweb.capital',
    containerStyle: { maxHeight: '200px' },
  },
  { name: 'TRGC', Svg: LogoTRGC, url: 'https://trgc.io' },
  {
    name: 'DFG',
    Svg: LogoDFG,
    url: 'https://www.dfg.group',
    containerStyle: { maxHeight: '140px' },
  },
  {
    name: 'AU21 Capital',
    Svg: LogoAu21,
    url: 'https://au21.capital',
    containerStyle: { maxHeight: '140px' },
  },
  {
    name: 'Acala Network',
    Svg: LogoAcala,
    url: 'https://acala.network',
    containerStyle: { maxHeight: '180px' },
  },
]

export const TOP_PROPS: TopProps = {
  backers: TOP_BACKERS,
}
