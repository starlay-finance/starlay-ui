import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { BigNumber } from '@starlay-finance/math-utils'
import { TxItem } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/faucet'
import { toTxItem } from './utils'

export class Faucet extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  mint = async (
    assets: PolkadotAddress[],
    amount: BigNumber,
  ): Promise<TxItem[]> => {
    return [
      toTxItem('Pool', () =>
        this.buildUnsignedTx('mintUnderlyingAll', [
          '5G4iDroARt9xm2kE3poEw3Vvy8UEkt3pf42yjvx5UaoYPTgL',
          amount.toString(),
          null,
        ]),
      ),
    ]
    return assets.map((asset) =>
      toTxItem('Pool', () =>
        this.buildUnsignedTx('mint', [asset, amount.toString(), null]),
      ),
    )
  }
}
