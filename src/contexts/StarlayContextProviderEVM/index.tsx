import { transactionType } from '@starlay-finance/contract-helpers'
import { Web3ReactProvider } from '@web3-react/core'
import { FC, ReactElement, useCallback } from 'react'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { ModalPortal } from 'src/hooks/useModal'
import { useRecentGasPrice } from 'src/hooks/useRecentGasPrice'
import { StarlayContext } from 'src/hooks/useStarlay'
import { useStaticRPCProviderEVM } from 'src/hooks/useStaticRPCProviderEVM'
import { DataProviderEVM } from 'src/libs/data-provider'
import { LendingPoolEVM } from 'src/libs/lending-pool-evm'
import { getLibrary } from 'src/libs/wallet-provider-evm'
import { DataProvider, LendingPool, TxItem } from 'src/types/starlay'
import useSWRImmutable from 'swr/immutable'
import { executeTx } from './utils'

const withWeb3ReactProvider =
  <P extends {}>(Component: FC<P>) =>
  (props: P) =>
    (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...props} />
      </Web3ReactProvider>
    )

export const StarlayContextProviderEVM: FC<{
  children: JSX.Element
}> = withWeb3ReactProvider(({ children }) => {
  const { data: provider } = useStaticRPCProviderEVM()
  const { signer } = useEVMWallet(true)

  const { getRecentGasPrice } = useRecentGasPrice()
  const { data: lendingPool } = useSWRImmutable<LendingPool>(
    provider && ['evm', 'lendingpool', provider.chainId],
    () => LendingPoolEVM.new(provider!),
  )
  const { data: dataProvider } = useSWRImmutable<DataProvider>(
    provider && ['evm', 'dataprovider', provider.chainId],
    () => DataProviderEVM.new(provider!),
  )

  const txExecutor = useCallback(
    async (item: TxItem<transactionType>) =>
      // TODO optimize
      executeTx(item, signer, await getRecentGasPrice()),
    [signer, getRecentGasPrice],
  )

  return (
    <StarlayContext.Provider
      value={{
        network: 'EVM',
        dataProvider,
        lendingPool,
        txExecutor,
      }}
    >
      {children}
    </StarlayContext.Provider>
  )
})

export const EVMPageLayout = (page: ReactElement) => (
  <StarlayContextProviderEVM>
    <>
      {page}
      <ModalPortal />
    </>
  </StarlayContextProviderEVM>
)
