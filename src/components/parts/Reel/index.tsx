import ReactReel, { ReactReelProps } from 'react-reel'
import { asStyled } from 'src/components/hoc/asStyled'
import styled from 'styled-components'

export const Reel = asStyled<ReactReelProps>(({ className, ...props }) => (
  <ReelDiv className={className}>
    <ReactReel {...props} />
  </ReelDiv>
))``

const ReelDiv = styled.div`
  .react-reel__group {
    transition-delay: 0ms;
    transition-timing-function: ease-in-out;
    transform: translate(0, 0);
  }

  .react-reel__group .react-reel__number {
    height: 1em;
  }

  .react-reel__reel {
    display: flex;
    align-items: flex-end;
    height: 1em;
    line-height: 0.9;
    overflow-y: hidden;
  }
`
