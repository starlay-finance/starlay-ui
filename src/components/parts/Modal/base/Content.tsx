import { ReactNode, VFC } from 'react'
import { IconClose } from 'src/assets/svgs'
import { darkPurple, trueBlack, trueWhite } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const DefaultModalContent: VFC<{
  headerNode?: ReactNode
  bodyNode: ReactNode
  closeModal?: VoidFunction
}> = ({ headerNode, bodyNode, closeModal }) => (
  <>
    {headerNode && (
      <Header>
        {headerNode}
        {closeModal && (
          <button onClick={closeModal}>
            <IconClose />
          </button>
        )}
      </Header>
    )}
    <Body>{bodyNode}</Body>
  </>
)

const Header = styled.div`
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
`

const Body = styled.div``
