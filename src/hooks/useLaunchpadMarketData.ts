import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { Market, PriceChartData } from 'src/components/screens/Launchpad/types'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { ChainId } from 'src/libs/config'
import {
  getCurrentPrice,
  listPricesHistorical,
} from 'src/libs/launchpad-price-data-provider'
import { getCurrentStats } from 'src/libs/launchpad-stats-provider'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'

const INTERVAL = 60000

export const useLaunchpadMarketData = ({
  saleStart,
  saleEnd,
  ...params
}: {
  launchpadAddress?: EthereumAddress
  saleStart: Dayjs
  saleEnd: Dayjs
}) => {
  const { data: provider } = useStaticRPCProvider()
  const context = useLaunchpadContext()
  const launchpadAddress = params?.launchpadAddress || context.launchpadAddress
  const { data, mutate } = useSWRImmutable(
    () =>
      provider &&
      launchpadAddress && [
        'launchpaddata_historical',
        provider.chainId,
        launchpadAddress,
      ],
    (_key: string, chainId: ChainId, launchpadAddress: EthereumAddress) =>
      fetchLaunchpadMarketData(chainId, launchpadAddress, saleStart),
  )

  useEffect(() => {
    if (!data) return
    const { chartData } = data
    const now = dayjs()
    const latestTimestamp = chartData[chartData.length - 1]?.timestamp || 0
    if (saleEnd.isBefore(dayjs.unix(latestTimestamp))) return

    const next = now.isBefore(saleStart)
      ? saleStart.unix() - now.unix()
      : Math.max(INTERVAL - (now.unix() - latestTimestamp), INTERVAL)
    const timer = setTimeout(() => {
      mutate(
        async (data) =>
          updateLaunchpadMarketData(
            data || { chartData: [initialChartData(saleStart)] },
            provider!.chainId,
            launchpadAddress!,
            latestTimestamp,
            saleEnd,
          ),
        { revalidate: false },
      )
    }, next)
    return () => {
      clearTimeout(timer)
    }
  }, [data])

  return { data }
}

const fetchLaunchpadMarketData = async (
  chainId: ChainId,
  launchpadAddress: EthereumAddress,
  saleStart: Dayjs,
) => {
  const [prices, stats, chartData] = await Promise.all([
    getCurrentPrice(chainId, launchpadAddress),
    getCurrentStats(chainId, launchpadAddress),
    listPricesHistorical(chainId, launchpadAddress),
  ])
  if (!prices || !stats) return undefined
  return {
    market: { ...stats, ...prices },
    chartData: [initialChartData(saleStart), ...chartData],
  }
}

const updateLaunchpadMarketData = async (
  current: { market?: Market; chartData: PriceChartData[] },
  chainId: ChainId,
  launchpadAddress: EthereumAddress,
  latestTimestamp: number,
  saleEnd: Dayjs,
): Promise<{ market: Market; chartData: PriceChartData[] } | undefined> => {
  const [prices, stats, newChartData] = await Promise.all([
    getCurrentPrice(chainId, launchpadAddress!),
    getCurrentStats(chainId, launchpadAddress!),
    listPricesHistorical(chainId, launchpadAddress!, latestTimestamp),
  ])
  if (!prices || !stats)
    return current.market ? { ...current, market: current.market } : undefined
  const market = { ...prices, ...stats }
  const chartData = [...current.chartData, ...newChartData]
  return {
    market,
    chartData: !market.closed
      ? chartData
      : [
          ...chartData,
          {
            priceInUSD: market.currentPriceInUSD.toNumber(),
            bottomPriceInUSD: market.bottomPriceInUSD.toNumber(),
            timestamp: saleEnd.unix(),
          },
        ],
  }
}

const initialChartData = (saleStart: Dayjs): PriceChartData => ({
  priceInUSD: 0,
  bottomPriceInUSD: 0,
  timestamp: saleStart.unix(),
})
