import {
  EthereumTransactionTypeExtended,
  TokenSaleVesting,
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
import { tokenSaleVestingContract } from 'src/libs/token-sale-vesting'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useWallet } from '../useWallet'
import { useTxHandler } from './txHandler'
import { useVotingEscrow } from './useVotingEscrow'

type TokenSaleType = 'ido' | 'tokenSale'
export const useTokenSaleVesting = () => {
  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useWallet()
  const { userData: userLockData, mutate: mutateVe } = useVotingEscrow()

  const { data: contracts } = useSWRImmutable(
    provider && ['tokensalevesting', provider.chainId],
    async () => init(provider!),
  )
  const { data: userData, mutate } = useSWRImmutable(
    account &&
      provider &&
      contracts && ['votingescrow-userdata', provider.chainId, account],
    async (_1, _2, account) => fetchUserData(contracts!, account),
  )

  const handler = useTxHandler()
  const handleTx = (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
    onSuccess?: VoidFunction,
  ) =>
    handler.handleTx(txs, signer, () => {
      onSuccess && onSuccess()
      mutate()
      mutateVe()
    })

  const lock = async (
    type: TokenSaleType,
    amountBn: BigNumber,
    duration: number,
    onSuccess?: VoidFunction,
  ) => {
    if (!account || !signer || !contracts) throw new Error('Unexpected state')
    const lockerId = userLockData?.lockerId
    const amount = amountBn.toString()
    if (!lockerId || lockerId.isZero())
      return handleTx(
        await contracts[type].lock({ user: account, amount, duration }),
        signer,
      )
    return handleTx(
      await contracts[type].deposit({ user: account, amount }),
      signer,
      onSuccess,
    )
  }

  return { userData, lock }
}

const init = async (provider: StaticRPCProvider) => {
  const { addresses, rewardToken } = getNetworkConfig(provider.chainId)
  const ido = tokenSaleVestingContract(
    provider!,
    addresses.idoVestingAddress,
    addresses.multicallAddress,
  )
  const tokenSale = tokenSaleVestingContract(
    provider!,
    addresses.tokenSaleVestingAddress,
    addresses.multicallAddress,
  )
  return { ido, tokenSale }
}

const fetchUserData = async (
  { ido, tokenSale }: Record<TokenSaleType, TokenSaleVesting>,
  account: string,
) => {
  const [idoRes, tokenSaleRes] = await Promise.all([
    ido.userData({ user: account }),
    tokenSale.userData({ user: account }),
  ])
  return {
    ido: {
      claimable: normalizeBN(idoRes.releasable.toString(), WEI_DECIMALS),
      lockable: normalizeBN(idoRes.lockableAmount.toString(), WEI_DECIMALS),
      vestingEnd: dayjs.unix(idoRes.vestingEnd.toNumber()),
    },
    tokenSale: {
      claimable: normalizeBN(tokenSaleRes.releasable.toString(), WEI_DECIMALS),
      lockable: normalizeBN(
        tokenSaleRes.lockableAmount.toString(),
        WEI_DECIMALS,
      ),
      vestingEnd: dayjs.unix(tokenSaleRes.vestingEnd.toNumber()),
    },
  }
}
