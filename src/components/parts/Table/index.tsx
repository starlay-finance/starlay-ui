import { t } from '@lingui/macro'
import { ReactNode } from 'react'
import { AsStyledProps } from 'src/components/hoc/asStyled'
import { offWhite, purple } from 'src/styles/colors'
import styled, { css, SimpleInterpolation } from 'styled-components'
import { ShimmerPlaceholder } from '../Loading'
import { TooltipMessage, ToolTipPosition } from '../ToolTip'

export type TableFC = <T extends string>(
  props: {
    caption?: string
    tabs?: {
      items: readonly { id: string; label: string }[]
      setTab: (id: string) => void
      activeTab: string
    }
    control?: ReactNode
    columns: {
      id: T
      name: string
      widthRatio: number
      tooltip?: ReactNode
      tooltipPosition?: ToolTipPosition
    }[]
    rows: {
      id: string
      data: { [key in T]: ReactNode | undefined }
      onClick?: VoidFunction
      disabled?: boolean
    }[]
    placeholderLength?: number
    rowDisabledStyle?: SimpleInterpolation
  } & AsStyledProps,
) => JSX.Element

export const Table: TableFC = ({
  className,
  caption,
  tabs,
  control,
  columns,
  rows,
  placeholderLength = 0,
  rowDisabledStyle,
}) => {
  const widthRatioSum = columns.reduce(
    (prev, { widthRatio }) => prev + widthRatio,
    0,
  )
  return (
    <StyledTable className={className}>
      <caption>
        <div>
          {caption}
          {tabs && (
            <Tabs>
              {tabs.items.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => tabs.setTab(id)}
                  disabled={id === tabs.activeTab}
                >
                  {t({ id: label })}
                </button>
              ))}
            </Tabs>
          )}
          {control}
        </div>
      </caption>
      <thead>
        <tr>
          {columns.map(({ id, name, tooltip, tooltipPosition, widthRatio }) => (
            <th
              key={id}
              style={{
                width: `${Math.floor((widthRatio / widthRatioSum) * 100)}%`,
              }}
            >
              <div>
                {t({ id: name })}
                {tooltip && (
                  <TooltipMessage
                    message={tooltip}
                    position={tooltipPosition}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 &&
          placeholderLength > 0 &&
          Array.from(new Array(3)).map((_, idx) => (
            <StyledTr key={idx}>
              {columns.map(({ id }) => (
                <td key={id}>
                  <ShimmerPlaceholder />
                </td>
              ))}
            </StyledTr>
          ))}
        {rows.map(({ id, data, onClick, disabled }) => (
          <StyledTr
            key={id}
            onClick={onClick}
            $disabled={disabled}
            disabledStyle={rowDisabledStyle}
          >
            {columns.map(({ id }) => {
              const node = data[id as keyof typeof data]
              return <td key={id}>{node || <ShimmerPlaceholder />}</td>
            })}
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  )
}
const Tabs = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
  margin-bottom: -24px;
  > button {
    padding-bottom: 24px;
    border-bottom: 2px solid;
    :enabled {
      cursor: pointer;
      color: ${offWhite};
      border-color: transparent;
      :hover {
        color: ${purple};
      }
    }
  }
`
const StyledTable = styled.table`
  caption > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  table-layout: fixed;
  width: 100%;
  ${ShimmerPlaceholder} {
    height: 2em;
    width: 80%;
    margin: inherit;
  }
`
const clickableStyle = css`
  cursor: pointer;
`
const StyledTr = styled.tr<{
  $disabled?: boolean
  disabledStyle?: SimpleInterpolation
}>`
  ${({ onClick }) => onClick && clickableStyle};
  ${({ $disabled, disabledStyle }) => $disabled && disabledStyle};
`
