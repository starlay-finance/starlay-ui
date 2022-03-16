import { BigNumber } from '@starlay-finance/math-utils'
import { LISTED_ASSET_SYMBOLS } from 'src/constants/assets'
import { EthereumAddress } from './web3'

export type AssetSymbol = typeof LISTED_ASSET_SYMBOLS[number]

export type Asset = {
  symbol: AssetSymbol
  displaySymbol?: string
  icon: StaticImageData
  name: string
  borrowUnsupported?: boolean
}

export type AssetMarketData = Asset & {
  depositAPY: BigNumber
  variableBorrowAPY: BigNumber
  depositIncentiveAPR: BigNumber
  variableBorrowIncentiveAPR: BigNumber
  liquidity: BigNumber
  liquidityInUSD: BigNumber
  totalDepositedInUSD: BigNumber
  totalBorrowedInUSD: BigNumber
  baseLTVasCollateral: BigNumber
  priceInMarketReferenceCurrency: BigNumber
  reserveLiquidationThreshold: BigNumber
  usageAsCollateralEnabled: boolean
  reserveFactor: BigNumber
  liquidationPenalty: BigNumber
  underlyingAsset: EthereumAddress
  decimals: number
  lTokenAddress: EthereumAddress
  vdTokenAddress: EthereumAddress
  isActive: boolean
  isFrozen: boolean
  borrowingEnabled: boolean
}

export type MarketComposition = {
  totalInUSD: BigNumber
  amountByAssets: {
    symbol: AssetSymbol
    amountInUSD: BigNumber
  }[]
}

export type MarketCompositions = {
  deposit: MarketComposition
  borrow: MarketComposition
}

export type User = {
  summary: UserSummary
  balanceByAsset: {
    [key in AssetSymbol]: Omit<UserAssetBalance, 'inWallet'>
  }
  rewards: {
    address: EthereumAddress
    underlyingAsset: EthereumAddress
    unclaimedBalance: BigNumber
  }
}

export type UserSummary = {
  totalDepositedInUSD: BigNumber
  totalBorrowedInMarketReferenceCurrency: BigNumber
  totalBorrowedInUSD: BigNumber
  totalCollateralInMarketReferenceCurrency: BigNumber
  availableBorrowsInUSD: BigNumber
  borrowLimitInUSD: BigNumber
  borrowLimitUsed?: BigNumber
  currentLiquidationThreshold: BigNumber
  healthFactor: BigNumber
  netAPY: BigNumber
}

export type UserAssetBalance = {
  inWallet: BigNumber
  deposited: BigNumber
  borrowed: BigNumber
  usageAsCollateralEnabled: boolean
}

export type WalletBalance = {
  [key in AssetSymbol]: BigNumber
}

export type StakeData = {
  userIncentivesToClaim: BigNumber
}
