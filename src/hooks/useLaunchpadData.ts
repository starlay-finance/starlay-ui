import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { ChainId } from 'src/libs/config'
import {
  getCurrentPrice,
  listPricesHistorical,
} from 'src/libs/launchpad-data-provider'
import { EthereumAddress } from 'src/types/web3'
import useSWR from 'swr'

export const useLaunchpadData = () => {
  const { data } = useStaticRPCProvider()
  const { launchpadAddress } = useLaunchpadContext()
  console.log(data, launchpadAddress)
  return useSWR(
    () =>
      data &&
      launchpadAddress && [
        'launchpaddata_current',
        data?.chainId,
        launchpadAddress,
      ],
    (_key: string, chainId: ChainId, launchpadAddress: EthereumAddress) =>
      getCurrentPrice(chainId, launchpadAddress),
  )
}

export const useLaunchpadPricesHistorical = () => {
  const { data } = useStaticRPCProvider()
  const { launchpadAddress } = useLaunchpadContext()
  return useSWR(
    () =>
      data &&
      launchpadAddress && [
        'launchpaddata_historical',
        data?.chainId,
        launchpadAddress,
      ],
    (_key: string, chainId: ChainId, launchpadAddress: EthereumAddress) =>
      listPricesHistorical(chainId, launchpadAddress),
  )
}
