import _ from 'lodash'
import {
  SymbolAca,
  SymbolDot,
  SymbolLdot,
  SymbolUsdcet,
} from 'src/assets/images'
import { Asset, AssetSymbol } from 'src/types/models'

export const LISTED_ASSET_SYMBOLS = ['mACA', 'LDOT', 'USDC', 'DOT'] as const

export const SYMBOL_ORDER: Record<AssetSymbol, number> =
  LISTED_ASSET_SYMBOLS.reduce(
    (res, symbol, idx) => ({
      ...res,
      [symbol]: idx,
    }),
    {},
  ) as Record<AssetSymbol, number>

export const ASSETS_DICT: { [key in AssetSymbol]: Asset } = {
  mACA: {
    symbol: 'mACA',
    name: 'Acala',
    icon: SymbolAca,
  },
  LDOT: {
    symbol: 'LDOT',
    name: 'Liquid DOT',
    icon: SymbolLdot,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin (Portal from Ethereum)',
    icon: SymbolUsdcet,
  },
  DOT: {
    symbol: 'DOT',
    name: 'Polkadot',
    icon: SymbolDot,
  },
} as const

export const ASSETS_BY_ADDRESS_DICT: Partial<Record<string, Asset>> = {
  '0xA666dD28059deF0B45505c1f1a5f49fAd2e03c11': {
    symbol: 'USDC',
    name: 'USD Coin (Portal from Ethereum)',
    icon: SymbolUsdcet,
  },
} as const

export const ASSETS: Asset[] = Object.values(_.omit(ASSETS_DICT, 'mACA'))
