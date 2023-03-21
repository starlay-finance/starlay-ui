import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
} from '@starlay-finance/contract-helpers'
import { ReserveIncentiveWithFeedsResponse } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { ASSETS_DICT } from 'src/constants/assets'
import { DataProvider } from 'src/types/starlay'
import { EthereumAddress } from 'src/types/web3'
import { onlyListed } from 'src/utils/assets'
import { BN_ZERO } from 'src/utils/number'
import { EVMChainId, getNetworkConfig } from '../config'
import {
  getPoolDataProvider,
  PoolDataProviderInterface,
  StaticRPCProvider,
} from '../pool-data-provider'
import {
  walletBalanceProviderContract,
  WalletBalanceProviderInterface,
} from '../wallet-balance-provider'
import { toAssetMarketData, toUser, toWalletBalance } from './utils'

export type MarketDataRawEVM = {
  rawReservesData: ReserveDataHumanized[]
  rawBaseCurrencyData: PoolBaseCurrencyHumanized
  rawReserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
}

export class DataProviderEVM implements DataProvider<MarketDataRawEVM> {
  private constructor(
    readonly chainId: EVMChainId,
    private poolDataProvider: PoolDataProviderInterface,
    private walletBalanceProvider: WalletBalanceProviderInterface,
  ) {}

  static new = (provider: StaticRPCProvider) =>
    new DataProviderEVM(
      provider.chainId,
      getPoolDataProvider(provider).provider,
      walletBalanceProviderContract(provider!),
    )

  getMarketData: DataProvider['getMarketData'] = async ({
    layPriceInUSD = BN_ZERO,
  } = {}) => {
    const currentTimestamp = dayjs().unix()
    const { rewardToken } = getNetworkConfig(this.chainId)
    const {
      reservesData,
      incentivesByUnderlyingAsset,
      marketReferenceCurrencyPriceInUSD,
      ...rawData
    } = await this.poolDataProvider.getReservesWithIncentives(
      currentTimestamp,
      {
        address: rewardToken.underlyingAsset,
        priceInUSD: layPriceInUSD,
      },
    )
    const assets = reservesData
      .filter(onlyListed)
      .map((reserve) =>
        toAssetMarketData(
          marketReferenceCurrencyPriceInUSD,
          reserve,
          incentivesByUnderlyingAsset[reserve.underlyingAsset],
        ),
      )
    return {
      assets,
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals: rawData.marketReferenceCurrencyDecimals,
      marketTimestamp: currentTimestamp,
      chainId: this.chainId,
      raw: rawData,
    }
  }

  getUserData: DataProvider['getUserData'] = async ({
    account,
    marketData,
  }) => {
    const { reserves, incentive } =
      await this.poolDataProvider.getUserReservesWithIncentive(
        account as EthereumAddress,
        {
          reservesData: marketData.raw.rawReservesData,
          baseCurrencyData: marketData.raw.rawBaseCurrencyData,
          reserveIncentivesData: marketData.raw.rawReserveIncentivesData,
          timestamp: marketData.marketTimestamp,
        },
      )
    return toUser(reserves, incentive, marketData)
  }

  getWalletBalance: DataProvider['getWalletBalance'] = async ({
    account,
    assets,
  }) => {
    const { rewardToken } = getNetworkConfig(this.chainId)
    const balancesDict =
      await this.walletBalanceProvider.getBeforeNormalizedWalletBalance(account)

    const rewardBalance = await this.walletBalanceProvider.getBalance(
      account,
      rewardToken.address,
    )
    return toWalletBalance(balancesDict, rewardBalance, assets, {
      symbol: ASSETS_DICT.LAY.symbol,
      address: rewardToken.underlyingAsset,
      decimals: rewardToken.decimals,
    })
  }
}
