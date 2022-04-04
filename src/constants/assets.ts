import {
  SymbolArsw,
  SymbolAstr,
  SymbolBnb,
  SymbolBusd,
  SymbolDai,
  SymbolLay,
  SymbolMatic,
  SymbolUsdc,
  SymbolUsdt,
  SymbolWbtc,
  SymbolWeth,
  SymbolWsdn,
} from 'src/assets/images'
import { Asset, AssetSymbol } from 'src/types/models'

export const LISTED_ASSET_SYMBOLS = [
  'ASTR',
  'DAI',
  'USDC',
  'USDT',
  'BUSD',
  'WETH',
  'WBTC',
  'SDN',
  'ARSW',
  'LAY',
] as const

export const SYMBOL_ORDER: Record<AssetSymbol, number> =
  LISTED_ASSET_SYMBOLS.reduce(
    (res, symbol, idx) => ({
      ...res,
      [symbol]: idx,
    }),
    {},
  ) as Record<AssetSymbol, number>

export const ASSETS_DICT: { [key in AssetSymbol]: Asset } = {
  ASTR: {
    symbol: 'ASTR',
    name: 'Astar',
    icon: SymbolAstr,
    makaiUnsupported: true,
  },
  WETH: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: SymbolWeth,
  },
  WBTC: {
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: SymbolWbtc,
  },
  SDN: {
    symbol: 'SDN',
    displaySymbol: 'WSDN',
    name: 'Wrapped SDN',
    icon: SymbolWsdn,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: SymbolUsdc,
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: SymbolUsdt,
  },
  DAI: {
    symbol: 'DAI',
    name: 'DAI',
    icon: SymbolDai,
  },
  BUSD: {
    symbol: 'BUSD',
    name: 'Binance USD',
    icon: SymbolBusd,
  },
  ARSW: {
    symbol: 'ARSW',
    name: 'ArthSwap Token',
    icon: SymbolArsw,
    borrowUnsupported: true,
  },
  LAY: {
    symbol: 'LAY',
    name: 'Starlay Token',
    icon: SymbolLay,
    borrowUnsupported: true,
  },
} as const

export const ASSETS: Asset[] = Object.values(ASSETS_DICT)

export const ARTHSWAP_ASSETS_DICT: {
  [key in string]: { symbol: string; icon: StaticImageData }
} = {
  ...ASSETS_DICT,
  BNB: {
    symbol: 'BNB',
    icon: SymbolBnb,
  },
  MATIC: {
    symbol: 'MATIC',
    icon: SymbolMatic,
  },
} as const
