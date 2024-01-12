import { StaticImageData } from 'next/image'
import {
  SymbolAseed,
  SymbolAstr,
  SymbolBnb,
  SymbolBusd,
  SymbolDai,
  SymbolDot,
  SymbolLay,
  SymbolMatic,
  SymbolNAstr,
  SymbolUsdc,
  SymbolUsdt,
  SymbolWbtc,
  SymbolWeth,
  SymbolWsdn,
} from 'src/assets/images'
import { Asset, AssetSymbol } from 'src/types/models'

export const LISTED_ASSET_SYMBOLS = [
  'ASTR',
  'DOT',
  'aSEED',
  'DAI',
  'USDC',
  'USDT',
  'ceUSDT',
  'BUSD',
  'WETH',
  'WBTC',
  'MATIC',
  'BNB',
  'SDN',
  // 'ARSW',
  'LAY',
  'nASTR',
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
  },
  DOT: {
    symbol: 'DOT',
    name: 'Polkadot',
    icon: SymbolDot,
    // borrowUnsupported: true,
    // makaiUnsupported: true,
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
  WASTR: {
    symbol: 'ASTR',
    name: 'Astar',
    icon: SymbolAstr,
  },
  WSDN: {
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
  ceUSDT: {
    symbol: 'ceUSDT',
    name: 'Celer USDT',
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
  aSEED: {
    symbol: 'aSEED',
    name: 'aUSD SEED',
    icon: SymbolAseed,
  },
  BNB: {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: SymbolBnb,
  },
  MATIC: {
    symbol: 'MATIC',
    name: 'Polygon Matic',
    icon: SymbolMatic,
  },
  LAY: {
    symbol: 'LAY',
    name: 'Starlay Token',
    icon: SymbolLay,
    borrowUnsupported: true,
  },
  nASTR: {
    symbol: 'nASTR',
    name: 'Liquid ASTR',
    icon: SymbolNAstr,
  },
} as const

export const ASSETS_BY_ADDRESS_DICT: Partial<Record<string, Asset>> = {
  '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283': {
    symbol: 'ceUSDT',
    name: 'Celer USDT',
    icon: SymbolUsdt,
  },
} as const

export const ASSETS: Asset[] = Object.values(ASSETS_DICT)

export const ARTHSWAP_ASSETS_DICT: {
  [key in string]: { symbol: string; icon: StaticImageData }
} = {
  ...ASSETS_DICT,
  WSDN: ASSETS_DICT.SDN,
} as const
