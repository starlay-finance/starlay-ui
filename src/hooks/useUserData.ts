import useSWR from 'swr'
import { useEVMWallet } from './useEVMWallet'
import { useMarketData } from './useMarketData'
import { useStarlay } from './useStarlay'

export const useUserData = () => {
  const { account } = useEVMWallet()
  const { dataProvider } = useStarlay()
  const { data: marketData } = useMarketData()
  return useSWR(
    () =>
      dataProvider &&
      account &&
      dataProvider.chainId === marketData?.chainId && [
        'userdata',
        dataProvider.chainId,
        account,
      ],
    ([_key, _chainId, account]) =>
      dataProvider!.getUserData({ account, marketData: marketData! }),
  )
}
