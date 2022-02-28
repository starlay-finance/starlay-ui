import {
  SymbolArsw,
  SymbolAstr,
  SymbolLay,
  SymbolUsdc,
  SymbolUsdt,
  SymbolWbtc,
  SymbolWeth,
  SymbolWsdn,
} from 'src/assets/images'
import { Asset, AssetSymbol } from 'src/types/models'

export const LISTED_ASSET_SYMBOLS = [
  'ASTR',
  'USDC',
  'USDT',
  'WETH',
  'WBTC',
  'SDN',
  'ARSW',
  'LAY',
] as const

export const SYMBOL_ORDER: Record<AssetSymbol, number> = {
  ASTR: 0,
  USDC: 1,
  USDT: 2,
  WETH: 3,
  WBTC: 4,
  SDN: 5,
  ARSW: 6,
  LAY: 7,
}

export const ASSETS_DICT: { [key in AssetSymbol]: Asset } = {
  ASTR: {
    symbol: 'ASTR',
    name: 'Astar',
    icon: SymbolAstr,
    borrowUnsupported: true,
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
    name: 'Thether USD',
    icon: SymbolUsdt,
  },
  ARSW: {
    symbol: 'ARSW',
    name: 'ArthSwap Token',
    icon: SymbolArsw,
  },
  LAY: {
    symbol: 'LAY',
    name: 'Starlay Token',
    icon: SymbolLay,
  },
} as const

export const ASSETS: Asset[] = Object.values(ASSETS_DICT)
