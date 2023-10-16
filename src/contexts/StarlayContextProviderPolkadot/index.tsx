import { SubmittableExtrinsic } from '@polkadot/api/types'
import { waitReady } from '@polkadot/wasm-crypto'
import { Web3ReactProvider } from '@web3-react/core'
import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
import { ModalPortal } from 'src/hooks/useModal'
import { usePolkadotWallet } from 'src/hooks/usePolkadotWallet'
import { StarlayContext } from 'src/hooks/useStarlay'
import { useStaticRPCProviderPolkadot } from 'src/hooks/useStaticRPCProviderPolkadot'
import { getNetworkConfigPolkadot } from 'src/libs/config'
import { DataProviderPolkadot } from 'src/libs/data-provider-polkadot'
import { FaucetPolkadot } from 'src/libs/faucet-polkadot'
import { LendingPoolPolkadot } from 'src/libs/lending-pool-polkadot'
import { metamaskConnector } from 'src/libs/wallet-provider-evm/providers/metamask'
import { DataProvider, Faucet, LendingPool, TxItem } from 'src/types/starlay'
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
      const { lens, controller } = getNetworkConfigPolkadot(
        provider!.chainId,
      ).addresses
      return DataProviderPolkadot.new(provider!, lens, controller)
    },
  )

  const { data: faucet } = useSWRImmutable<Faucet | undefined>(
    isReady && provider && ['polkadot', 'faucet', provider.chainId],
    () => {
      const { isTestnet } = getNetworkConfigPolkadot(provider!.chainId)
      if (!isTestnet) return undefined
      return FaucetPolkadot.new(provider!)
    },
  )

  const txExecutor = useCallback(
    async (item: TxItem<SubmittableExtrinsic<'promise'>>) =>
      executeTx(item, account, signer, provider!.provider),
    [account, signer, provider],
  )

  useEffect(() => {
    waitReady().then(() => setIsReady(true))
  }, [])
  return (
    <StarlayContext.Provider
      value={{
        network: 'Polkadot',
        dataProvider,
        lendingPool,
        txExecutor,
        faucet,
      }}
    >
      {children}
    </StarlayContext.Provider>
  )
}

export const PolkadotPageLayout = (page: ReactElement) => (
  <Web3ReactProvider connectors={[metamaskConnector.connector]}>
    <StarlayContextProviderPolkadot>
      <>
        {page}
        <ModalPortal />
      </>
    </StarlayContextProviderPolkadot>
  </Web3ReactProvider>
)
