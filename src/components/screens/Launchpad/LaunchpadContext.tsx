import { createContext, ReactNode, useContext, VFC } from 'react'
import { EthereumAddress } from 'src/types/web3'
import { ProjectData } from './types'
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

type WithLaunchpadContextHOC = <T extends { data: ProjectData }>(
  Component: VFC<T>,
) => VFC<T>
export const withLaunchpadContext: WithLaunchpadContextHOC =
  (Component) => (props) =>
    (
      <LaunchpadContextProvider launchpadAddress={props.data.launchpadAddress}>
        <Component {...props} />
      </LaunchpadContextProvider>
    )
