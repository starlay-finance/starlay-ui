import { t } from '@lingui/macro'
import { StaticImageData } from 'next/image'
import { useState } from 'react'
import { useInView } from 'react-hook-inview'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { darkRed, secondary, skyBlue } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import {
  breakpoint,
  contentMaxWidthCssVar,
  flexCenter,
} from 'src/styles/mixins'
import styled, { CSSProperties, css, keyframes } from 'styled-components'
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
                  <div>
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
                  </div>
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
  ${flexCenter};
  padding: 40px 72px;
  max-height: 176px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const hoverBackgroundKeyframes = keyframes`
  0% {
    opacity: 1;
    background-position: 0%;
  }
  100% {
    opacity: 1;
    background-position: -300%;
  }
`

const ImageDiv = styled.div`
  ${flexCenter};
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(8px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
  > div {
    position: absolute;
    inset: 0;
    ${flexCenter};
  }
  transition: transform 0.1s ease-in;
  :hover {
    transform: translateY(2px);
    background: linear-gradient(
      90deg,
      ${darkRed}3d,
      ${skyBlue}3d,
      ${darkRed}3d
    );
    background-size: 300%;
    animation: ${hoverBackgroundKeyframes} 10s infinite linear;
  }
`

const BackersList = styled.ul<{ $touched: boolean; $appeared: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 24px;
  > li {
    ${({ $touched, $appeared }) =>
      !$appeared &&
      css`
        opacity: 0;
        ${$touched && backersAnimation};
      `};
    width: 342px;
    p {
      margin-top: 16px;
      color: ${secondary};
      font-size: 16px;
      font-weight: ${fontWeightSemiBold};
      text-align: center;
    }
  }
  @media ${breakpoint.xl} {
    > li {
      width: 384px;
    }
  }
`

const BackersSection = styled.section`
  position: relative;
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding: 0 24px;
  h2,
  h2 + p {
    text-align: center;
  }
  ${BackersList} {
    margin-top: 40px;
  }
  @media ${breakpoint.xl} {
    ${BackersList} {
      margin-top: 56px;
    }
  }
`
