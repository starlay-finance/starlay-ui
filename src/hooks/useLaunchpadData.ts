import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { Market } from 'src/components/screens/Launchpad/types'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { ChainId } from 'src/libs/config'
import { getCurrentData } from 'src/libs/launchpad-data-provider'
import {
  getCurrentPrice,
  listPricesHistorical,
} from 'src/libs/launchpad-historical-data-provider'
import { EthereumAddress } from 'src/types/web3'
import useSWR from 'swr'

export const useLaunchpadData = () => {
  const { data } = useStaticRPCProvider()
  const { launchpadAddress } = useLaunchpadContext()
  return useSWR<Market | undefined>(
    () =>
      data &&
      launchpadAddress && [
        'launchpaddata_current',
        data?.chainId,
        launchpadAddress,
      ],
    async (
      _key: string,
      chainId: ChainId,
      launchpadAddress: EthereumAddress,
    ) => {
      const [currentPriceInUSD, market] = await Promise.all([
        getCurrentPrice(chainId, launchpadAddress),
        getCurrentData(chainId, launchpadAddress),
      ])
      if (!currentPriceInUSD || !market) return undefined
      return {
        ...market,
        currentPriceInUSD,
      }
    },
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
