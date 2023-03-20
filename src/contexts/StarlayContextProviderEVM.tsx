import { transactionType } from '@starlay-finance/contract-helpers'
import { Web3ReactProvider } from '@web3-react/core'
import { FC, useCallback } from 'react'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { ModalPortal } from 'src/hooks/useModal'
import { useRecentGasPrice } from 'src/hooks/useRecentGasPrice'
import { StarlayContext } from 'src/hooks/useStarlay'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { LendingPoolEVM } from 'src/libs/lending-pool'
import { getLibrary } from 'src/libs/wallet-provider-evm'
import { LendingPool, TxItem } from 'src/types/starlay'
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
  const { data: provider } = useStaticRPCProvider()
  const { signer } = useEVMWallet()

  const { getRecentGasPrice } = useRecentGasPrice()
  const { data: lendingPool } = useSWRImmutable<LendingPool>(
    provider && ['evm', 'lendingpool', provider.chainId],
    () => LendingPoolEVM.new(provider!),
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
        lendingPool,
        txExecutor,
      }}
    >
      {children}
    </StarlayContext.Provider>
  )
})

export const asEVMPage =
  <P extends {}>(Component: FC<P>) =>
  (props: P) =>
    (
      <StarlayContextProviderEVM>
        <>
          <Component {...props} />
          <ModalPortal />
        </>
      </StarlayContextProviderEVM>
    )
