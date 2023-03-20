import { Dashboard } from 'src/components/screens/Dashboard'
import { asEVMPage } from 'src/contexts/StarlayContextProviderEVM'

const AppPage = () => <Dashboard />

export default asEVMPage(AppPage)
