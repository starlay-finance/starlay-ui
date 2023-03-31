import { Dashboard } from 'src/components/screens/Dashboard'
import { EVMPageLayout } from 'src/contexts/StarlayContextProviderEVM'
import { NextPageWithLayout } from 'src/pages/_app'

const AppPage: NextPageWithLayout = () => <Dashboard />
AppPage.getLayout = EVMPageLayout

export default AppPage
