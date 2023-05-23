import { FC } from 'react'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { HeaderWrapper } from '../common'
import { AppHeaderMobile } from './AppHeaderMobile'
import { AppHeaderWide } from './AppHeaderWide'

export const AppHeader: FC<{ openMenu: VoidFunction }> = ({ openMenu }) => {
  return (
    <AppHeaderWrapper>
      <AppHeaderMobile openMenu={openMenu} />
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
