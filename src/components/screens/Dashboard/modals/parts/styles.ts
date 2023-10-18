import { SimpleCtaButton } from 'src/components/parts/Cta'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { AmountInput } from './AmountInput'
import { Balance } from './Balance'
import { Tab } from './Tab'

export const NumberItems = styled.div`
  position: relative;
  margin: -24px 0;
  padding-right: 8px;
  margin-right: -8px;
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

export const Action = styled.div`
  font-weight: ${fontWeightSemiBold};
  > ${NumberItems} {
    height: 30vh;
    overflow: auto;
    margin-bottom: 0px;
  }
  @media ${breakpoint.l} {
    > ${NumberItems} {
      height: unset;
      overflow: unset;
      margin-bottom: -24px;
    }
  }
`

export const ContentDiv = styled.div`
  padding-top: 32px;
  ${Tab} {
    margin-top: 32px;
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
    ${Action} {
      padding: 32px;
      font-size: 18px;
    }
    ${SimpleCtaButton},
    ${Balance} {
      margin-top: 32px;
    }
  }
  @media ${breakpoint.ltxl} {
    ${AmountInput} {
      input {
        font-size: 20px !important;
        width: 240px !important;
      }
    }
  }
`
