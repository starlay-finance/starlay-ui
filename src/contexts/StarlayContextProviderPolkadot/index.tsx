import { SubmittableExtrinsic } from '@polkadot/api/types'
import { waitReady } from '@polkadot/wasm-crypto'
import { FC, useCallback, useEffect, useState } from 'react'
import { ModalPortal } from 'src/hooks/useModal'
import { usePolkadotWallet } from 'src/hooks/usePolkadotWallet'
import { StarlayContext } from 'src/hooks/useStarlay'
import { useStaticRPCProviderPolkadot } from 'src/hooks/useStaticRPCProviderPolkadot'
import { getNetworkConfigPokadot } from 'src/libs/config'
import { DataProviderPolkadot } from 'src/libs/data-provider-polkadot'
import { LendingPoolPolkadot } from 'src/libs/lending-pool-polkadot'
import { DataProvider, LendingPool, TxItem } from 'src/types/starlay'
import useSWRImmutable from 'swr/immutable'
import { executeTx } from './utils'

export const StarlayContextProviderPolkadot: FC<{
  children: JSX.Element
}> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const { data: provider } = useStaticRPCProviderPolkadot()
  const { account, signer } = usePolkadotWallet(true)

  const { data: lendingPool } = useSWRImmutable<LendingPool>(
    isReady && provider && ['polkadot', 'lendingpool', provider.chainId],
    () => LendingPoolPolkadot.new({ api: provider!.provider }),
  )

  const { data: dataProvider } = useSWRImmutable<DataProvider>(
    isReady && provider && ['polkadot', 'dataprovider', provider.chainId],
    () => {
      const { lens, controller } = getNetworkConfigPokadot(
        provider!.chainId,
      ).addresses
      return DataProviderPolkadot.new(provider!, lens, controller)
    },
  )

  const txExecutor = useCallback(
    async (item: TxItem<SubmittableExtrinsic<'promise'>>) =>
      executeTx(item, account, signer),
    [account, signer],
  )

  useEffect(() => {
    waitReady().then(() => setIsReady(true))
  }, [])
  return (
    <StarlayContext.Provider
      value={{
        dataProvider,
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