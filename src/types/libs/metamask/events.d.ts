// see https://docs.metamask.io/guide/ethereum-provider.html#events

type MetamaskEventHandler = {
  (event: 'chainChanged', callback: (chainId: number) => void): void
  (event: 'accountsChanged', callback: (accounts: string[]) => void): void
}
