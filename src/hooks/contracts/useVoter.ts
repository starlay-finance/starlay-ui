import {
  EthereumTransactionTypeExtended,
  Voter,
} from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  normalizeBN,
  valueToBigNumber,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { getNetworkConfig } from 'src/libs/config'
import { StaticRPCProvider } from 'src/libs/pool-data-provider'
import { voterContract } from 'src/libs/voter'
import { SECONDS_OF_WEEK } from 'src/utils/date'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useWallet } from '../useWallet'
import { useTxHandler } from './txHandler'
import { useVotingEscrow } from './useVotingEscrow'

export const useVoter = () => {
  const nextTerm = Math.ceil(dayjs().unix() / SECONDS_OF_WEEK) * SECONDS_OF_WEEK

  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useWallet()
  const { userData: userLockData } = useVotingEscrow()
  const { data: voter } = useSWRImmutable(
    provider && ['voter', provider.chainId],
    async () => init(provider!),
  )

  const { data, mutate: mutateData } = useSWRImmutable(
    provider && voter && ['voter', provider.chainId, nextTerm],
    async (_1, _2, nextTerm) => fetchData(voter!, nextTerm),
  )

  const { data: userData, mutate: mutateUserData } = useSWRImmutable(
    userLockData &&
      provider &&
      voter && [
        'voter',
        provider.chainId,
        nextTerm,
        userLockData.lockerId.toString(),
      ],
    async (_1, _2, nextTerm, lockerId) =>
      fetchUserData(voter!, nextTerm, lockerId),
  )

  const handler = useTxHandler()
  const handleTx = (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
  ) =>
    handler.handleTx(txs, signer, () => {
      mutateData()
      mutateUserData()
    })

  const vote = async (weights: Partial<Record<string, BigNumber>>) => {
    if (!account || !signer || !voter) throw new Error('Unexpected state')
    return handleTx(
      await voter.vote({
        user: account,
        weights: Object.keys(weights).reduce(
          (res, key) => ({
            ...res,
            [key.toLowerCase()]: weights[key]!.toString(),
          }),
          {},
        ),
      }),
      signer,
    )
  }

  const poke = async () => {
    if (!account || !signer || !voter) throw new Error('Unexpected state')
    return handleTx(await voter.poke({ user: account }), signer)
  }

  const claim = async () => {
    if (!account || !signer || !voter) throw new Error('Unexpected state')
    return handleTx(await voter.claim({ user: account }), signer)
  }

  return { ...data, userData, vote, poke, claim }
}

const init = async (provider: StaticRPCProvider) => {
  const { addresses } = getNetworkConfig(provider.chainId)
  return voterContract(
    provider!,
    addresses.voterAddress,
    addresses.multicallAddress,
  )
}

const fetchData = async (voter: Voter, timestamp: number) => {
  const { totalWeight, poolWeights } = await voter.voteData({ timestamp })
  return {
    totalWeight: normalizeBN(totalWeight.toString(), WEI_DECIMALS),
    poolWeights: Object.keys(poolWeights).reduce(
      (res, key) => ({
        ...res,
        [key]: normalizeBN(poolWeights[key]!.toString(), WEI_DECIMALS),
      }),
      {},
    ),
  }
}

const fetchUserData = async (
  voter: Voter,
  timestamp: number,
  lockerId: string,
) => {
  const userData = await voter.userData({ lockerId, timestamp })
  return Object.keys(userData).reduce(
    (res, key) => ({
      ...res,
      [key]: {
        rawClaimable: '0', // userData[key]!.claimable,
        weight: valueToBigNumber(userData[key]!.weight.toString()),
        vote: normalizeBN(userData[key]!.vote.toString(), WEI_DECIMALS),
      },
    }),
    {},
  )
}
