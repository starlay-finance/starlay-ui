import { VFC } from 'react'
import {
  BackgroundDotsApp,
  BackgroundOverlay,
} from 'src/components/parts/Background'
import { HEADER_HEIGHT } from 'src/components/parts/Header'

export const Background: VFC = () => (
  <>
    <BackgroundDotsApp />
    <BackgroundOverlay top={HEADER_HEIGHT} />
  </>
)
