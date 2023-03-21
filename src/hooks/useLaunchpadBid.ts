import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { getBid } from 'src/libs/launchpad-stats-provider'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from './useEVMWallet'
import { useStaticRPCProviderEVM } from './useStaticRPCProviderEVM'

export const useLaunchpadBid = (params?: {
  launchpadAddress: EthereumAddress
}) => {
  const { data: provider } = useStaticRPCProviderEVM()
  const { account } = useEVMWallet()
  const context = useLaunchpadContext()
  const launchpadAddress = params?.launchpadAddress || context.launchpadAddress
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
    ([_key, chainId, launchpadAddress, account]) =>
      getBid(chainId, launchpadAddress, account),
  )
}
