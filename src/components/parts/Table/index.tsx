import { t } from '@lingui/macro'
import { ReactNode } from 'react'
import { AsStyledProps } from 'src/components/hoc/asStyled'
import styled, { css, SimpleInterpolation } from 'styled-components'
import { ShimmerPlaceholder } from '../Loading'

export type TableFC = <T extends string>(
  props: {
    caption?: string
    columns: {
      id: T
      name: string
      widthRatio: number
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
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map(({ id, name, widthRatio }) => (
            <th
              key={id}
              style={{
                width: `${Math.floor((widthRatio / widthRatioSum) * 100)}%`,
              }}
            >
              {t({ id: name })}
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

const StyledTable = styled.table`
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
