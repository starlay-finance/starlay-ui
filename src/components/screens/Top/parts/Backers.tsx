import { t } from '@lingui/macro'
import { useState } from 'react'
import { useInView } from 'react-hook-inview'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { secondary } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar, flexCenter } from 'src/styles/mixins'
import styled, { css, CSSProperties } from 'styled-components'
import { RequireExactlyOne } from 'type-fest'
import { backersAnimation } from './animation'

type Backer = {
  name: string
  containerStyle?: CSSProperties
  url: string
} & RequireExactlyOne<{
  image: StaticImageData
  Svg: SvgrComponent
}>

export type BackersProps = {
  backers: Backer[]
}

export const Backers = asStyled<BackersProps>(({ backers, className }) => {
  const [ref, touched] = useInView({
    unobserveOnEnter: true,
  })
  const [appeared, setAppeared] = useState(false)
  return (
    <BackersSection className={className}>
      <h2>{t`Backers`}</h2>
      <p>{t`We're supported by leading teams and organizations`}</p>
      <BackersList ref={ref} $touched={touched} $appeared={appeared}>
        {backers.map(({ name, image, url, containerStyle, Svg }, idx, arr) => {
          const isLast = idx === arr.length - 1
          return (
            <li
              key={name}
              onAnimationEnd={
                !appeared && isLast ? () => setAppeared(true) : undefined
              }
            >
              <Link href={url}>
                <ImageDiv>
                  <ImageContainer style={containerStyle}>
                    {Svg ? (
                      <Svg />
                    ) : (
                      <Image
                        src={image!}
                        alt={name}
                        layout="fill"
                        objectFit="scale-down"
                      />
                    )}
                  </ImageContainer>
                </ImageDiv>
                <p>{name}</p>
              </Link>
            </li>
          )
        })}
        <li />
      </BackersList>
    </BackersSection>
  )
})``

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 77px;
  ${flexCenter};
  margin: 24px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const ImageDiv = styled.div`
  ${flexCenter};
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(8px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
`

const BackersList = styled.ul<{ $touched: boolean; $appeared: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px 24px;
  > li {
    ${({ $touched, $appeared }) =>
      !$appeared &&
      css`
        opacity: 0;
        ${$touched && backersAnimation};
      `};
    width: 384px;
    p {
      margin-top: 16px;
      color: ${secondary};
      font-size: 16px;
      font-weight: ${fontWeightSemiBold};
      text-align: center;
    }
  }
`

const BackersSection = styled.section`
  position: relative;
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  h2,
  h2 + p {
    text-align: center;
  }
  ${BackersList} {
    margin-top: 56px;
  }
`
