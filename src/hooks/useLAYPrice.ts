import { getLAYPrice } from 'src/libs/arthswap-data-provider'
import useSWR from 'swr'
import { useStaticRPCProviderEVM } from './useStaticRPCProviderEVM'

export const useLAYPrice = () => {
  const { data } = useStaticRPCProviderEVM()
  return useSWR(
    () => data && ['layprice', data?.chainId],
    ([_key, chainId]) => getLAYPrice(chainId),
  )
}
