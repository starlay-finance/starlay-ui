import { BigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { getMarketConfig } from 'src/libs/config'
import { launchpadContract } from 'src/libs/launchpad'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useTxHandler } from './txHandler'

export const useLaunchpad = (
  account: EthereumAddress | null | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
) => {
  const { data: provider } = useStaticRPCProvider()
  const { data: launchpad } = useSWRImmutable(
    provider && ['launchpad', provider.chainId],
    () => {
      const { LEVERAGER } = getMarketConfig(provider!.chainId).addresses
      if (!LEVERAGER) return undefined
      return launchpadContract(provider!, LEVERAGER)
    },
  )
  const { handleTx } = useTxHandler()

  const bid = async (param: {
    amount: BigNumber
    asset: EthereumAddress
    limitPrice?: BigNumber
    cancelable?: boolean
  }) => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await launchpad.bid({
        user: account,
        reserve: param.asset,
        amount: param.amount.toString(),
        priceCap: param.limitPrice?.toString() || '0',
        cancelable: param.cancelable || false,
      }),
      signer,
    )
  }

  const update = async (param: {
    amount: BigNumber
    asset: EthereumAddress
    limitPrice?: BigNumber
  }) => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await launchpad.update({
        user: account,
        reserve: param.asset,
        amount: param.amount.toString(),
        priceCap: param.limitPrice?.toString() || '0',
      }),
      signer,
    )
  }

  const cancel = async () => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(await launchpad.cancel({ user: account }), signer)
  }

  return { bid, update, cancel }
}
