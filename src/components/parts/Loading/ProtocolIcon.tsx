import { ICON_PROTOCL_ROTATED_DATA_URI } from 'src/assets/images/icon_protocol_rotated'
import { lightYellow, purple, trueWhite } from 'src/styles/colors'
import styled, { keyframes } from 'styled-components'

export const LoadingProtocolIcon = () => (
  <IconDiv>
    <div />
    <div />
    <div />
  </IconDiv>
)

const bgKeyframes = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -1000%;
  }
`
const IconDiv = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  > div {
    position: absolute;
    inset: 0;
    mask-image: url('${ICON_PROTOCL_ROTATED_DATA_URI}');
    mask-size: cover;
    transform: rotate(45deg);

    :nth-child(1) {
      background: ${trueWhite};
    }
    :nth-child(2) {
      background: linear-gradient(
        90deg,
        ${lightYellow},
        ${lightYellow}80 25%,
        ${lightYellow}00 50%,
        ${lightYellow}80 75%,
        ${lightYellow}
      );
      background-size: 1000%;
      animation: ${bgKeyframes} 40s -20s infinite linear;
    }
    :nth-child(3) {
      background: linear-gradient(
        90deg,
        ${purple},
        ${purple}bb 25%,
        ${purple}00 50%,
        ${purple}bb 75%,
        ${purple}
      );
      background-size: 1000%;
      animation: ${bgKeyframes} 40s infinite linear;
    }
  }
`
