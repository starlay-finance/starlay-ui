import { VFC } from 'react'
import { Barometer } from 'src/components/parts/Chart/Barometer'
import { gray, primary, purple } from 'src/styles/colors'
import styled, { css } from 'styled-components'

type SliderProps = {
  current: number
  setValue: (num: number) => void
  remaining: number
  disabled?: boolean
}
const inputProps = {
  min: 0,
  max: 1,
  step: 0.0001,
}
export const Slider = styled<VFC<SliderProps & { className?: string }>>(
  ({ current, setValue, remaining, disabled, className }) => {
    return (
      <Barometer
        className={className}
        ratio={current}
        colors={[purple, gray]}
        styles={{ barometer: barometerStyle, thumb: thumbStyle }}
        chartStyle={{
          background: `linear-gradient(to right,${[
            purple,
            `${purple} ${Math.floor(current * 100)}%`,
            `${gray} ${Math.floor(current * 100)}%`,
            `${gray}`,
          ].join(',')}`,
        }}
        rangeInputProps={{
          ...inputProps,
          onChange: ({ target: { value } }) => {
            if (+value - current > remaining) {
              setValue(current + remaining)
              return
            }
            setValue(+value)
          },
          disabled,
        }}
      />
    )
  },
)``

const barometerStyle = css`
  height: 6px;
`
const thumbStyle = css`
  border: 6px solid ${primary};
  width: 0px;
  height: 0px;
`
