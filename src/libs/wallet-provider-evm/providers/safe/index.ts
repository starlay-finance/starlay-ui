import { initializeConnector } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'

export { matchIsInSafeAppContext } from './utils'

export const safeConnector = initializeConnector<GnosisSafe>(
  (actions) => new GnosisSafe({ actions }),
)
// export const safeConnector = new SafeConnector({
//   supportedChainIds: [EVM_CHAIN_ID.astar],
// })
