import { VFC } from 'react'
import { darkRed, primary, skyBlue } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { formatWithTZ } from 'src/utils/date'
import { toLaunchpad } from 'src/utils/routes'
import styled, { createGlobalStyle } from 'styled-components'
import { LaunchpadData } from '../Launchpad'

const DATE_FORMAT = 'hh:mm a z on MMM DD'

export const LaunchpadPop: VFC<{ data: LaunchpadData }> = ({
  data: { id, projectName, icon, token, sale },
}) => (
  <>
    <Styles />
    <a href={toLaunchpad(id)} target="_blank" rel="noreferrer">
      <PopDiv>
        <Background icon={icon} />
        <Content>
          <p>{projectName}</p>
          <h1>{`${token.symbol} Token Sale`}</h1>
          <p>{`on Starlay Launchpad`}</p>
        </Content>
        <Schedule>{`Sale start at ${formatWithTZ(
          sale.start,
          DATE_FORMAT,
        )}`}</Schedule>
      </PopDiv>
    </a>
  </>
)
const Background: VFC<{ icon: LaunchpadData['icon'] }> = ({ icon }) => (
  <BackgroundDiv>
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="240">
      <defs>
        <linearGradient id="bg" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={skyBlue} />
          <stop offset="1" stopColor={darkRed} />
        </linearGradient>
        <mask id="cross">
          <rect width="320" height="240" fill="url(#bg)"></rect>
          <g transform="translate(-88 -88)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="256"
              viewBox={icon.viewBox}
            >
              <use href={icon.url} />
            </svg>
          </g>
        </mask>
      </defs>
      <rect width="320" height="240" mask="url(#cross)" fill="url(#bg)"></rect>
    </svg>
  </BackgroundDiv>
)

const BackgroundDiv = styled.div``

const Schedule = styled.div`
  ${flexCenter};
  height: 50px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) brightness(1.08);
`

const Content = styled.div`
  text-align: center;
  h1 {
    margin: 16px 0;
    font-size: 32px;
    font-weight: ${fontWeightBold};
    line-height: 1;
  }
`

const PopDiv = styled.div`
  width: 320px;
  height: 240px;
  position: relative;
  ${BackgroundDiv} {
    position: absolute;
    inset: 0;
  }
  ${Content} {
    padding-top: 56px;
    position: relative;
  }
  ${Schedule} {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`

const Styles = createGlobalStyle`
  body {
   width: 320px;
   height: 240px;
   a {
     cursor: pointer;
      :hover {
        color:${primary};
      }
    }
  }
`
