import { Markets } from 'src/components/screens/Markets'
import { asEVMPage } from 'src/contexts/StarlayContextProviderEVM'

const MarketsPage = () => <Markets />

export default asEVMPage(MarketsPage)
