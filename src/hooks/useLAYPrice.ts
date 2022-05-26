import { getLAYPrice } from 'src/libs/arthswap-data-provider'
import { ChainId } from 'src/libs/config'
import useSWR from 'swr'
import { useStaticRPCProvider } from './useStaticRPCProvider'

export const useLAYPrice = () => {
  const { data } = useStaticRPCProvider()
  return useSWR(
    () => data && ['layprice', data?.chainId],
    (_key: string, chainId: ChainId) => getLAYPrice(chainId),
  )
}
