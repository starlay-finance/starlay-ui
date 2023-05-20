import { ReactNode } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { Z_HEADER } from 'src/utils/zIndex'
import styled from 'styled-components'

export const HEADER_HEIGHT = '72px'

export const HeaderWrapper = asStyled<{ children: ReactNode }>(
  ({ children, className }) => (
    <>
      <StyledHeader>
        <Content className={className}>{children}</Content>
      </StyledHeader>
      <Spacer />
    </>
  ),
)``

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_HEIGHT};
  z-index: ${Z_HEADER};
  backdrop-filter: blur(48px) brightness(0.52);
  background: rgba(0, 0, 0, 0.52);
  ${Content} {
    position: relative;
    max-width: var(${contentMaxWidthCssVar});
    margin: 0 auto;
    padding: 0 24px;
  }
`

const Spacer = styled.div`
  min-height: ${HEADER_HEIGHT};
`
