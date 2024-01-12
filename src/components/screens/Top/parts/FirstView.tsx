import { t } from '@lingui/macro'
import { LogoAcala, LogoAstar } from 'src/assets/images'
import { IconArrowRight } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { GradientCtaLink } from 'src/components/parts/Cta'
import { ASSETS } from 'src/constants/assets'
import { TOP_ASSETS } from 'src/constants/top'
import { useMatchIsInSafeAppContext } from 'src/hooks/useMatchIsInSafeAppContext'
import { secondary } from 'src/styles/colors'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import { APP, DOCS } from 'src/utils/routes'
import styled from 'styled-components'
import { Assets } from './Assets'
import { AssetsMobile } from './AssetsMobile'
import { contentAnimation, headingAnimation } from './animation'

export const FirstView = asStyled(({ className }) => {
  const isInSafeAppContext = useMatchIsInSafeAppContext()

  return (
    <FirstViewSection className={className}>
      <Content>
        <h2>
          <div>{t`Low Risk Farming on Astar and Acala Network`}</div>
        </h2>
        <div>
          <SubTitle>{t`The largest lending protocol in the Polkadot ecosystem`}</SubTitle>
          <Control>
            <GradientCtaLink href={APP} newTab={!isInSafeAppContext}>{t`Launch App`}</GradientCtaLink>
            <Link href={DOCS}>
              {t`Explore the docs`} <IconArrowRight />
            </Link>
          </Control>
          <PoweredBy>
            <span>{t`Powered by`}</span>
            <Image src={LogoAstar} alt={t`ASTAR`} height={32} width={101} />
            <span></span>
            <Image src={LogoAcala} alt={t`ACALA`} height={32} width={83} />
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
  flex-direction: column;
  color: ${secondary};
  font-size: 16px;
  column-gap: 16px;
  span {
    margin-bottom: 8px;
  }
  @media ${breakpoint.xl} {
    flex-direction: row;
    span {
      margin-bottom: 0px;
    }
  }
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
  padding: 0 48px;
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
  h2 {
    max-width: 720px;
    min-height: 2.4em;
    div {
      ${headingAnimation};
      white-space: pre-wrap;
    }
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
