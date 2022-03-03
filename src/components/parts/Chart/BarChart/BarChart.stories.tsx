import { number, withKnobs } from '@storybook/addon-knobs'
import {
  darkPurple,
  darkRed,
  lightYellow,
  primary,
  purple,
  trueBlack,
} from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { BarChart } from '.'

export default {
  title: 'parts/Chart/BarChart',
  parameters: { screenshot: { skip: true } },
  decorators: [withKnobs],
}

export const BarChartComponent = () => {
  const ratio = number('Ratio Percentage', 50)
  return (
    <Style>
      <BarChart
        filledStyles={[
          { gte: 0, bgColor: purple },
          { gte: 50, bgColor: lightYellow, color: trueBlack },
          { gte: 80, bgColor: darkRed },
        ]}
        unfilled={`${darkPurple}a3`}
        ratio={ratio / 100}
        showLabel
      />
    </Style>
  )
}

const Style = styled.div`
  ${flexCenter};
  height: 100%;
  padding: 10%;
  ${BarChart} {
    flex: 1;
    height: 3px;
    color: ${primary};
  }
`
