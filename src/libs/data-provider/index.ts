import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
} from '@starlay-finance/contract-helpers'
import { ReserveIncentiveWithFeedsResponse } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { ASSETS_DICT } from 'src/constants/assets'
import { DataProvider } from 'src/types/starlay'
import { EthereumAddress } from 'src/types/web3'
import { filterFalsy } from 'src/utils/array'
import { onlyListed } from 'src/utils/assets'
import { EVMChainId, getNetworkConfigEVM } from '../config'
import {
  PoolDataProviderInterface,
  getPoolDataProvider,
} from '../pool-data-provider'
import { StaticRPCProviderEVM } from '../static-rpc-provider'
import {
  WalletBalanceProviderInterface,
  walletBalanceProviderContract,
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

  static new = (provider: StaticRPCProviderEVM) =>
    new DataProviderEVM(
      provider.chainId,
      getPoolDataProvider(provider).provider,
      walletBalanceProviderContract(provider!),
    )

  getMarketData: DataProvider['getMarketData'] = async () => {
    const currentTimestamp = dayjs().unix()
    const {
      reservesData,
      incentivesByUnderlyingAsset,
      marketReferenceCurrencyPriceInUSD,
      ...rawData
    } = await this.poolDataProvider.getReservesWithIncentives(currentTimestamp)
    const assets = reservesData
      .filter(onlyListed)
      .map((reserve) =>
        toAssetMarketData(
          marketReferenceCurrencyPriceInUSD,
          reserve,
          incentivesByUnderlyingAsset[reserve.underlyingAsset],
        ),
      )
      .filter(filterFalsy)
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
    const { rewardToken } = getNetworkConfigEVM(this.chainId)
    const balancesDict =
      await this.walletBalanceProvider.getBeforeNormalizedWalletBalance(account)
    const rewardBalance = ethers.BigNumber.from(0)
    return toWalletBalance(balancesDict, rewardBalance, assets, {
      symbol: ASSETS_DICT.DOT.symbol,
      address: rewardToken.underlyingAsset,
      decimals: rewardToken.decimals,
    })
  }
}
