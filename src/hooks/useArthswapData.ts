import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { listArthswapAprs } from 'src/libs/arthswap-data-provider'
import { ChainId } from 'src/libs/config'
import useSWR from 'swr'

export const useArthswapData = () => {
  const { data } = useStaticRPCProvider()
  return useSWR(
    () => data && ['arthswap', data?.chainId],
    (_key: string, chainId: ChainId) => listArthswapAprs(chainId),
  )
}
