import { InputHTMLAttributes, useEffect, useState } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'

type ScalingInputProps = {
  width: number
  maxFontSize: number
  minFontSize?: number
  value?: string
} & InputHTMLAttributes<HTMLInputElement>
export const ScalingInput = asStyled<ScalingInputProps>(
  ({ width, maxFontSize, minFontSize = 16, value, ...props }) => {
    const [fontSize, setFontSize] = useState(maxFontSize)
    useEffect(() => {
      const point = (value || '').length * fontSize
      if (fontSize !== minFontSize && point > width * 1.3)
        setFontSize(Math.max(fontSize * 0.8, minFontSize))
      if (point < width * 1.1)
        setFontSize(Math.min(fontSize / 0.8, maxFontSize))
    }, [value])
    return <input {...props} value={value} style={{ width, fontSize }} />
  },
)``
