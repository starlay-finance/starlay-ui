import { APP_BG_DOTS_DATA_URI } from 'src/assets/images/bg_dots-app'
import { TOP_BG_DOTS_DATA_URI } from 'src/assets/images/bg_dots-top'
import { darkRed, skyBlue, trueBlack } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { HEADER_HEIGHT } from '../Header'

export const AppBackground = () => (
  <>
    <BackgroundDotsApp />
    <BackgroundOverlay top={HEADER_HEIGHT} />
  </>
)

export const BackgroundGradient = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, ${darkRed}57, ${skyBlue}57);
  backdrop-filter: blur(30px) brightness(1.15);
`

export const BackgroundOverlay = styled.div<{ top?: string }>`
  position: fixed;
  inset: 0;
  top: ${({ top = '0' }) => top};
  background: radial-gradient(
    ${trueBlack}7a,
    ${trueBlack}a3 44%,
    ${trueBlack}b8 88%,
    ${trueBlack}b8
  );
  @media ${breakpoint.xl} {
    background: radial-gradient(
      ${trueBlack}00,
      ${trueBlack}20 75%,
      ${trueBlack}40
    );
  }
`

export const BackgroundDotsTop = styled.div`
  position: fixed;
  inset: 0;
  top: ${HEADER_HEIGHT};
  background-image: url('${TOP_BG_DOTS_DATA_URI}');
  background-position: 40.7% 50%;
`

export const BackgroundDotsApp = styled.div`
  position: fixed;
  inset: 0;
  background-image: url('${APP_BG_DOTS_DATA_URI}');
  background-position: 50% 40%;
`
