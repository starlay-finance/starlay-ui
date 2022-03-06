import { AsStyledProps } from 'src/components/hoc/asStyled'
import { purple, secondary } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import styled, { css } from 'styled-components'

export type TabFC = <T extends readonly string[]>(
  props: {
    tabs: T
    contents: { [key in T[number]]: { label: string; disabled?: boolean } }
    activeTab: T[number]
    onChangeActiveTab: (tab: T[number]) => void
  } & AsStyledProps,
) => JSX.Element

export const Tab = styled<TabFC>(
  ({ tabs, contents, activeTab, onChangeActiveTab, className }) => {
    return (
      <Tabs className={className}>
        {tabs.map((tab) => {
          const { label, disabled } = contents[tab as keyof typeof contents]
          return (
            <TabButton
              key={tab}
              isActive={activeTab === tab}
              onClick={() => onChangeActiveTab(tab)}
              disabled={disabled}
            >
              <span>{label}</span>
            </TabButton>
          )
        })}
      </Tabs>
    )
  },
)``

const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: ${fontWeightHeavy};
  text-align: center;
  :first-child {
    span {
      margin-left: 16px;
    }
  }
  :last-child {
    span {
      margin-right: 16px;
    }
  }
  :disabled {
    color: ${secondary};
    cursor: not-allowed;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${purple};
      ::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        border-bottom: 3px solid;
      }
    `}
`
const Tabs = styled.div`
  display: flex;
  ${TabButton} {
    flex: 1;
  }
`
