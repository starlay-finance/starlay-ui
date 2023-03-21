import { BigNumber } from '@starlay-finance/math-utils'
import { Dayjs } from 'dayjs'
import { LISTED_ASSET_SYMBOLS } from 'src/constants/assets'
import { EthereumAddress } from './web3'

export type AssetSymbol = typeof LISTED_ASSET_SYMBOLS[number]

export type Asset = {
  symbol: AssetSymbol
  displaySymbol?: string
  icon: StaticImageData
  name: string
  borrowUnsupported?: boolean
  makaiUnsupported?: boolean
}

export type AssetMetadata = {
  address: string
  symbol: AssetSymbol
  decimals: number
}

export type ERC20Asset = {
  symbol: AssetSymbol
  icon: StaticImageData
  name: string
  address: EthereumAddress
  decimals: number
}

export type MarketData = {
  assets: AssetMarketData[]
  marketReferenceCurrencyPriceInUSD: BigNumber
  marketReferenceCurrencyDecimals: number
  marketTimestamp: number
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

export type VoteData = {
  total: BigNumber
  data: Partial<
    Record<string, { weight: BigNumber; lastWeekRevenueInUSD: BigNumber }>
  >
}

export type UserVoteData = {
  powerTotal: BigNumber
  votedTotal: BigNumber
  claimableTotalInUSD: BigNumber
  data: Partial<
    Record<
      string,
      { claimableInUSD: BigNumber; weight: BigNumber; vote: BigNumber }
    >
  >
  expiry: Dayjs
}
