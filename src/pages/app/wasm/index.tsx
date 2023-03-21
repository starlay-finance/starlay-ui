import { Dashboard } from 'src/components/screens/Dashboard'
import { asPolkadotPage } from 'src/contexts/StarlayContextProviderPolkadot'

const AppPage = () => <Dashboard />

export default asPolkadotPage(AppPage)
