import { Makai } from 'src/components/screens/Makai'
import { EVMPageLayout } from 'src/contexts/StarlayContextProviderEVM'
import { NextPageWithLayout } from 'src/pages/_app'

const MakaiPage: NextPageWithLayout = () => <Makai />

MakaiPage.getLayout = EVMPageLayout

export default MakaiPage
