import useSWR from 'swr'
import { useMarketData } from './useMarketData'
import { useStarlay } from './useStarlay'
import { useWallet } from './useWallet'

export const useUserData = () => {
  const { account } = useWallet()
  const { dataProvider } = useStarlay()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      dataProvider && account && dataProvider.chainId === marketData?.chainId
        ? ['userdata', dataProvider.chainId, account]
        : undefined,
    ([_key, _chainId, account]) =>
      dataProvider!.getUserData({ account, marketData: marketData! }),
  )
}
