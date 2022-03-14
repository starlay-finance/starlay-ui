import { SimpleCtaButton } from 'src/components/parts/Cta'
import { cream, trueBlack } from 'src/styles/colors'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { Balance } from './Balance'
import { Tab } from './Tab'

export const Action = styled.div`
  background-color: ${cream};
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};
`

export const ContentDiv = styled.div`
  padding-top: 48px;
  ${Tab} {
    margin-top: 48px;
  }
  ${SimpleCtaButton},
  ${Balance} {
    margin-top: 32px;
  }
  ${SimpleCtaButton} {
    text-transform: uppercase;
  }
  ${Action} {
    padding: 32px;
  }
`

export const NumberItems = styled.div`
  position: relative;
  margin: -24px 0;
  > {
    div:last-of-type {
      border-bottom-width: 3px;
      margin-bottom: 24px;
    }
  }
`

export const Note = styled.p`
  padding-top: 24px;
  color: ${trueBlack};
  text-align: center;
  font-weight: ${fontWeightRegular};
`
