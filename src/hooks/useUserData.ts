import useSWR from 'swr'
import { useMarketData } from './useMarketData'
import { useStarlay } from './useStarlay'
import { useWallet } from './useWallet'

export const useUserData = () => {
  const { account } = useWallet()
  const { network, dataProvider } = useStarlay()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      network &&
      dataProvider &&
      account &&
      dataProvider.chainId === marketData?.chainId
        ? ['userdata', network, account, dataProvider.chainId]
        : undefined,
    ([_key, _network, account]) =>
      dataProvider!.getUserData({ account, marketData: marketData! }),
  )
}
