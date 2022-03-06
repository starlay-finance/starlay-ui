import { valueToBigNumber } from '@starlay-finance/math-utils'
import { ASSETS_DICT } from 'src/constants/assets'
import { AssetMarketData } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'

export const MOCK_ASSET_MARKET: AssetMarketData = {
  ...ASSETS_DICT.ASTR,
  depositAPY: valueToBigNumber(0.1215),
  variableBorrowAPY: valueToBigNumber(0.293),
  depositIncentiveAPR: valueToBigNumber(0.3181),
  variableBorrowIncentiveAPR: valueToBigNumber(1.3181),
  liquidity: valueToBigNumber(48200),
  liquidityInUSD: valueToBigNumber(4820000),
  totalDepositedInUSD: valueToBigNumber(8820000),
  totalBorrowedInUSD: valueToBigNumber(4000000),
  baseLTVasCollateral: valueToBigNumber(0.8),
  priceInMarketReferenceCurrency: valueToBigNumber(100),
  reserveLiquidationThreshold: BN_ZERO,
  liquidationPenalty: BN_ZERO,
  reserveFactor: BN_ZERO,
  usageAsCollateralEnabled: true,
  underlyingAsset: '0x0000000000000000000000000000000000000000',
  decimals: 18,
  lTokenAddress: '0x0000000000000000000000000000000000000000',
  vdTokenAddress: '0x0000000000000000000000000000000000000000',
  isActive: true,
  isFrozen: false,
  borrowingEnabled: true,
}
