import { CHAIN_ID } from 'src/libs/config/network'
import { SafeConnector } from './safe-connector'

export { matchIsInSafeAppContext } from './utils'

export const safeConnector = new SafeConnector({
  supportedChainIds: [CHAIN_ID.astar],
})
