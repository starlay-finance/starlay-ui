import { TopProps } from 'src/components/screens/Top'
import { BackersProps } from 'src/components/screens/Top/parts/Backers'
import { LogoInvestorMock } from './images'

export const TOP_BACKERS: BackersProps = {
  backers: [
    { name: 'Example Corporation', image: LogoInvestorMock },
    { name: 'Example Corporation', image: LogoInvestorMock },
    { name: 'Example Corporation', image: LogoInvestorMock },
    { name: 'Example Corporation', image: LogoInvestorMock },
    { name: 'Example Corporation', image: LogoInvestorMock },
  ],
}

export const TOP_PROPS: TopProps = {
  ...TOP_BACKERS,
}
