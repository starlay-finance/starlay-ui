import { EthereumTransactionTypeExtended } from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  normalizeBN,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { claimerContract } from 'src/libs/claimer'
import { getNetworkConfig } from 'src/libs/config'
import { StaticRPCProviderEVM } from 'src/libs/static-rpc-provider'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from '../useEVMWallet'
import { useMarketData } from '../useMarketData'
import { useStaticRPCProviderEVM } from '../useStaticRPCProviderEVM'
import { useUserData } from '../useUserData'
import { useTxHandler } from './txHandler'

export const useClaimer = () => {
  const { data: provider } = useStaticRPCProviderEVM()
  const { account, signer } = useEVMWallet()
  const { data: claimer } = useSWRImmutable(
    provider && ['claimer', provider.chainId],
    async () => init(provider!),
  )
  const { data: marketData } = useMarketData()
  const { data: userData } = useUserData()
  const assets = useMemo(
    () =>
      !userData || !marketData
        ? undefined
        : marketData.assets.flatMap(
            ({ symbol, lTokenAddress, vdTokenAddress }) => {
              const asset = userData.balanceByAsset[symbol]
              const results = []
              if (!asset.deposited.isZero()) results.push(lTokenAddress)
              if (!asset.borrowed.isZero()) results.push(vdTokenAddress)
              return results
            },
          ),
    [marketData, userData],
  )

  const { data, mutate } = useSWR(
    provider &&
      claimer &&
      account &&
      assets && ['claimer-data', provider.chainId, account],
    async ([_1, _2, account]) => {
      const res = await claimer!.releasable({
        user: account,
        reserves: assets!,
      })
      return {
        ido: normalizeBN(res.ido.toString(), WEI_DECIMALS),
        tokenSale: normalizeBN(res.tokenSale.toString(), WEI_DECIMALS),
        rewards: normalizeBN(res.rewards.toString(), WEI_DECIMALS),
      }
    },
    { dedupingInterval: 10000 },
  )
  const handler = useTxHandler()
  const handleTx = (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
  ) => handler.handleTx(txs, signer, mutate)
  const claim = async () => {
    if (!account || !signer || !claimer || !assets)
      throw new Error('Unexpected state')
    return handleTx(
      await claimer.release({ user: account, reserves: assets }),
      signer,
    )
  }

  return {
    data: data &&
      userData && {
        ...data,
        total: BigNumber.sum(data.ido, data.tokenSale, data.rewards),
      },
    claim,
  }
}

const init = async (provider: StaticRPCProviderEVM) => {
  const { addresses } = getNetworkConfig(provider.chainId)
  return claimerContract(provider!, addresses.claimerAddress)
}
