import { VFC } from 'react'
import { LAUNCHPAD_BG_DATA_URI } from 'src/assets/images/launchpad_bg'
import { Image } from 'src/components/elements/Image'
import styled from 'styled-components'

export const KeyVisual: VFC<{ src: string; alt: string }> = ({ src, alt }) => (
  <KeyVisualDiv>
    <div>
      <Image src={src} alt={alt} />
    </div>
  </KeyVisualDiv>
)

const KeyVisualDiv = styled.div`
  padding: 8px;
  width: 100%;
  height: 540px;
  background: url('${LAUNCHPAD_BG_DATA_URI}');
  > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`
