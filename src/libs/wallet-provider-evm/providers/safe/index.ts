import { EVM_CHAIN_ID } from 'src/libs/config/network'
import { SafeConnector } from './safe-connector'

export { matchIsInSafeAppContext } from './utils'

export const safeConnector = new SafeConnector({
  supportedChainIds: [EVM_CHAIN_ID.astar],
})
