import { t } from '@lingui/macro'
import { LogoAstar } from 'src/assets/images'
import { IconArrowRight } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { GradientCtaButton, GradientCtaLink } from 'src/components/parts/Cta'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { ASSETS } from 'src/constants/assets'
import { TOP_ASSETS } from 'src/constants/top'
import { secondary } from 'src/styles/colors'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import { APP, DOCS } from 'src/utils/routes'
import styled from 'styled-components'
import { contentAnimation, headingAnimation } from './animation'
import { Assets } from './Assets'
import { AssetsMobile } from './AssetsMobile'

export const FirstView = asStyled(({ className }) => {
  const { open } = useMessageModal()
  return (
    <FirstViewSection className={className}>
      <Content>
        <h1>
          <div>{t`Low Risk Farming on Astar Network`}</div>
        </h1>
        <div>
          <SubTitle>{t`Starlay Finance is the first lending protocol backed by Astar Network`}</SubTitle>
          <Control>
            <GradientCtaLink href={APP}>{t`Launch App`}</GradientCtaLink>
            <GradientCtaButton
              onClick={() =>
                open({
                  type: '',
                  title: t`Sorry...`,
                  message: t`Starlay Finance does not support mobile access currently. Please connect to this website using your PC.`,
                })
              }
            >{t`Launch App`}</GradientCtaButton>
            <Link href={DOCS}>
              {t`Explore the docs`} <IconArrowRight />
            </Link>
          </Control>
          <PoweredBy>
            <span>{t`Powered by`}</span>
            <Image src={LogoAstar} alt={t`ASTAR`} height={32} width={101} />
          </PoweredBy>
        </div>
        <AssetsMobile assets={ASSETS} />
        <Assets assets={TOP_ASSETS} />
      </Content>
    </FirstViewSection>
  )
})``

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
  flex-direction: column;
  row-gap: 24px;
  a {
    font-size: 20px;
    font-weight: ${fontWeightSemiBold};
    :last-child {
      font-size: 16px;
      svg {
        height: 0.75em;
      }
    }
  }
`

const Content = styled.div`
  position: relative;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding: 0 24px;
`
const SubTitle = styled.p`
  margin-top: 16px;
  font-size: 14px;
  font-weight: ${fontWeightRegular};
  color: ${secondary};
`

const FirstViewSection = styled.section`
  position: relative;
  padding: 32px 0;
  margin: 0 -24px;
  overflow: hidden;
  text-align: center;
  h1 {
    max-width: 720px;
    min-height: 2.4em;
    div {
      ${headingAnimation};
      white-space: pre-wrap;
    }
  }
  ${GradientCtaLink} {
    display: none;
  }
  ${SubTitle} {
    line-height: 1.75;
    padding: 0 24px;
  }
  ${Content} {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:nth-child(2) {
      ${contentAnimation};
    }
  }
  ${Control} {
    margin-top: 56px;
  }
  ${PoweredBy} {
    width: fit-content;
    margin: 56px auto 0;
  }
  @media ${breakpoint.xl} {
    width: 100%;
    margin: 0;
    ${Content} {
      display: block;
      padding: 0;
    }
    text-align: left;
    ${GradientCtaLink} {
      display: block;
    }
    ${GradientCtaButton} {
      display: none;
    }
    ${SubTitle} {
      font-size: 20px;
      padding: 0;
    }
    ${Control} {
      margin-top: 32px;
      flex-direction: row;
      a {
        margin-right: 32px;
        :last-child {
          font-size: 20px;
        }
      }
    }
    ${PoweredBy} {
      margin: 96px 0 0;
    }
  }
`
