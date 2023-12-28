import {
  ASSETS,
  ASSETS_BY_ADDRESS_DICT,
  ASSETS_DICT,
  LISTED_ASSET_SYMBOLS,
} from 'src/constants/assets'
import { Asset, AssetSymbol, User } from 'src/types/models'
import { BN_ZERO } from './number'

export const isListed = (symbol: any): symbol is AssetSymbol =>
  LISTED_ASSET_SYMBOLS.includes(symbol)

export const onlyListed = <P extends { symbol: any }>(
  value: P,
): value is P & { symbol: AssetSymbol } => isListed(value.symbol)

export const assetFromSymbolAndAddress = (
  symbol: AssetSymbol,
  underlyingAsset: string,
): Asset | undefined =>
  ASSETS_BY_ADDRESS_DICT[underlyingAsset] || ASSETS_DICT[symbol]

export const generateSymbolDict = <T>(value: T): { [key in AssetSymbol]: T } =>
  ASSETS.reduce(
    (prev, { symbol }) => ({
      ...prev,
      [symbol]: value,
    }),
    {},
  ) as { [key in AssetSymbol]: T }

export const EMPTY_BALANCE_BY_ASSET: User['balanceByAsset'] =
  generateSymbolDict({
    deposited: BN_ZERO,
    borrowed: BN_ZERO,
    usageAsCollateralEnabled: false,
  })
