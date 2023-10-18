import router from 'next/router'
import { getLastConnectedNetwork } from 'src/utils/localStorage'
import { APP, POLKADOT_APP } from 'src/utils/routes'

const App = () => {
  if (typeof window === 'undefined') return <></>
  if (getLastConnectedNetwork() === 'Polkadot') {
    router.replace(POLKADOT_APP)
  } else {
    router.replace(APP)
  }
  return <></>
}

export default App
