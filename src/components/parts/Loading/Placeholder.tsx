import styled from 'styled-components'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#212429" offset="25%" />
      <stop stop-color="#2c2f36" offset="50%" />
      <stop stop-color="#212429" offset="75%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#212429" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.0s" keySplines="0.25 0.1 0.25 1.0" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const SHIMMER_DARA_URI = `data:image/svg+xml;base64,${toBase64(
  shimmer(700, 475),
)}`

export const ShimmerPlaceholder = styled.div`
  height: 1em;
  border-radius: 0.5em;
  background: url('${SHIMMER_DARA_URI}');
`
