import router from 'next/router'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useMarketData } from 'src/hooks/useMarketData'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { AssetMarketData, User } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO } from 'src/utils/number'
import { toMakaiLoop } from 'src/utils/routes'
import { useBorrowModal } from '../../modals/BorrowModal'
import { useCollateralModal } from '../../modals/CollateralModal'
import { useDepositModal } from '../../modals/DepositModal'
import { useSuggestModal } from '../../modals/SuggestModal'

export const useMarket = () => {
  const { account, networkType } = useWallet()
  const { data: marketData } = useMarketData()
  const {
    assets = [],
    marketReferenceCurrencyPriceInUSD = BN_ZERO,
    marketReferenceCurrencyDecimals = 0,
  } = marketData || {}
  const markets = assets.filter((each) => each.isActive).sort(symbolSorter)

  const { data: user } = useUserData()
  const { data: balance } = useWalletBalance()
  const { open: openDepositModal } = useDepositModal()
  const { open: openBorrowModal } = useBorrowModal()
  const { open: openCollateralModal } = useCollateralModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openSuggestModal } = useSuggestModal()
  const deposit = (user: User, asset: AssetMarketData) => {
    openDepositModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
    })
  }

  const borrow = (user: User, asset: AssetMarketData) => {
    openBorrowModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
      openSuggestModal:
        networkType === 'EVM'
          ? () =>
              openSuggestModal({
                asset,
                inWallet: balance[asset.symbol],
                openDeposit: () => deposit(user, asset),
                openMakai:
                  networkType === 'EVM'
                    ? () => router.push(toMakaiLoop(asset.symbol, networkType)!)
                    : undefined,
              })
          : undefined,
    })
  }
  const setUsageAsCollateral = (user: User, asset: AssetMarketData) => {
    openCollateralModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
      marketReferenceCurrencyDecimals,
    })
  }
  return {
    account,
    user,
    markets,
    networkType,
    borrow,
    deposit,
    setUsageAsCollateral,
    openWalletModal,
  }
}
