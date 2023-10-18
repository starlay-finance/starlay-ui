import { Markets } from 'src/components/screens/Markets'
import { PolkadotPageLayout } from 'src/contexts/StarlayContextProviderPolkadot'
import { NextPageWithLayout } from 'src/pages/_app'

const MarketsPage: NextPageWithLayout = () => <Markets />

MarketsPage.getLayout = PolkadotPageLayout

export default MarketsPage
