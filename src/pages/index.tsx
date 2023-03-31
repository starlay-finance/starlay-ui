import { Top } from 'src/components/screens/Top'
import { TOP_PROPS } from 'src/constants/top'
import { EVMPageLayout } from 'src/contexts/StarlayContextProviderEVM'
import { NextPageWithLayout } from './_app'

const TopPage: NextPageWithLayout = () => <Top {...TOP_PROPS} />

TopPage.getLayout = EVMPageLayout

export default TopPage
