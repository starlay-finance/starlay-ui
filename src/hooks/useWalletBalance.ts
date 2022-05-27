import { normalizeBN } from '@starlay-finance/math-utils'
import { ASSETS_DICT } from 'src/constants/assets'
import { ChainId, getNetworkConfig } from 'src/libs/config'
import {
  walletBalanceProviderContract,
  WalletBalanceProviderInterface,
} from 'src/libs/wallet-balance-provider'
import { AssetSymbol, WalletBalance } from 'src/types/models'
import { SWRResponseWithFallback } from 'src/types/swr'
import { EthereumAddress } from 'src/types/web3'
import { generateSymbolDict } from 'src/utils/assets'
import { BN_ZERO } from 'src/utils/number'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useMarketData } from './useMarketData'
import { useStaticRPCProvider } from './useStaticRPCProvider'
import { useWallet } from './useWallet'

const EMPTY_WALLET_BALANCE: WalletBalance = generateSymbolDict(BN_ZERO)

export const useWalletBalance = () => {
  const { account } = useWallet()
  const { data: provider } = useWalletBalanceProvider()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      account &&
      provider &&
      provider.chainId === marketData?.chainId && [
        'wallet-balance',
        provider.chainId,
        account,
      ],
    (_key: string, chainId: ChainId, account: EthereumAddress) => {
      const { rewardToken } = getNetworkConfig(chainId)
      return getWalletBalance(provider!.provider, account, marketData!.assets, {
        symbol: ASSETS_DICT.LAY.symbol,
        underlyingAsset: rewardToken.underlyingAsset,
        decimals: rewardToken.decimals,
      })
    },
    { fallbackData: EMPTY_WALLET_BALANCE },
  ) as SWRResponseWithFallback<WalletBalance>
}

const useWalletBalanceProvider = () => {
  const { data: provider } = useStaticRPCProvider()
  return useSWRImmutable(
    provider && ['walletbalanceprovider', provider.chainId],
    () => ({
      chainId: provider!.chainId,
      provider: walletBalanceProviderContract(provider!),
    }),
  )
}

const getWalletBalance = async (
  walletBalanceProvider: WalletBalanceProviderInterface,
  account: EthereumAddress,
  assets: {
    symbol: AssetSymbol
    underlyingAsset: EthereumAddress
    decimals: number
  }[],
  rewardToken: {
    symbol: AssetSymbol
    underlyingAsset: EthereumAddress
    decimals: number
  },
): Promise<WalletBalance> => {
  const balancesDict =
    await walletBalanceProvider.getBeforeNormalizedWalletBalance(account)
  walletBalanceProvider
  const balances = assets.reduce((prev, asset) => {
    const balance =
      balancesDict[asset.underlyingAsset.toLowerCase() as EthereumAddress]
    return {
      ...prev,
      [asset.symbol]: balance
        ? normalizeBN(balance.toString(), asset.decimals)
        : BN_ZERO,
    }
  }, {}) as WalletBalance

  const rewardBalance = await walletBalanceProvider.getBalance(
    account,
    rewardToken.underlyingAsset,
  )
  return {
    ...balances,
    [ASSETS_DICT.LAY.symbol]: normalizeBN(
      rewardBalance.toString(),
      rewardToken.decimals,
    ),
  }
}
