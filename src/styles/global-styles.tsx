import { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { blue, primary, trueBlack } from './colors'
import { fontFamily, fontWeightRegular } from './font'
import { contentMaxWidthCssVar, noScrollbar } from './mixins'

export const GlobalStyles = () => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    window.document.fonts.ready.then(() => setReady(true))
  }, [])
  return <Styles ready={ready} />
}

const Styles = createGlobalStyle<{ ready: boolean }>`
  html {
    visibility: ${({ ready }) => (ready ? 'visible' : 'hidden')};
    height:100%;
  }
  body {
    ${contentMaxWidthCssVar}: 1200px;
    height: 100%;

    background: ${trueBlack};
    color: ${primary};
    font-family: ${fontFamily};
    font-weight: ${fontWeightRegular};
    font-size: 16px;
    line-height: 1.2;

    > div#__next {
      height: 100%;
      display: flex;
      flex-flow: column;
      main {
        flex: 1;
      }
    }
    div {
      ${noScrollbar};
    }
    a {
      transition: all 0.15s ease-in;
      :hover {
        color: ${blue};
      }
    }
  }
`
