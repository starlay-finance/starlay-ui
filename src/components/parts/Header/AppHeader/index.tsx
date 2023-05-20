import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { HeaderWrapper } from '../common'
import { AppHeaderMobile } from './AppHeaderMobile'
import { AppHeaderWide } from './AppHeaderWide'

export const AppHeader = () => {
  return (
    <AppHeaderWrapper>
      <AppHeaderMobile />
      <AppHeaderWide />
    </AppHeaderWrapper>
  )
}

const AppHeaderWrapper = styled(HeaderWrapper)`
  ${AppHeaderMobile} {
    flex: 1;
  }
  ${AppHeaderWide} {
    display: none;
  }
  @media ${breakpoint.xl} {
    ${AppHeaderMobile} {
      display: none;
    }
    ${AppHeaderWide} {
      display: flex;
      flex: 1;
    }
  }
`
