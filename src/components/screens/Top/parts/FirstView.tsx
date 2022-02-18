import { t } from '@lingui/macro'
import { LogoAstar } from 'src/assets/images'
import { IconArrowRight } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { GradientCtaLink } from 'src/components/parts/Cta'
import { secondary } from 'src/styles/colors'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { APP, DOCS } from 'src/utils/routes'
import styled from 'styled-components'
import { contentAnimation, headingAnimation } from './animation'
import { Assets, AssetsProps } from './Assets'

export type FirstViewProps = AssetsProps

export const FirstView = asStyled<FirstViewProps>(({ assets, className }) => (
  <FirstViewSection className={className}>
    <Content>
      <h1>
        <div>{t`Lending on Astar Reaches Perfection`}</div>
      </h1>
      <div>
        <SubTitle>{t`Starlay Finance is the world's first Aster native lending protocol`}</SubTitle>
        <Control>
          <GradientCtaLink href={APP}> {t`Launch App`}</GradientCtaLink>
          <Link href={DOCS}>
            {t`Explore the docs`} <IconArrowRight />
          </Link>
        </Control>
        <PoweredBy>
          <span>{t`Powered by`}</span>
          <Image src={LogoAstar} alt={t`ASTAR`} layout="fixed" />
        </PoweredBy>
      </div>
      <Assets assets={assets} />
    </Content>
  </FirstViewSection>
))``

const PoweredBy = styled.p`
  display: flex;
  align-items: center;
  color: ${secondary};
  font-size: 16px;
  column-gap: 16px;
`

const Control = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 32px;
    font-size: 20px;
    font-weight: ${fontWeightSemiBold};
  }
`

const Content = styled.div`
  position: relative;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
`
const SubTitle = styled.p`
  margin-top: 16px;
  font-size: 20px;
  font-weight: ${fontWeightRegular};
  color: ${secondary};
`

const FirstViewSection = styled.section`
  position: relative;
  width: 100%;
  padding: 32px 0;
  overflow: hidden;
  h1 {
    max-width: 720px;
    height: 2.4em;
    overflow: hidden;
    div {
      ${headingAnimation};
    }
  }
  ${Content} {
    > div:nth-child(2) {
      ${contentAnimation};
    }
  }
  ${Control} {
    margin-top: 32px;
  }
  ${PoweredBy} {
    margin-top: 96px;
  }
`
