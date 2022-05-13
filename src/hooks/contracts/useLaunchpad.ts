import {
  EthereumTransactionTypeExtended,
  Launchpad,
} from '@starlay-finance/contract-helpers'
import { BigNumber, normalizeBN } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { useLaunchpadContext } from 'src/components/screens/Launchpad/LaunchpadContext'
import { launchpadContract } from 'src/libs/launchpad'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useLaunchpadBid } from '../useLaunchpadBid'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useWallet } from '../useWallet'
import { useTxHandler } from './txHandler'

const ASSET_DECIMALS = 18
const BIDDING_ASSET_DECIMALS = 6

type UserResult = {
  claimable: BigNumber
  refundable: BigNumber
}
export const useLaunchpad = (params?: {
  launchpadAddress: EthereumAddress
}) => {
  const context = useLaunchpadContext()
  const launchpadAddress = params?.launchpadAddress || context.launchpadAddress
  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useWallet()
  const { data: currentBid, mutate: mutateBid } = useLaunchpadBid(params)

  const { data: launchpad } = useSWRImmutable(
    provider &&
      launchpadAddress && ['launchpad', provider.chainId, launchpadAddress],
    (_key, _chainId, launchpadAddress) => {
      return launchpadContract(provider!, launchpadAddress)
    },
  )

  const { data: userResult } = useSWRImmutable<UserResult>(
    provider &&
      launchpadAddress &&
      launchpad &&
      account && [
        'launchpad_userdata',
        provider.chainId,
        launchpadAddress,
        account,
      ],
    (_key, _chainId, _launchpadAddress, account) =>
      fetchUserResult(launchpad!, account),
  )

  const handler = useTxHandler()
  const handleTx = (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
  ) => handler.handleTx(txs, signer, mutateBid)

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

  const updateAmount = async (param: {
    amount: BigNumber
    asset: EthereumAddress
  }) => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await launchpad.updateAmount({
        user: account,
        reserve: param.asset,
        amount: param.amount.toString(),
      }),
      signer,
    )
  }

  const updateLimitPrice = async (param: {
    asset: EthereumAddress
    limitPrice?: BigNumber
  }) => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await launchpad.updatePriceCap({
        user: account,
        reserve: param.asset,
        priceCap: param.limitPrice?.toString() || '0',
      }),
      signer,
    )
  }

  const cancel = async () => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(await launchpad.cancel({ user: account }), signer)
  }

  const refund = async () => {
    if (!launchpad || !account || !signer) throw new Error('Unexpected state')
    return handleTx(await launchpad.refund({ user: account }), signer)
  }

  return {
    bid,
    update,
    updateAmount,
    updateLimitPrice,
    cancel,
    refund,
    currentBid,
    userResult,
  }
}

const fetchUserResult = async (
  launchpad: Launchpad,
  account: EthereumAddress,
): Promise<UserResult> => {
  const [claimable, refundable] = await Promise.all([
    launchpad
      .claimable(account)
      .then((claimable) => normalizeBN(claimable.toString(), ASSET_DECIMALS)),
    launchpad
      .refundable(account)
      .then((refundable) =>
        normalizeBN(refundable.toString(), BIDDING_ASSET_DECIMALS),
      ),
  ])

  return { claimable, refundable }
}
