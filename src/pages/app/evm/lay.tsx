import { Lay } from 'src/components/screens/Lay'
import { EVMPageLayout } from 'src/contexts/StarlayContextProviderEVM'
import { NextPageWithLayout } from 'src/pages/_app'

const LayPage: NextPageWithLayout = () => <Lay />

LayPage.getLayout = EVMPageLayout

export default LayPage
