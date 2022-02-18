import { ValueOf } from 'type-fest'
import * as Colors from './colors'

export type Color = `${ValueOf<typeof Colors>}${string}`
