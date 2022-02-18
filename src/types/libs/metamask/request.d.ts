// see https://docs.metamask.io/guide/rpc-api.html

type MetamaskRequest = {
  (arg: {
    method: 'wallet_addEthereumChain'
    params: [AddEthereumChainParameter]
  }): Promise<null>
  (arg: {
    method: 'wallet_switchEthereumChain'
    params: [SwitchEthereumChainParameter]
  }): Promise<null>
  (arg: { method: 'eth_requestAccounts' }): Promise<string[]>
  (arg: { method: 'wallet_watchAsset'; params: WatchAssetParams }): Promise<
    string[]
  >
}

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

interface SwitchEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
}

interface WatchAssetParams {
  type: 'ERC20' // In the future, other standards will be supported
  options: {
    address: string // The address of the token contract
    symbol: string // A ticker symbol or shorthand, up to 5 characters
    decimals: number // The number of token decimals
    image: string // A string url of the token logo
  }
}
