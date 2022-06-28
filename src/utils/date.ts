import dayjs, { Dayjs } from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(advancedFormat)

export const utcStartOfDate = () => dayjs().utc().startOf('date')

export const formatWithTZ = (value: Dayjs, format: string) =>
  value.format(format)

export const SECONDS_OF_DAY = 60 * 60 * 24
export const SECONDS_OF_WEEK = 60 * 60 * 24 * 7
export const SECONDS_OF_MONTH = SECONDS_OF_WEEK * 4
export const SECONDS_OF_YEAR = SECONDS_OF_WEEK * 52

export const truncateWith = (num: number, unit: number) =>
  Math.floor(num / unit) * unit
