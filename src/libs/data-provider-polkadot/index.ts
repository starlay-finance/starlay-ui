import { ReturnNumber } from '@727-ventures/typechain-types'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
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
import { PoolBalances } from '../polkadot/__generated__/types-returns/lens'
import { StaticRPCProviderPolkadot } from '../static-rpc-provider-polkadot'

export class DataProviderPolkadot implements DataProvider {
  private constructor(readonly chainId: PolkadotChainId, private lens: Lens) {}

  static new = (
    { chainId, provider }: StaticRPCProviderPolkadot,
    lens: PolkadotAddress,
  ) => new DataProviderPolkadot(chainId, new Lens(provider, lens))

  getMarketData: DataProvider['getMarketData'] = async () => {
    const { metadata, prices } = await this.lens.poolData()
    return {
      chainId: this.chainId,
      marketTimestamp: dayjs().unix(),
      marketReferenceCurrencyDecimals: 0,
      marketReferenceCurrencyPriceInUSD: BN_ONE,
      assets: metadata.map((data, idx) => ({
        // TODO
        ...assetFromSymbolAndAddress(
          'ASTR',
          data.underlyingAssetAddress as string,
        ),
        decimals: data.underlyingDecimals,
        // TODO calculation
        depositAPY: toBigNumber(data.supplyRatePerSec),
        variableBorrowAPY: toBigNumber(data.borrowRatePerSec),
        liquidity: toBigNumber(data.totalCash),
        liquidityInUSD: toBigNumber(data.totalCash),
        totalDepositedInUSD: toBigNumber(data.totalSupply),
        totalBorrowedInUSD: toBigNumber(data.totalBorrows),
        baseLTVasCollateral: toBigNumber(data.collateralFactorMantissa),
        priceInMarketReferenceCurrency: toBigNumber(
          prices[idx].underlyingPrice,
        ),
        reserveLiquidationThreshold: toBigNumber(data.collateralFactorMantissa),
        reserveFactor: toBigNumber(data.reserveFactorMantissa),
        liquidationPenalty: BN_ZERO,
        underlyingAsset: data.underlyingAssetAddress as string,
        lTokenAddress: data.pool as string,
        vdTokenAddress: '',
        usageAsCollateralEnabled: true,
        isActive: true,
        isFrozen: false,
        borrowingEnabled: true,
        // incentives
        depositIncentiveAPR: BN_ZERO,
        variableBorrowIncentiveAPR: BN_ZERO,
      })),
      raw: {},
    }
  }

  getUserData: DataProvider['getUserData'] = async ({
    account,
    marketData,
  }) => {
    const data = await this.lens.userData({ account })
    const balanceByAsset = toBalanceByAsset(data)
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

  getWalletBalance: DataProvider['getWalletBalance'] = async ({
    account,
    assets,
  }) => {
    const data = await this.lens.userData({ account })
    const balancesDict = data.reduce<Record<string, BigNumber>>(
      (res, { balanceOfUnderlying, pool }) => ({
        ...res,
        [pool as string]: toBigNumber(balanceOfUnderlying),
      }),
      {},
    )
    return assets.reduce(
      (res, { symbol, address, decimals }) => ({
        ...res,
        [symbol]: balancesDict[address].shiftedBy(-decimals),
      }),
      {},
    ) as WalletBalance
  }
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
    totalBorrowedInMarketReferenceCurrency: acc.totalDepositedInUSD,
    totalBorrowedInUSD: acc.totalDepositedInUSD,
    totalCollateralInMarketReferenceCurrency: acc.totalDepositedInUSD,
    availableBorrowsInUSD,
    borrowLimitInUSD: acc.borrowLimitInUSD,
    borrowLimitUsed: acc.borrowLimitInUSD.gt(BN_ZERO)
      ? acc.totalBorrowedInUSD.dividedBy(acc.borrowLimitInUSD)
      : undefined,
    currentLiquidationThreshold: acc.totalDepositedInUSD.gt(BN_ZERO)
      ? acc.thresholdInUSD.div(acc.totalDepositedInUSD)
      : BN_ZERO,
    healthFactor: BN_ZERO,
    netAPY,
  }
}

const toBalanceByAsset = (data: PoolBalances[]) =>
  data.reduce(
    (prev, { balanceOf, borrowBalanceCurrent }) => ({
      ...prev,
      [assetFromSymbolAndAddress('TODO' as AssetSymbol, 'TODO underlying')
        .symbol]: {
        deposited: toBigNumber(balanceOf),
        borrowed: toBigNumber(borrowBalanceCurrent),
        usageAsCollateralEnabled: true,
      },
    }),
    EMPTY_BALANCE_BY_ASSET,
  )

const toBigNumber = (num: ReturnNumber) => valueToBigNumber(num.toString())
