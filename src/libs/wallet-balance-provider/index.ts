import { WalletBalanceProvider } from '@starlay-finance/contract-helpers'
import { BigNumber } from 'ethers'
import { EthereumAddress } from 'src/types/web3'
import { EVMNetworkConfig, getMarketConfig, getNetworkConfig } from '../config'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const walletBalanceProviderContract = (
  provider: StaticRPCProviderEVM,
): WalletBalanceProviderInterface => WalletBalanceProviderWrapper.new(provider)

export type WalletBalanceProviderInterface = {
  getBeforeNormalizedWalletBalance: (
    account: string,
  ) => Promise<{ [key in EthereumAddress]: BigNumber }>
  getBalance: (account: string, token: string) => Promise<BigNumber>
}

class WalletBalanceProviderWrapper implements WalletBalanceProviderInterface {
  constructor(
    private proivder: WalletBalanceProvider,
    private lendingPoolAddressProvider: EthereumAddress,
    private baseAsset: EVMNetworkConfig['baseAsset'],
  ) {}

  static new = ({ chainId, provider }: StaticRPCProviderEVM) => {
    const {
      addresses: { walletBalanceProvider },
      baseAsset,
    } = getNetworkConfig(chainId)
    const {
      addresses: { LENDING_POOL_ADDRESS_PROVIDER },
    } = getMarketConfig(chainId)
    return new WalletBalanceProviderWrapper(
      new WalletBalanceProvider({
        walletBalanceProviderAddress: walletBalanceProvider,
        provider,
      }),
      LENDING_POOL_ADDRESS_PROVIDER,
      baseAsset,
    )
  }

  getBeforeNormalizedWalletBalance = async (account: string) => {
    const { proivder, lendingPoolAddressProvider, baseAsset } = this
    const { 0: underlyingAssets, 1: balances } =
      await proivder.getUserWalletBalancesForLendingPoolProvider(
        account,
        lendingPoolAddressProvider,
      )
    return underlyingAssets.reduce((prev, asset, idx) => {
      return {
        ...prev,
        [asset.toLowerCase()]: balances[idx],
      }
    }, {}) as { [key in EthereumAddress]: BigNumber }
  }

  getBalance = async (account: string, token: string) => {
    return this.proivder.balanceOf(account, token)
  }
}
