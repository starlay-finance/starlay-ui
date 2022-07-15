import { t } from '@lingui/macro'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import { darkGray, purple } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

export const TABS = [
  { id: 'stats', label: t`Stats` },
  { id: 'realtime', label: t`Realtime` },
  { id: 'votes', label: t`Votes` },
] as const

export type TabType = typeof TABS[number]['id']

export const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  height: 32px;
  margin-left: 32px;
  column-gap: 20px;
  font-size: 14px;
  span {
    display: flex;
    column-gap: 4px;
    font-weight: ${fontWeightMedium};
    ${TooltipMessage} {
      width: 240px;
    }
  }
  button {
    background: ${darkGray};
    border-radius: 4px;
    font-weight: ${fontWeightBold};
    padding: 8px 16px;
    line-height: 1;
    transition: background 0.15s ease-in;
    :enabled {
      background: ${purple};
    }
  }
`
