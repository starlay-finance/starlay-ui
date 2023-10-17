import { initializeConnector } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { EVMWalletConnector } from '../../types'

export { matchIsInSafeAppContext } from './utils'

const connector = initializeConnector<GnosisSafe>(
  (actions) => new GnosisSafe({ actions }),
)
export const safeConnector: EVMWalletConnector<GnosisSafe> = {
  type: 'Safe',
  connector,
  connect: () => connector[0].activate(),
}
