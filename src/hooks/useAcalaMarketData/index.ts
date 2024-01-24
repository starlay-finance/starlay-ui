import { BigNumber } from '@starlay-finance/math-utils'
import axios from 'axios'
import { Asset, AssetMarketData } from 'src/types/models'
import useSWR from 'swr'

export type AssetMarketDataResponse = Asset & {
  pool: string
  depositAPY: string
  variableBorrowAPY: string
  depositIncentiveAPR: string
  variableBorrowIncentiveAPR: string
  liquidity: string
  liquidityInUSD: string
  totalDepositedInUSD: string
  totalBorrowedInUSD: string
  baseLTVasCollateral: string
  priceInMarketReferenceCurrency: string
  reserveLiquidationThreshold: string
  usageAsCollateralEnabled: boolean
  reserveFactor: string
  liquidationPenalty: string
  underlyingAsset: string
  decimals: number
  lTokenAddress: string
  vdTokenAddress: string
  isActive: boolean
  isDepositInactive: boolean
  isBorrowInactive: boolean
  borrowingEnabled: boolean
}

const ACALA_URL = 'https://acala.starlay.finance/api/market'

export const useAcalaMarketData = () => {
  return useSWR(
    ACALA_URL,
    async (url) => {
      const { data } = await axios.get<{
        timestamp: any
        assets: AssetMarketDataResponse[]
      }>(url)
      return {
        timestamp: data.timestamp,
        assets: data.assets.map(
          (asset): AssetMarketData => ({
            symbol: asset.symbol,
            displaySymbol: asset.symbol,
            name: asset.name,
            icon: '',
            pool: asset.pool,
            depositAPY: new BigNumber(asset.depositAPY),
            variableBorrowAPY: new BigNumber(asset.variableBorrowAPY),
            depositIncentiveAPR: new BigNumber(asset.depositIncentiveAPR),
            variableBorrowIncentiveAPR: new BigNumber(
              asset.variableBorrowIncentiveAPR,
            ),
            liquidity: new BigNumber(asset.liquidity),
            liquidityInUSD: new BigNumber(asset.liquidityInUSD),
            totalDepositedInUSD: new BigNumber(asset.totalDepositedInUSD),
            totalBorrowedInUSD: new BigNumber(asset.totalBorrowedInUSD),
            baseLTVasCollateral: new BigNumber(asset.baseLTVasCollateral),
            priceInMarketReferenceCurrency: new BigNumber(
              asset.priceInMarketReferenceCurrency,
            ),
            reserveLiquidationThreshold: new BigNumber(
              asset.reserveLiquidationThreshold,
            ),
            usageAsCollateralEnabled: asset.usageAsCollateralEnabled,
            reserveFactor: new BigNumber(asset.reserveFactor),
            liquidationPenalty: new BigNumber(asset.liquidationPenalty),
            underlyingAsset: asset.underlyingAsset,
            decimals: asset.decimals,
            lTokenAddress: asset.lTokenAddress,
            vdTokenAddress: asset.vdTokenAddress,
            isActive: asset.isActive,
            isDepositInactive: asset.isDepositInactive,
            isBorrowInactive: asset.isBorrowInactive,
            borrowingEnabled: asset.borrowingEnabled,
          }),
        ),
      }
    },
    {
      dedupingInterval: 10000,
      refreshInterval: 15000,
    },
  )
}
