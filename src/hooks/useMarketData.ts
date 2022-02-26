import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
  ReserveIncentiveWithFeedsResponse,
} from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  ReserveIncentiveDict,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { ChainId } from 'src/libs/config'
import {
  FormattedReserveData,
  PoolDataProviderInterface,
} from 'src/libs/pool-data-provider'
import { AssetMarketData, AssetSymbol } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { assetFromSymbol, onlyListed } from 'src/utils/assets'
import { convertToUSDBulk } from 'src/utils/calculator'
import useSWR from 'swr'
import { ValueOf } from 'type-fest'
import { usePoolDataProvider } from './usePoolDataProvider'

export type MarketData = {
  assets: AssetMarketData[]
  marketReferenceCurrencyPriceInUSD: BigNumber
  marketTimestamp: number
  chainId: ChainId
  rawReservesData: ReserveDataHumanized[]
  rawBaseCurrencyData: PoolBaseCurrencyHumanized
  rawReserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
}

export const useMarketData = () => {
  const { data } = usePoolDataProvider()
  return useSWR(
    () => data && ['marketdata', data?.chainId],
    (_key: string, chainId: ChainId) => getMarketData(data!.provider, chainId),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}
const EMPTY_INCENTIVE: ValueOf<ReserveIncentiveDict> = {
  lIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
  vdIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
  sdIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
}

const getMarketData = async (
  provider: PoolDataProviderInterface,
  chainId: ChainId,
): Promise<MarketData> => {
  const currentTimestamp = dayjs().unix()
  const {
    reservesData,
    incentivesByUnderlyingAsset,
    marketReferenceCurrencyPriceInUSD,
    ...rawData
  } = await provider.getReservesWithIncentives(currentTimestamp)
  const assets = reservesData
    .filter(onlyListed)
    .filter((each) => each.isActive)
    .map((each) =>
      toAssetMarketData(
        each,
        incentivesByUnderlyingAsset[each.underlyingAsset] || EMPTY_INCENTIVE,
        marketReferenceCurrencyPriceInUSD,
      ),
    )
  return {
    assets,
    marketReferenceCurrencyPriceInUSD,
    marketTimestamp: currentTimestamp,
    chainId,
    ...rawData,
  }
}

const toAssetMarketData = (
  reserve: Omit<FormattedReserveData, 'symbol'> & { symbol: AssetSymbol },
  incentive: ValueOf<ReserveIncentiveDict>,
  marketReferenceCurrencyPriceInUSD: BigNumber,
): AssetMarketData => {
  const [liquidityInUSD, marketSizeInUSD, totalBorrowedInUSD] =
    convertToUSDBulk(
      valueToBigNumber(reserve.priceInMarketReferenceCurrency),
      marketReferenceCurrencyPriceInUSD,
      valueToBigNumber(reserve.availableLiquidity),
      valueToBigNumber(reserve.totalLiquidity),
      valueToBigNumber(reserve.totalVariableDebt).plus(reserve.totalStableDebt),
    )
  return {
    ...assetFromSymbol(reserve.symbol),
    underlyingAsset: reserve.underlyingAsset.toLowerCase() as EthereumAddress,
    depositAPY: valueToBigNumber(reserve.supplyAPY),
    variableBorrowAPY: valueToBigNumber(reserve.variableBorrowAPY),
    depositIncentiveAPR: valueToBigNumber(incentive.lIncentives.incentiveAPR),
    variableBorrowIncentiveAPR: valueToBigNumber(
      incentive.vdIncentives.incentiveAPR,
    ),
    liquidity: valueToBigNumber(reserve.availableLiquidity),
    liquidityInUSD,
    marketSizeInUSD,
    totalBorrowedInUSD,
    baseLTVasCollateral: valueToBigNumber(reserve.baseLTVasCollateral),
    priceInMarketReferenceCurrency: valueToBigNumber(
      reserve.priceInMarketReferenceCurrency,
    ),
    reserveLiquidationThreshold: +reserve.reserveLiquidationThreshold,
    usageAsCollateralEnabled: reserve.usageAsCollateralEnabled,
    decimals: reserve.decimals,
    lTokenAddress: reserve.lTokenAddress as EthereumAddress,
    vdTokenAddress: reserve.variableDebtTokenAddress as EthereumAddress,
    isFrozen: reserve.isFrozen,
    borrowingEnabled: reserve.borrowingEnabled,
  }
}
