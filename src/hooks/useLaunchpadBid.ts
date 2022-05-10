import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { ChainId } from 'src/libs/config'
import { getBid } from 'src/libs/launchpad-stats-provider'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useWallet } from './useWallet'

export const useLaunchpadBid = () => {
  const { data: provider } = useStaticRPCProvider()
  const { account } = useWallet()
  const { launchpadAddress } = useLaunchpadContext()
  return useSWRImmutable(
    () =>
      provider &&
      launchpadAddress &&
      account && [
        'launchpaddata_bid',
        provider.chainId,
        launchpadAddress,
        account,
      ],
    (
      _key: string,
      chainId: ChainId,
      launchpadAddress: EthereumAddress,
      account: EthereumAddress,
    ) => getBid(chainId, launchpadAddress, account),
  )
}
