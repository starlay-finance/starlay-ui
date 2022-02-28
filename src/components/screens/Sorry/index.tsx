import { t } from '@lingui/macro'
import { VFC } from 'react'
import { LogoProtocol } from 'src/assets/svgs'
import {
  BackgroundGradient,
  BackgroundOverlay,
} from 'src/components/parts/Background'
import { GradientCtaButton } from 'src/components/parts/Cta'
import { fontWeightLight } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { FromQuery, SorryReason } from 'src/types/page'
import styled from 'styled-components'
import { reasonToMessage } from './reasons'

type SorryProps = {
  reason: FromQuery<SorryReason>
}
export const Sorry: VFC<SorryProps> = ({ reason }) => (
  <Main>
    <BackgroundGradient1 />
    <BackgroundGradient2 />
    <BackgroundOverlay />
    <Content>
      <LogoProtocol />
      <p>{reasonToMessage(reason)}</p>
      <GradientCtaButton
        onClick={() => window.history.back()}
      >{t`Go Back`}</GradientCtaButton>
    </Content>
  </Main>
)

const BackgroundGradient1 = styled(BackgroundGradient)`
  top: 40px;
  bottom: 0;
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
`

const BackgroundGradient2 = styled(BackgroundGradient)`
  top: 45%;
  bottom: 0;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
`

const Content = styled.div`
  position: relative;
  ${flexCenter};
  flex-direction: column;
  row-gap: 40px;
  svg {
    width: 230px;
    height: 54px;
  }
  p {
    font-size: 16px;
    font-weight: ${fontWeightLight};
    line-height: 1.5;
    letter-spacing: 0.064em;
    text-align: center;
  }
  ${GradientCtaButton} {
    width: 230px;
  }
`

const Main = styled.main`
  ${flexCenter};
  ${Content} {
    width: 75%;
    max-width: 480px;
    margin: 0 auto;
  }
`
