import { Dashboard } from 'src/components/screens/Dashboard'
import { PolkadotPageLayout } from 'src/contexts/StarlayContextProviderPolkadot'
import { NextPageWithLayout } from 'src/pages/_app'

const AppPage: NextPageWithLayout = () => <Dashboard />

AppPage.getLayout = PolkadotPageLayout

export default AppPage
