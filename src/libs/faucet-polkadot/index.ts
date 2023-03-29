import { Faucet } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { getNetworkConfigPolkadot } from '../config'
import { Faucet as FaucetContract } from '../polkadot/Faucet'
import { StaticRPCProviderPolkadot } from '../static-rpc-provider-polkadot'

export class FaucetPolkadot implements Faucet {
  private constructor(
    private contract: FaucetContract,
    private controller: PolkadotAddress,
  ) {}

  static new = ({ provider, chainId }: StaticRPCProviderPolkadot) => {
    const {
      addresses: { faucet, controller },
    } = getNetworkConfigPolkadot(chainId)
    return new FaucetPolkadot(new FaucetContract(provider, faucet), controller)
  }

  mint: Faucet['mint'] = async (amount, option) =>
    this.contract.mint(option?.assets || [], amount)
}
