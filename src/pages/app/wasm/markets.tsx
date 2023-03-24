import { Markets } from 'src/components/screens/Markets'
import { asPolkadotPage } from 'src/contexts/StarlayContextProviderPolkadot'

const MarketsPage = () => <Markets />

export default asPolkadotPage(MarketsPage)
