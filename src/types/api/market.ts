import { AssetMarketData } from '../models'

/**
 * @swagger
 * components:
 *  schemas:
 *    Market:
 *      type: object
 *      properties:
 *        timestamp:
 *          type: number
 *        assets:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              symbol:
 *                type: string
 *              name:
 *                type: string
 *              borrowUnsupported:
 *                type: boolean
 *              makaiUnsupported:
 *                type: boolean
 *              depositAPY:
 *                type: string
 *              variableBorrowAPY:
 *                type: string
 *              depositIncentiveAPR:
 *                type: string
 *              variableBorrowIncentiveAPR:
 *                type: string
 *              liquidity:
 *                type: string
 *              liquidityInUSD:
 *                type: string
 *              totalDepositedInUSD:
 *                type: string
 *              totalBorrowedInUSD:
 *                type: string
 *              baseLTVasCollateral:
 *                type: string
 *              priceInMarketReferenceCurrency:
 *                type: string
 *              reserveLiquidationThreshold:
 *                type: string
 *              usageAsCollateralEnabled:
 *                type: boolean
 *              reserveFactor:
 *                type: string
 *              liquidationPenalty:
 *                type: string
 *              underlyingAsset:
 *                type: string
 *              decimals:
 *                type: number
 *              lTokenAddress:
 *                type: string
 *              vdTokenAddress:
 *                type: string
 *              isActive:
 *                type: boolean
 *              isFrozen:
 *                type: boolean
 *              borrowingEnabled:
 *                type: boolean
 *            required:
 *              - symbol
 *              - name
 *              - depositAPY
 *              - variableBorrowAPY
 *              - depositIncentiveAPR
 *              - variableBorrowIncentiveAPR
 *              - liquidity
 *              - liquidityInUSD
 *              - totalDepositedInUSD
 *              - totalBorrowedInUSD
 *              - baseLTVasCollateral
 *              - priceInMarketReferenceCurrency
 *              - reserveLiquidationThreshold
 *              - usageAsCollateralEnabled
 *              - reserveFactor
 *              - liquidationPenalty
 *              - underlyingAsset
 *              - decimals
 *              - lTokenAddress
 *              - vdTokenAddress
 *              - isActive
 *              - isFrozen
 *              - borrowingEnabled
 *      required:
 *        - timestamp
 *        - assets
 */
export type Market = {
  timestamp: string
  assets: AssetMarketData[]
}
