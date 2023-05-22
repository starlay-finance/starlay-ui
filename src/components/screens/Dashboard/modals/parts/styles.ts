import { SimpleCtaButton } from 'src/components/parts/Cta'
import { cream } from 'src/styles/colors'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { Balance } from './Balance'
import { Tab } from './Tab'

export const Action = styled.div`
  font-weight: ${fontWeightSemiBold};
`

export const ContentDiv = styled.div`
  padding-top: 32px;
  ${Tab} {
    margin-top: 32px;
  }
  input {
    font-size: 20px !important;
    width: 240px !important;
  }
  ${SimpleCtaButton} {
    margin-top: 16px;
  }
  ${Balance} {
    margin-top: 24px;
  }
  ${SimpleCtaButton} {
    text-transform: uppercase;
    :enabled {
      cursor: pointer;
    }
  }
  ${Action} {
    padding: 24px 32px;
    font-size: 14px;
  }
  @media ${breakpoint.xl} {
    padding-top: 48px;
    ${Tab} {
      margin-top: 48px;
    }
    input {
      font-size: unset;
      width: unset;
    }
    ${Action} {
      padding: 32px;
      font-size: 18px;
      background-color: ${cream};
    }
    ${SimpleCtaButton},
    ${Balance} {
      margin-top: 32px;
    }
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
  text-align: center;
  font-weight: ${fontWeightRegular};
`
