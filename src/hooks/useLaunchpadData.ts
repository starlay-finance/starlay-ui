import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { Market } from 'src/components/screens/Launchpad/types'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { ChainId } from 'src/libs/config'
import {
  getCurrentPrice,
  listPricesHistorical,
} from 'src/libs/launchpad-price-data-provider'
import { getCurrentStats } from 'src/libs/launchpad-stats-provider'
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
      const [prices, stats] = await Promise.all([
        getCurrentPrice(chainId, launchpadAddress),
        getCurrentStats(chainId, launchpadAddress),
      ])
      if (!prices || !stats) return undefined

      return { ...stats, ...prices }
    },
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
