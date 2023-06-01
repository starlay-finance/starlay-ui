import { FC, ReactNode } from 'react'
import { IconClose } from 'src/assets/svgs'
import { darkPurple, gray, trueBlack, trueWhite } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
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
  border-radius: 16px 16px 0 0;
  backdrop-filter: blur(32px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  color: ${gray};
  @media ${breakpoint.xl} {
    border-radius: 8px;
  }
`

const Header = styled.div<{ headerStyle?: SimpleInterpolation }>`
  position: relative;
  padding: 20px 24px;
  border-bottom: 1px solid ${darkPurple}7a;
  color: ${gray};
  height: 68px;

  font-size: 16px;
  font-weight: ${fontWeightBold};
  text-align: center;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
    padding: 0 6px 6px;
    ${flexCenter};
    transition: all 0.2s ease-in;
    border-radius: 8px;
    :hover {
      background-color: ${trueBlack}80;
      color: ${trueWhite};
    }
    svg {
      width: 14px;
      height: 14px;
    }
  }
  ${({ headerStyle }) => headerStyle};
  @media ${breakpoint.xl} {
    height: 88px;
    padding: 32px 32px 24px;
    font-size: 20px;
    button {
      right: 32px;
      padding: 12px;
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`

const Body = styled.div`
  max-height: 75vh;
  overflow: auto;
`
