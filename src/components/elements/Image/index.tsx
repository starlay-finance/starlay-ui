import NextImage, {
  ImageProps as NextImageProps,
  StaticImageData,
} from 'next/image'
import { FC, ReactText } from 'react'
import styled from 'styled-components'

export type ImageInfo = {
  src: string | StaticImageData
  alt: string
  title?: string
  objectPosition?: ReactText
  objectFit?: NextImageProps['objectFit']
  layout?: NextImageProps['layout']
}
type ImageProps = ImageInfo & Partial<NextImageProps>

export const Image: FC<ImageProps> = ({
  src,
  alt,
  objectFit = 'cover',
  layout,
  ...props
}) => {
  if (!src) return <></>
  if (
    typeof src === 'string' &&
    !src.startsWith('http') &&
    !src.startsWith('/') &&
    !src.startsWith('static')
  )
    return <RawImage src={src} alt={alt} {...props} />
  return (
    <NextImage
      layout={
        layout ||
        (objectFit === 'scale-down'
          ? 'intrinsic'
          : props.width && props.height
          ? 'fixed'
          : 'fill')
      }
      objectFit={objectFit}
      src={src}
      alt={alt}
      {...props}
    />
  )
}

export const RawImage = styled.img`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;

  object-fit: cover;
`
