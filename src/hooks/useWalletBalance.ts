import { WalletBalance } from 'src/types/models'
import { SWRResponseWithFallback } from 'src/types/swr'
import { generateSymbolDict } from 'src/utils/assets'
import { BN_ZERO } from 'src/utils/number'
import useSWR from 'swr'
import { useMarketData } from './useMarketData'
import { useStarlay } from './useStarlay'
import { useWallet } from './useWallet'

const EMPTY_WALLET_BALANCE: WalletBalance = generateSymbolDict(BN_ZERO)

export const useWalletBalance = (withFallback = true) => {
  const { account } = useWallet()
  const { network, dataProvider } = useStarlay()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      network &&
      account &&
      dataProvider &&
      dataProvider.chainId === marketData?.chainId
        ? ['wallet-balance', network, account, dataProvider.chainId]
        : undefined,
    ([_key, account, _chainId]) => {
      return dataProvider?.getWalletBalance({
        account,
        assets: marketData!.assets.map(
          ({ underlyingAsset, symbol, decimals }) => ({
            address: underlyingAsset,
            symbol,
            decimals,
          }),
        ),
      })
    },
    withFallback ? { fallbackData: EMPTY_WALLET_BALANCE } : undefined,
  ) as SWRResponseWithFallback<WalletBalance>
}
