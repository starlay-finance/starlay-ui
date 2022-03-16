import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { darkPurple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { Asset } from 'src/types/models'
import styled, { css } from 'styled-components'

export type AssetLabelProps = {
  label?: string
  asset: Asset
}
export const AssetLabel = asStyled<AssetLabelProps>(
  ({ asset: { name, icon }, label, className }) => (
    <ItemLabel
      label={label || name}
      image={{ src: icon, alt: name }}
      className={className}
    />
  ),
)``

export type ItemLabelProps = {
  label: string
  note?: string
  image?: {
    src: string | StaticImageData
    alt: string
  }
  IconSVG?: SvgrComponent
}
export const ItemLabel = asStyled<ItemLabelProps>(
  ({ label, note, image, IconSVG, className }) => (
    <LabelDiv className={className}>
      {image && (
        <Image src={image.src} alt={image.alt} width={32} height={32} />
      )}
      {IconSVG && <IconSVG />}
      <TextDiv withNote={!!note}>
        <p>{label}</p>
        {note && <p>{note}</p>}
      </TextDiv>
    </LabelDiv>
  ),
)``

export const ItemLabelPair = asStyled<
  ItemLabelProps & {
    image2?: { src: string | StaticImageData; alt: string }
    IconSVG2?: SvgrComponent
  }
>(({ label, note, image, IconSVG, image2, IconSVG2, className }) => (
  <LabelDiv className={className}>
    <PairDiv>
      {image && (
        <Image src={image.src} alt={image.alt} width={24} height={24} />
      )}
      {image2 && (
        <Image src={image2.src} alt={image2.alt} width={24} height={24} />
      )}
      {IconSVG && <IconSVG />}
      {IconSVG2 && <IconSVG2 />}
    </PairDiv>
    <TextDiv withNote={!!note}>
      <p>{label}</p>
      {note && <p>{note}</p>}
    </TextDiv>
  </LabelDiv>
))``

const PairDiv = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  > {
    :first-child {
      position: absolute !important;
      top: 0;
      left: 0;
    }
    :last-child {
      position: absolute !important;
      bottom: 0;
      right: 0;
    }
  }
`
const TextDiv = styled.div<{ withNote?: boolean }>`
  ${({ withNote }) =>
    withNote &&
    css`
      p:first-child {
        color: ${darkPurple};
      }
      p:last-child {
        font-size: 12px;
      }
    `}
`

const LabelDiv = styled.div`
  ${flexCenter};
  column-gap: 16px;
`
