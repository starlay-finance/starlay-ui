import { Top } from 'src/components/screens/Top'
import { TOP_PROPS } from 'src/constants/top'
import { asEVMPage } from 'src/contexts/StarlayContextProviderEVM'

const TopPage = () => <Top {...TOP_PROPS} />

export default asEVMPage(TopPage)
