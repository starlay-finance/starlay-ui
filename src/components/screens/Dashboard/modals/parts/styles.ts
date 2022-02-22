import { SimpleCtaButton } from 'src/components/parts/Cta'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { Balance } from './Balance'
import { Tab } from './Tab'

export const Action = styled.div`
  padding: 32px;
  backdrop-filter: blur(16px) brightness(1.04);
  background-color: rgba(255, 255, 255, 0.04);
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
`

export const NumberItems = styled.div`
  margin: -24px 0;
  > {
    :last-child {
      border-bottom-width: 3px;
      margin-bottom: 24px;
    }
  }
`
