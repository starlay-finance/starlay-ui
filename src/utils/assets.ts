import { ASSETS, ASSETS_DICT, LISTED_ASSET_SYMBOLS } from 'src/constants/assets'
import { Asset, AssetSymbol } from 'src/types/models'

export const isListed = (symbol: any): symbol is AssetSymbol =>
  LISTED_ASSET_SYMBOLS.includes(symbol)

export const onlyListed = <P extends { symbol: any }>(
  value: P,
): value is P & { symbol: AssetSymbol } => isListed(value.symbol)

export const assetFromSymbol = (symbol: AssetSymbol): Asset =>
  ASSETS_DICT[symbol]

export const generateSymbolDict = <T>(value: T): { [key in AssetSymbol]: T } =>
  ASSETS.reduce(
    (prev, { symbol }) => ({
      ...prev,
      [symbol]: value,
    }),
    {},
  ) as { [key in AssetSymbol]: T }
