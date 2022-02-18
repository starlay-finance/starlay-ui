import { t } from '@lingui/macro'
import { useState } from 'react'
import { useInView } from 'react-hook-inview'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { secondary } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar, flexCenter } from 'src/styles/mixins'
import styled, { css } from 'styled-components'
import { backersAnimation } from './animation'

export type BackersProps = {
  backers: {
    name: string
    image: StaticImageData
  }[]
}

export const Backers = asStyled<BackersProps>(({ backers, className }) => {
  const [ref, touched] = useInView({
    unobserveOnEnter: true,
  })
  const [appeared, setAppeared] = useState(false)
  return (
    <BackersSection className={className}>
      <h2>{t`Backers`}</h2>
      <p>{t`We are supported by the most amazing backers`}</p>
      <BackersList ref={ref} $touched={touched} $appeared={appeared}>
        {backers.map(({ name, image }, idx, arr) => {
          const isLast = idx === arr.length - 1
          return (
            <li
              key={name}
              onAnimationEnd={
                !appeared && isLast ? () => setAppeared(true) : undefined
              }
            >
              <ImageDiv>
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="scale-down"
                />
              </ImageDiv>
              <p>{name}</p>
            </li>
          )
        })}
        <li />
      </BackersList>
    </BackersSection>
  )
})``

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
