import { number, withKnobs } from '@storybook/addon-knobs'
import { blue, darkRed, lightYellow } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Barometer } from '.'

export default {
  title: 'parts/Chart/Barometer',
  parameters: { screenshot: { skip: true } },
  decorators: [withKnobs],
}

const BAROMETER_COLORS = [blue, lightYellow, darkRed]
export const BarometerComponent = () => {
  const ratio = number('Ratio Percentage', 50)
  return (
    <Style>
      <Barometer
        label="Barometer"
        colors={BAROMETER_COLORS}
        value={`${ratio / 100}`}
        ratio={ratio / 100}
      />
    </Style>
  )
}

const Style = styled.div`
  ${flexCenter};
  height: 100%;
  padding: 10%;
  ${Barometer} {
    flex: 1;
    height: 3px;
  }
`
