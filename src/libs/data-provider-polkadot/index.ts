import { BigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import {
  AssetSymbol,
  MarketData,
  User,
  UserSummary,
  WalletBalance,
} from 'src/types/models'
import { DataProvider } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import {
  EMPTY_BALANCE_BY_ASSET,
  assetFromSymbolAndAddress,
} from 'src/utils/assets'
import { calculateNetAPY } from 'src/utils/calculator'
import { BN_ONE, BN_ZERO } from 'src/utils/number'
import { PolkadotChainId } from '../config/network'
import { Lens } from '../polkadot/Lens'
import {
  PoolBalances,
  PoolMetadata,
} from '../polkadot/__generated__/types-returns/lens'
import { StaticRPCProviderPolkadot } from '../static-rpc-provider-polkadot'
import { toAPY, toBigNumber, toString } from './utils'

export class DataProviderPolkadot implements DataProvider {
  private constructor(
    readonly chainId: PolkadotChainId,
    private lens: Lens,
    private controller: PolkadotAddress,
    private pools: PolkadotAddress[] = [],
    private poolUnderlyingDict: Record<
      PolkadotAddress,
      { address: PolkadotAddress; symbol: AssetSymbol; decimals: number }
    > = {},
  ) {}

  static new = (
    { chainId, provider }: StaticRPCProviderPolkadot,
    lens: PolkadotAddress,
    controller: PolkadotAddress,
  ) => new DataProviderPolkadot(chainId, new Lens(provider, lens), controller)

  getMarketData: DataProvider['getMarketData'] = async () => {
    const { metadata, prices, configuration } = await this.lens.poolData(
      this.controller,
    )
    this.updatePools(metadata)
    const marketTimestamp = dayjs().unix()
    return {
      chainId: this.chainId,
      marketTimestamp,
      marketReferenceCurrencyDecimals: 0,
      marketReferenceCurrencyPriceInUSD: BN_ONE,
      assets: metadata.map((data, idx) => {
        const { address, symbol, decimals } = this.underlyingOf(
          data.pool as string,
        )
        const priceInMarketReferenceCurrency = toBigNumber(
          prices[idx].underlyingPrice,
        )
        return {
          pool: data.pool as string,
          ...assetFromSymbolAndAddress(symbol, address),
          decimals,
          depositAPY: toAPY(data.supplyRatePerMsec),
          variableBorrowAPY: toAPY(data.borrowRatePerMsec),
          liquidity: toBigNumber(data.totalCash, -decimals),
          liquidityInUSD: toBigNumber(data.totalCash, -decimals).times(
            priceInMarketReferenceCurrency,
          ),
          totalDepositedInUSD: toBigNumber(data.totalSupply, -decimals).times(
            priceInMarketReferenceCurrency,
          ),
          totalBorrowedInUSD: toBigNumber(data.totalBorrows, -decimals).times(
            priceInMarketReferenceCurrency,
          ),
          baseLTVasCollateral: toBigNumber(data.collateralFactorMantissa),
          priceInMarketReferenceCurrency: toBigNumber(
            prices[idx].underlyingPrice,
          ),
          reserveLiquidationThreshold: toBigNumber(
            data.collateralFactorMantissa,
          ),
          reserveFactor: toBigNumber(data.reserveFactorMantissa),
          liquidationPenalty: toBigNumber(
            configuration.liquidationIncentiveMantissa,
          ),
          underlyingAsset: data.underlyingAssetAddress as string,
          lTokenAddress: data.pool as string,
          vdTokenAddress: '',
          // TODO
          usageAsCollateralEnabled: true,
          isActive: true,
          isDepositInactive: data.mintGuardianPaused,
          isBorrowInactive: data.borrowGuardianPaused,
          borrowingEnabled: true,
          // incentives
          depositIncentiveAPR: BN_ZERO,
          variableBorrowIncentiveAPR: BN_ZERO,
        }
      }),
      raw: {},
    }
  }

  getUserData: DataProvider['getUserData'] = async ({
    account,
    marketData,
  }) => {
    const data = await this.lens.userData(this.pools, account)
    const balanceByAsset = this.toBalanceByAsset(data)
    return {
      summary: toSummary(balanceByAsset, marketData),
      balanceByAsset,
      rewards: {
        address: '',
        underlyingAsset: '',
        unclaimedBalance: BN_ZERO,
      },
    }
  }

  getWalletBalance: DataProvider['getWalletBalance'] = async ({ account }) => {
    const data = await this.lens.underlyingBalance(this.pools, account)
    return data.reduce<Record<string, BigNumber>>((res, balance, idx) => {
      const { symbol, decimals } = this.underlyingOf(this.pools[idx])
      return { ...res, [symbol]: toBigNumber(balance, -decimals) }
    }, {}) as WalletBalance
  }

  underlyingOf = (pool: PolkadotAddress) => this.poolUnderlyingDict[pool]

  private updatePools = (metadata: PoolMetadata[]) => {
    this.poolUnderlyingDict = metadata.reduce(
      (
        res,
        { pool, underlyingAssetAddress, underlyingSymbol, underlyingDecimals },
      ) => ({
        ...res,
        [pool as string]: {
          address: underlyingAssetAddress as string,
          symbol: assetFromSymbolAndAddress(
            toString(underlyingSymbol) as AssetSymbol,
            underlyingAssetAddress as string,
          ).symbol,
          decimals: underlyingDecimals,
        },
      }),
      {},
    )
    this.pools = Object.keys(this.poolUnderlyingDict)
  }

  private toBalanceByAsset = (data: PoolBalances[]) =>
    data.reduce((prev, { pool, balanceOf, borrowBalanceCurrent }) => {
      const { symbol, decimals } = this.underlyingOf(pool as string)
      return {
        ...prev,
        [symbol]: {
          deposited: toBigNumber(balanceOf, -decimals),
          borrowed: toBigNumber(borrowBalanceCurrent, -decimals),
          usageAsCollateralEnabled: true,
        },
      }
    }, EMPTY_BALANCE_BY_ASSET)
}

const toSummary = (
  balanceByAsset: User['balanceByAsset'],
  marketData: MarketData,
): UserSummary => {
  const acc = marketData.assets.reduce(
    (prev, asset) => {
      const balance = balanceByAsset[asset.symbol]
      const depositedInUSD = balance.deposited.times(
        asset.priceInMarketReferenceCurrency,
      )
      return {
        totalDepositedInUSD: prev.totalDepositedInUSD.plus(depositedInUSD),
        totalBorrowedInUSD: prev.totalBorrowedInUSD.plus(
          balance.borrowed.times(asset.priceInMarketReferenceCurrency),
        ),
        borrowLimitInUSD: prev.borrowLimitInUSD.plus(
          depositedInUSD.times(asset.baseLTVasCollateral),
        ),
        thresholdInUSD: prev.thresholdInUSD.plus(
          depositedInUSD.times(asset.baseLTVasCollateral),
        ),
      }
    },
    {
      totalDepositedInUSD: BN_ZERO,
      totalBorrowedInUSD: BN_ZERO,
      borrowLimitInUSD: BN_ZERO,
      thresholdInUSD: BN_ZERO,
    },
  )
  const availableBorrowsInUSD = acc.borrowLimitInUSD.minus(
    acc.totalBorrowedInUSD,
  )

  const netAPY = calculateNetAPY(
    balanceByAsset,
    marketData.assets,
    marketData.marketReferenceCurrencyPriceInUSD,
    acc.totalDepositedInUSD,
  )

  return {
    totalDepositedInUSD: acc.totalDepositedInUSD,
    totalBorrowedInMarketReferenceCurrency: acc.totalBorrowedInUSD,
    totalBorrowedInUSD: acc.totalBorrowedInUSD,
    totalCollateralInMarketReferenceCurrency: acc.totalDepositedInUSD,
    availableBorrowsInUSD,
    borrowLimitInUSD: acc.borrowLimitInUSD,
    borrowLimitUsed: acc.borrowLimitInUSD.gt(BN_ZERO)
      ? acc.totalBorrowedInUSD.dividedBy(acc.borrowLimitInUSD)
      : undefined,
    currentLiquidationThreshold: acc.totalDepositedInUSD.gt(BN_ZERO)
      ? acc.thresholdInUSD.div(acc.totalDepositedInUSD)
      : BN_ZERO,
    healthFactor: acc.totalBorrowedInUSD.gt(BN_ZERO)
      ? acc.borrowLimitInUSD.div(acc.totalBorrowedInUSD)
      : undefined,
    netAPY,
  }
}
