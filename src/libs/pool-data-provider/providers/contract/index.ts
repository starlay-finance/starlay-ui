import {
  ReserveDataHumanized,
  UiIncentiveDataProvider,
  UiIncentiveDataProviderInterface,
  UiPoolDataProvider,
  UiPoolDataProviderInterface,
  UserReserveDataHumanized,
  UserReserveIncentiveDataHumanizedResponse,
} from '@starlay-finance/contract-helpers'
import {
  calculateAllUserIncentives,
  getComputedReserveFields,
  normalizeBN,
  UserReserveCalculationData,
} from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { NetworkConfig } from 'src/libs/config'
import { EthereumAddress } from 'src/types/web3'
import { equals } from 'src/utils/address'
import { BN_ZERO } from 'src/utils/number'
import { formatReserves, formatUserReserves } from '../../converters'
import { PoolDataProviderInterface, PoolReservesData } from '../../types'

export class RPCClient implements PoolDataProviderInterface {
  constructor(
    private uiPoolDataProvider: UiPoolDataProviderInterface,
    private uiIncentiveDataProvider: UiIncentiveDataProviderInterface,
    private lendingPoolAddressProvider: EthereumAddress,
    private baseAsset: NetworkConfig['baseAsset'],
    private rewardToken: EthereumAddress,
    private rewardUndelyingAssetDict: Record<string, string>,
  ) {}

  static new = (params: {
    uiPoolDataProvider: EthereumAddress
    uiIncentiveDataProvider: EthereumAddress
    lendingPoolAddressProvider: EthereumAddress
    priceAggregatorAdapterAddress: EthereumAddress
    baseAsset: NetworkConfig['baseAsset']
    provider: ethers.providers.Provider
    rewardToken: EthereumAddress
    rewardUndelyingAssetDict: Record<string, string>
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
      params.rewardToken,
      params.rewardUndelyingAssetDict,
    )

  getReservesWithIncentives = async (currentTimestamp: number) => {
    const {
      uiPoolDataProvider,
      uiIncentiveDataProvider,
      lendingPoolAddressProvider,
      baseAsset,
      rewardUndelyingAssetDict,
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
        rewardUndelyingAssetDict,
      ),
      rawReservesData: poolData.reservesData,
      rawBaseCurrencyData: poolData.baseCurrencyData,
      rawReserveIncentivesData: reservesIncentives,
    }
  }

  getUserReservesWithIncentive = async (
    account: EthereumAddress,
    poolReservesData: PoolReservesData,
  ) => {
    const {
      uiPoolDataProvider,
      uiIncentiveDataProvider,
      lendingPoolAddressProvider,
      baseAsset,
      rewardToken,
      rewardUndelyingAssetDict,
    } = this
    const userReserves = await uiPoolDataProvider.getUserReservesHumanized(
      lendingPoolAddressProvider,
      account,
    )
    const userReserveIncentives =
      await uiIncentiveDataProvider.getUserReservesIncentivesDataHumanized(
        account,
        lendingPoolAddressProvider,
      )
    return {
      reserves: formatUserReserves(userReserves, poolReservesData, baseAsset),
      incentive: calcIncentive(
        userReserves,
        userReserveIncentives,
        poolReservesData,
        rewardToken,
        rewardUndelyingAssetDict[rewardToken] || rewardToken,
      ),
    }
  }
}
const calcIncentive = (
  userReserves: UserReserveDataHumanized[],
  userReserveIncentives: UserReserveIncentiveDataHumanizedResponse[],
  poolReservesData: PoolReservesData,
  rewardToken: EthereumAddress,
  rewardUndelyingAsset: string,
) => {
  const incentives = calculateAllUserIncentives({
    userReserves: computedUserReserves(
      userReserves,
      poolReservesData.reservesData,
      poolReservesData.timestamp,
    ),
    userReserveIncentives,
    reserveIncentives: poolReservesData.reserveIncentivesData,
    currentTimestamp: poolReservesData.timestamp,
  })

  const unclaimedBalance = Object.values(incentives)
    .filter((each) => equals(each.rewardTokenAddress, rewardToken))
    .reduce((prev, current) => {
      return prev.plus(
        normalizeBN(current.claimableRewards, current.rewardTokenDecimals),
      )
    }, BN_ZERO)

  return {
    address: rewardToken,
    underlyingAsset: rewardUndelyingAsset as EthereumAddress,
    unclaimedBalance,
  }
}

const computedUserReserves = (
  userReserves: UserReserveDataHumanized[],
  reserves: ReserveDataHumanized[],
  currentTimestamp: number,
) =>
  userReserves
    .map((userReserve) => {
      const reserve = reserves.find(
        (reserve) =>
          reserve.underlyingAsset.toLowerCase() ===
          userReserve.underlyingAsset.toLowerCase(),
      )
      if (!reserve) return undefined
      const supplies = getComputedReserveFields({ reserve, currentTimestamp })
      // Construct UserReserveData object from reserve and userReserve fields
      return {
        underlyingAsset: userReserve.underlyingAsset.toLowerCase(),
        totalLiquidity: supplies.totalLiquidity.toString(),
        liquidityIndex: reserve.liquidityIndex,
        totalScaledVariableDebt: reserve.totalScaledVariableDebt,
        totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
        scaledLTokenBalance: userReserve.scaledLTokenBalance,
        scaledVariableDebt: userReserve.scaledVariableDebt,
        principalStableDebt: userReserve.principalStableDebt,
      }
    })
    .filter(Boolean) as UserReserveCalculationData[]
