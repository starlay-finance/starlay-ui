import { ReactNode, VFC } from 'react'
import { IconClose } from 'src/assets/svgs'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const PopContainer: VFC<{
  isOpen: boolean
  close: VoidFunction
  children: ReactNode
}> = ({ isOpen, close, children }) => {
  if (!isOpen) return <></>
  return (
    <Container>
      <div>
        {children}
        <button onClick={close}>
          <IconClose />
        </button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 320px;
  height: 240px;
  backdrop-filter: blur(32px) brightness(0.84);
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    button {
      position: absolute;
      top: 16px;
      right: 16px;
      :hover {
        color: ${({ theme: { active } }) => active};
      }
    }
  }
  a:hover {
    color: unset;
  }

  display: none;
  @media ${breakpoint.xxl} {
    display: block;
  }
`
