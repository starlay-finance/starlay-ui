import {
  EthereumTransactionTypeExtended,
  VotingEscrow,
} from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  normalizeBN,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { getNetworkConfig } from 'src/libs/config'
import { StaticRPCProvider } from 'src/libs/pool-data-provider'
import { votingEscrowContract } from 'src/libs/voting-escrow'
import { SECONDS_OF_WEEK } from 'src/utils/date'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useWallet } from '../useWallet'
import { useTxHandler } from './txHandler'

export const useVotingEscrow = () => {
  const nextTerm = Math.ceil(dayjs().unix() / SECONDS_OF_WEEK) * SECONDS_OF_WEEK

  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useWallet()
  const { data: votingEscrow } = useSWRImmutable(
    provider && ['votingescrow', provider.chainId],
    async () => init(provider!),
  )

  const {
    data,
    mutate: mutateData,
    isValidating: isValidatingData,
  } = useSWRImmutable(
    provider &&
      votingEscrow && ['votingescrow-data', provider.chainId, nextTerm],
    async (_1, _2, term) => fetchData(votingEscrow!, term),
  )
  const {
    data: userData,
    mutate: mutateUserData,
    isValidating: isValidatingUserData,
  } = useSWRImmutable(
    account &&
      provider &&
      votingEscrow && [
        'votingescrow-userdata',
        provider.chainId,
        account,
        nextTerm,
      ],
    async (_1, _2, account, term) =>
      fetchUserData(votingEscrow!, account, term),
  )

  const mutate = () => {
    mutateData()
    mutateUserData()
  }
  const handler = useTxHandler()
  const handleTx = (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
  ) => handler.handleTx(txs, signer, mutate)

  const lock = async (
    amount: BigNumber,
    duration: number,
    mode?: 'amount' | 'duration',
  ) => {
    if (!account || !signer || !votingEscrow)
      throw new Error('Unexpected state')
    const lockerId = userData?.lockerId
    if (!lockerId || lockerId.isZero())
      return handleTx(
        await votingEscrow.createLock({
          user: account,
          amount: amount.toString(),
          duration: duration!.toFixed(),
        }),
        signer,
      )
    if (mode === 'amount')
      return handleTx(
        await votingEscrow.increaseAmount({
          user: account,
          amount: amount.toString(),
        }),
        signer,
      )
    return handleTx(
      await votingEscrow.increaseUnlockTime({
        user: account,
        duration: duration!.toFixed(),
      }),
      signer,
    )
  }

  const withdraw = async () => {
    if (!account || !signer || !votingEscrow)
      throw new Error('Unexpected state')
    return handleTx(await votingEscrow.withdraw({ user: account }), signer)
  }

  return {
    ...data,
    userData,
    nextTerm,
    lock,
    withdraw,
    mutate,
    isValidating: isValidatingData || isValidatingUserData,
  }
}

const init = async (provider: StaticRPCProvider) => {
  const { addresses, rewardToken } = getNetworkConfig(provider.chainId)
  return votingEscrowContract(
    provider!,
    addresses.votingEscrowAddress,
    rewardToken.underlyingAsset,
  )
}

const fetchData = async (votingEscrow: VotingEscrow, timestamp: number) => {
  const lockData = await votingEscrow.lockData({ timestamp })
  return {
    totalVotingPower: normalizeBN(
      lockData.totalVotingPower.toString(),
      WEI_DECIMALS,
    ),
    totalLocked: normalizeBN(lockData.totalLocked.toString(), WEI_DECIMALS),
  }
}

const fetchUserData = async (
  votingEscrow: VotingEscrow,
  account: string,
  timestamp: number,
) => {
  const userData = await votingEscrow.userLockData({
    user: account,
    timestamp,
  })
  return (
    userData && {
      lockerId: userData.lockerId,
      locked: normalizeBN(userData.locked.toString(), WEI_DECIMALS),
      lockedEnd: dayjs.unix(userData.lockedEnd.toNumber()),
      votingPower: normalizeBN(userData.votingPower.toString(), WEI_DECIMALS),
    }
  )
}
