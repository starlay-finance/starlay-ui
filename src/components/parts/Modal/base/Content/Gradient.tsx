import { ReactNode } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { darkRed, skyBlue } from 'src/styles/colors'
import styled from 'styled-components'

export const GradientModalContent = asStyled<{
  children: ReactNode
}>(({ children, className }) => (
  <Body className={className}>
    <Background />
    <Content>{children}</Content>
  </Body>
))``

const Background = styled.div`
  background: linear-gradient(45deg, ${darkRed}3d, ${skyBlue}3d);
`
const Content = styled.div``

const Body = styled.div`
  position: relative;
  padding: 40px 24px 48px;
  border-radius: 16px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(32px) brightness(1.08);
  ${Background} {
    position: absolute;
    inset: 0;
  }
  ${Content} {
    position: relative;
  }
`
