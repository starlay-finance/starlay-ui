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
import { ethers } from 'ethers'
import { getNetworkConfig } from 'src/libs/config'
import { StaticRPCProvider } from 'src/libs/pool-data-provider'
import { voterContract } from 'src/libs/voter'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useWallet } from '../useWallet'
import { useTxHandler } from './txHandler'
import { useVotingEscrow } from './useVotingEscrow'

export const useVoter = () => {
  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useWallet()
  const { nextTerm, userData: userLockData } = useVotingEscrow()
  const { data: voter } = useSWRImmutable(
    provider && ['voter', provider.chainId],
    async () => init(provider!),
  )

  const { data, mutate: mutateData } = useSWRImmutable(
    provider && voter && ['voter-data', provider.chainId, nextTerm],
    async (_1, _2, nextTerm) => fetchData(voter!, nextTerm),
  )

  const { data: userData, mutate: mutateUserData } = useSWRImmutable(
    userLockData &&
      provider &&
      account &&
      voter && [
        'voter-userdata',
        provider.chainId,
        nextTerm,
        account,
        userLockData.lockerId.toString(),
      ],
    async (_1, _2, nextTerm, account, lockerId) =>
      fetchUserData(voter!, nextTerm, account, lockerId),
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

  return { data, userData, vote, poke, claim }
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
  const { totalWeight, data } = await voter.voteData({ timestamp })
  return {
    total: normalizeBN(totalWeight.toString(), WEI_DECIMALS),
    data: Object.keys(data).reduce(
      (res, key) => ({
        ...res,
        [key]: {
          weight: normalizeBN(data[key]!.weight.toString(), WEI_DECIMALS),
          rawLastWeekRevenue: data[key]!.lastWeekRevenue.toString(),
        },
      }),
      {},
    ) as Partial<
      Record<string, { rawLastWeekRevenue: string; weight: BigNumber }>
    >,
  }
}

const fetchUserData = async (
  voter: Voter,
  timestamp: number,
  user: string,
  lockerId: string,
) => {
  const userData = await voter.userData({ user, lockerId, timestamp })
  return Object.keys(userData).reduce(
    (res, key) => ({
      ...res,
      [key]: {
        rawClaimable: userData[key]!.claimable,
        weight: valueToBigNumber(userData[key]!.weight.toString()),
        vote: normalizeBN(userData[key]!.vote.toString(), WEI_DECIMALS),
      },
    }),
    {},
  ) as Partial<
    Record<
      string,
      { rawClaimable: BigNumber; weight: BigNumber; vote: BigNumber }
    >
  >
}
