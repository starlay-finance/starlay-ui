import {
  EthereumTransactionTypeExtended,
  InterestRate,
  LendingPool as LendingPoolContract,
  eEthereumTxType,
} from '@starlay-finance/contract-helpers'
import { LendingPool, TxItem, TxType } from 'src/types/starlay'
import { equals } from 'src/utils/address'
import { EVMChainId, getMarketConfig, getNetworkConfig } from '../config'
import { BASE_ASSET_DUMMY_ADDRESS } from '../pool-data-provider/converters/constants'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export class LendingPoolEVM implements LendingPool {
  constructor(
    private contract: LendingPoolContract,
    private chainId: EVMChainId,
  ) {}

  static new = ({ chainId, provider }: StaticRPCProviderEVM) =>
    new LendingPoolEVM(
      new LendingPoolContract(provider, getMarketConfig(chainId).addresses),
      chainId,
    )

  deposit: LendingPool['deposit'] = async (params) =>
    this.contract
      .deposit({
        user: params.account,
        reserve: params.asset,
        amount: params.amount.toString(),
      })
      .then(toTxItems)

  withdraw: LendingPool['withdraw'] = async (params) =>
    this.contract
      .withdraw({
        user: params.account,
        reserve: params.asset,
        amount: params.all ? '-1' : params.amount.toString(),
        lTokenAddress: params.collateral,
      })
      .then(toTxItems)

  borrow: LendingPool['borrow'] = async (params) =>
    this.contract
      .borrow({
        user: params.account,
        reserve: params.asset,
        amount: params.amount.toString(),
        interestRateMode: InterestRate.Variable,
        debtTokenAddress: params.debt,
      })
      .then(toTxItems)

  repay: LendingPool['repay'] = async (params) => {
    const repayAmount = !params.all
      ? params.amount.toString()
      : equals(params.asset, BASE_ASSET_DUMMY_ADDRESS)
      ? params.amount.times(1.01).toString()
      : '-1'
    return this.contract
      .repay({
        user: params.account,
        reserve: params.asset,
        amount: repayAmount,
        interestRateMode: InterestRate.Variable,
      })
      .then(toTxItems)
  }

  setUsageAsCollateral: LendingPool['setUsageAsCollateral'] = async (params) =>
    toTxItems(
      this.contract.setUsageAsCollateral({
        user: params.account,
        reserve: reserveAddress(params.asset, this.chainId),
        usageAsCollateral: params.usageAsCollateral,
      }),
    )
}
const toTxItems = (txs: EthereumTransactionTypeExtended[]): TxItem[] =>
  txs.map(toTxItem)

const toTxItem = ({ txType, tx }: EthereumTransactionTypeExtended): TxItem => ({
  type: txTypeToType(txType),
  tx,
})

const txTypeToType = (txType: eEthereumTxType): TxType => {
  switch (txType) {
    case eEthereumTxType.ERC20_APPROVAL:
      return 'Approval'
    case eEthereumTxType.DEBTERC20_APPROVAL:
      return 'DebtApproval'
    default:
      return 'Pool'
  }
}

const reserveAddress = (underlyingAsset: string, chainId: EVMChainId) => {
  if (!equals(underlyingAsset, BASE_ASSET_DUMMY_ADDRESS)) return underlyingAsset
  const {
    baseAsset: { wrapperAddress },
  } = getNetworkConfig(chainId)
  return wrapperAddress
}
