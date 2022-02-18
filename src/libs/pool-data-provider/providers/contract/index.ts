import {
  UiIncentiveDataProvider,
  UiIncentiveDataProviderInterface,
  UiPoolDataProvider,
  UiPoolDataProviderInterface,
} from '@starlay-finance/contract-helpers'
import { ethers } from 'ethers'
import { NetworkConfig } from 'src/libs/config'
import { EthereumAddress } from 'src/types/web3'
import { formatReserves, formatUserReserves } from '../../converters'
import { PoolDataProviderInterface, PoolReservesData } from '../../types'

export class RPCClient implements PoolDataProviderInterface {
  constructor(
    private uiPoolDataProvider: UiPoolDataProviderInterface,
    private uiIncentiveDataProvider: UiIncentiveDataProviderInterface,
    private lendingPoolAddressProvider: EthereumAddress,
    private baseAsset: NetworkConfig['baseAsset'],
  ) {}

  static new = (params: {
    uiPoolDataProvider: EthereumAddress
    uiIncentiveDataProvider: EthereumAddress
    lendingPoolAddressProvider: EthereumAddress
    priceAggregatorAdapterAddress: EthereumAddress
    baseAsset: NetworkConfig['baseAsset']
    provider: ethers.providers.Provider
  }) =>
    new RPCClient(
      new UiPoolDataProvider({
        uiPoolDataProviderAddress: params.uiPoolDataProvider,
        provider: params.provider,
      }),
      new UiIncentiveDataProvider({
        incentiveDataProviderAddress: params.uiIncentiveDataProvider,
        priceAggregatorAdapterAddress: params.priceAggregatorAdapterAddress,
        provider: params.provider,
      }),
      params.lendingPoolAddressProvider,
      params.baseAsset,
    )

  getReservesWithIncentives = async (currentTimestamp: number) => {
    const {
      uiPoolDataProvider,
      uiIncentiveDataProvider,
      lendingPoolAddressProvider,
      baseAsset,
    } = this
    const [poolData, reservesIncentives] = await Promise.all([
      uiPoolDataProvider.getReservesHumanized(lendingPoolAddressProvider),
      uiIncentiveDataProvider.getIncentivesDataWithPrice({
        lendingPoolAddressProvider,
      }),
    ])
    return {
      ...formatReserves(
        poolData,
        reservesIncentives,
        currentTimestamp,
        baseAsset,
      ),
      rawReservesData: poolData.reservesData,
      rawBaseCurrencyData: poolData.baseCurrencyData,
    }
  }

  getUserReserves = async (
    account: EthereumAddress,
    poolReservesData: PoolReservesData,
  ) => {
    const { uiPoolDataProvider, lendingPoolAddressProvider, baseAsset } = this
    const userReserves = await uiPoolDataProvider.getUserReservesHumanized(
      lendingPoolAddressProvider,
      account,
    )
    return formatUserReserves(userReserves, poolReservesData, baseAsset)
  }
}
