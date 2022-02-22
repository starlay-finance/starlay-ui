import {
  ComputedUserReserve,
  FormatUserSummaryResponse,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import { ChainId } from 'src/libs/config'
import { PoolDataProviderInterface } from 'src/libs/pool-data-provider/types'
import { User } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { generateSymbolDict } from 'src/utils/assets'
import { calculateNetAPY } from 'src/utils/calculator'
import { BN_ZERO } from 'src/utils/number'
import useSWR from 'swr'
import { MarketData, useMarketData } from './useMarketData'
import { usePoolDataProvider } from './usePoolDataProvider'
import { useWallet } from './useWallet'

export const useUserData = () => {
  const { account } = useWallet()
  const { data } = usePoolDataProvider()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      data &&
      account &&
      data.chainId === marketData?.chainId && [
        'userdata',
        data.chainId,
        account,
      ],
    (_key: string, _chainId: ChainId, account: EthereumAddress) =>
      getUserData(data!.provider, account, marketData!),
  )
}

const getUserData = async (
  provider: PoolDataProviderInterface,
  account: EthereumAddress,
  marketData: MarketData,
): Promise<User> => {
  const userReserves = await provider.getUserReserves(account, {
    reservesData: marketData.rawReservesData,
    baseCurrencyData: marketData.rawBaseCurrencyData,
    timestamp: marketData.marketTimestamp,
  })
  return toUser(userReserves, marketData)
}

const toUser = (
  userReserves: FormatUserSummaryResponse,
  { assets, marketReferenceCurrencyPriceInUSD }: MarketData,
): User => {
  const totalDepositedInUSD = valueToBigNumber(userReserves.totalLiquidityUSD)
  const totalBorrowedInUSD = valueToBigNumber(userReserves.totalBorrowsUSD)
  const availableBorrowsInUSD = valueToBigNumber(
    userReserves.availableBorrowsUSD,
  )

  const borrowLimitInUSD = totalBorrowedInUSD.plus(availableBorrowsInUSD)
  const balanceByAsset = toBalanceByAsset(userReserves.userReservesData)
  const netAPY = calculateNetAPY(
    balanceByAsset,
    assets,
    marketReferenceCurrencyPriceInUSD,
    totalDepositedInUSD,
  )
  return {
    summary: {
      totalDepositedInUSD,
      totalBorrowedInMarketReferenceCurrency: valueToBigNumber(
        userReserves.totalBorrowsMarketReferenceCurrency,
      ),
      totalBorrowedInUSD,
      totalCollateralInMarketReferenceCurrency: valueToBigNumber(
        userReserves.totalCollateralMarketReferenceCurrency,
      ),
      availableBorrowsInUSD,
      borrowLimitInUSD,
      borrowLimitUsed: borrowLimitInUSD.gt(BN_ZERO)
        ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
        : undefined,
      currentLiquidationThreshold: valueToBigNumber(
        userReserves.currentLiquidationThreshold,
      ),
      healthFactor: valueToBigNumber(userReserves.healthFactor),
      netAPY,
    },
    balanceByAsset,
  }
}

const EMPTY_STATUS_BY_ASSET: User['balanceByAsset'] = generateSymbolDict({
  deposited: BN_ZERO,
  borrowed: BN_ZERO,
  usageAsCollateralEnabled: false,
})

const toBalanceByAsset = (userReservesData: ComputedUserReserve[]) =>
  userReservesData.reduce(
    (prev, { reserve: { symbol }, ...userReserve }) => ({
      ...prev,
      [symbol]: {
        deposited: valueToBigNumber(userReserve.underlyingBalance),
        borrowed: valueToBigNumber(userReserve.totalBorrows),
        usageAsCollateralEnabled: userReserve.usageAsCollateralEnabledOnUser,
      },
    }),
    EMPTY_STATUS_BY_ASSET,
  )
