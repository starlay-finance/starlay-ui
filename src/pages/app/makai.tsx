import { Makai } from 'src/components/screens/Makai'
import { asEVMPage } from 'src/contexts/StarlayContextProviderEVM'

const MakaiPage = () => <Makai />

export default asEVMPage(MakaiPage)
