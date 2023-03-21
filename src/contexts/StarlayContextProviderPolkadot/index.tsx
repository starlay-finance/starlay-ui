import { SubmittableExtrinsic } from '@polkadot/api/types'
import { FC, useCallback } from 'react'
import { ModalPortal } from 'src/hooks/useModal'
import { usePolkadotWallet } from 'src/hooks/usePolkadotWallet'
import { StarlayContext } from 'src/hooks/useStarlay'
import { useStaticRPCProviderPolkadot } from 'src/hooks/useStaticRPCProviderPolkadot'
import { LendingPoolPolkadot } from 'src/libs/lending-pool-polkadot'
import { LendingPool, TxItem } from 'src/types/starlay'
import useSWRImmutable from 'swr/immutable'
import { executeTx } from './utils'

export const StarlayContextProviderPolkadot: FC<{
  children: JSX.Element
}> = ({ children }) => {
  const { data: provider } = useStaticRPCProviderPolkadot()
  const { account, signer } = usePolkadotWallet(true)

  const { data: lendingPool } = useSWRImmutable<LendingPool>(
    provider && ['evm', 'lendingpool', provider.chainId],
    () => LendingPoolPolkadot.new({ api: provider!.provider }),
  )

  const txExecutor = useCallback(
    async (item: TxItem<SubmittableExtrinsic<'promise'>>) =>
      executeTx(item, account, signer),
    [account, signer],
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
}

export const asPolkadotPage =
  <P extends {}>(Component: FC<P>) =>
  (props: P) =>
    (
      <StarlayContextProviderPolkadot>
        <>
          <Component {...props} />
          <ModalPortal />
        </>
      </StarlayContextProviderPolkadot>
    )
