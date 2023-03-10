import { FC, ReactNode } from 'react'
import { IconClose } from 'src/assets/svgs'
import { darkPurple, trueBlack, trueWhite } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled, { SimpleInterpolation } from 'styled-components'

export const DefaultModalContent: FC<{
  headerNode?: ReactNode
  headerStyle?: SimpleInterpolation
  bodyNode: ReactNode
  closeModal?: VoidFunction
}> = ({ headerNode, headerStyle, bodyNode, closeModal }) => (
  <Content>
    {headerNode && (
      <Header headerStyle={headerStyle}>
        {headerNode}
        {closeModal && (
          <button onClick={closeModal}>
            <IconClose />
          </button>
        )}
      </Header>
    )}
    <Body>{bodyNode}</Body>
  </Content>
)

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(24px) brightness(1.48);
  background-color: rgba(255, 255, 255, 0.88);
  color: ${darkPurple}8f;
`

const Header = styled.div<{ headerStyle?: SimpleInterpolation }>`
  position: relative;
  padding: 32px 32px 24px;
  border-bottom: 1px solid ${darkPurple}7a;
  color: ${trueBlack};
  height: 88px;

  font-size: 20px;
  font-weight: ${fontWeightBold};
  text-align: center;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 32px;
    padding: 12px;
    ${flexCenter};
    transition: all 0.2s ease-in;
    border-radius: 8px;
    :hover {
      background-color: ${trueBlack}80;
      color: ${trueWhite};
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
  ${({ headerStyle }) => headerStyle};
`

const Body = styled.div``
