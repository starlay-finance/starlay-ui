import { ReactNode, VFC } from 'react'
import { IconCloseAlt } from 'src/assets/svgs'
import { darkRed, skyBlue } from 'src/styles/colors'
import styled from 'styled-components'

export const GlassModalContent: VFC<{
  children: ReactNode
  closeModal?: VoidFunction
}> = ({ closeModal, children }) => (
  <Content>
    {closeModal && (
      <CloseButtonDiv>
        <button onClick={closeModal}>
          <IconCloseAlt />
        </button>
      </CloseButtonDiv>
    )}
    <Body>{children}</Body>
  </Content>
)

const CloseButtonDiv = styled.div``
const Content = styled.div`
  position: relative;
  ${CloseButtonDiv} {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px;
    padding-right: 0px;
  }
`

const Body = styled.div`
  background-color: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(32px) brightness(1.16);
  > * {
    :not(:last-child) {
      ::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, ${darkRed}, ${skyBlue});
      }
    }
  }
`
