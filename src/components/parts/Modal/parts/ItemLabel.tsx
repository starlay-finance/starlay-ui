import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { flexCenter } from 'src/styles/mixins'
import { Asset } from 'src/types/models'
import styled from 'styled-components'

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
  image?: {
    src: string | StaticImageData
    alt: string
  }
  IconSVG?: SvgrComponent
}
export const ItemLabel = asStyled<ItemLabelProps>(
  ({ label, image, IconSVG, className }) => (
    <LabelDiv className={className}>
      {image && (
        <Image src={image.src} alt={image.alt} width={32} height={32} />
      )}
      {IconSVG && <IconSVG />}
      {label}
    </LabelDiv>
  ),
)``

const LabelDiv = styled.div`
  ${flexCenter};
  column-gap: 16px;
`
