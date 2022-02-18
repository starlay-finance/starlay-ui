import { ReactNode, VFC } from 'react'
import { IconClose } from 'src/assets/svgs'
import { darkPurple, trueBlack } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
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
  padding: 24px 32px;
  border-bottom: 1px solid ${darkPurple}7a;
  color: ${trueBlack};

  font-size: 20px;
  font-weight: ${fontWeightBold};
  text-align: center;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 32px;
    height: 28px;
  }
`

const Body = styled.div``
