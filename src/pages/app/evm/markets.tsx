import { Markets } from 'src/components/screens/Markets'
import { EVMPageLayout } from 'src/contexts/StarlayContextProviderEVM'
import { NextPageWithLayout } from 'src/pages/_app'

const MarketsPage: NextPageWithLayout = () => <Markets />

MarketsPage.getLayout = EVMPageLayout

export default MarketsPage
