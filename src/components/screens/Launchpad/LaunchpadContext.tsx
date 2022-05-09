import { createContext, ReactNode, useContext, VFC } from 'react'
import { EthereumAddress } from 'src/types/web3'
type LaunchpadContextInterface = {
  launchpadAddress: EthereumAddress | undefined
}

const DEFAULT_VALUE: LaunchpadContextInterface = {
  launchpadAddress: undefined,
}

const LaunchpadContext = createContext(DEFAULT_VALUE)

export const LaunchpadContextProvider: VFC<{
  launchpadAddress: EthereumAddress | undefined
  children: ReactNode
}> = ({ launchpadAddress, children }) => (
  <LaunchpadContext.Provider value={{ launchpadAddress }}>
    {children}
  </LaunchpadContext.Provider>
)

export const useLaunchpadContext = () => useContext(LaunchpadContext)
