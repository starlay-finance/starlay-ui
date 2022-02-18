import { number, withKnobs } from '@storybook/addon-knobs'
import { blue, darkRed, lightYellow, success } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { DonutChart, DonutChart2 } from '.'

export default {
  title: 'parts/Chart/DonutChart',
  parameters: { screenshot: { skip: true } },
  decorators: [withKnobs],
}

export const DonutChartComponent = () => {
  const ratio1 = number('Percentage1', 10)
  const ratio2 = number('Percentage2', 20)
  const ratio3 = number('Percentage3', 30)
  const ratio4 = number('Percentage4', 40)
  return (
    <Style>
      <DonutChart
        elements={[
          { ratio: ratio1 / 100, color: blue },
          { ratio: ratio2 / 100, color: lightYellow },
          { ratio: ratio3 / 100, color: darkRed },
          { ratio: ratio4 / 100, color: success },
        ]}
      >
        Donut Chart
      </DonutChart>
    </Style>
  )
}
export const DonutChart2Component = () => {
  const ratio1 = number('Percentage1', 50)
  const ratio2 = number('Percentage2', 50)
  return (
    <Style>
      <DonutChart2
        elements={[
          { ratio: ratio1 / 100, color: blue },
          { ratio: ratio2 / 100, color: lightYellow },
        ]}
      >
        2 Element Donut Chart
      </DonutChart2>
    </Style>
  )
}

const Style = styled.div`
  ${flexCenter};
  width: 320px;
`
