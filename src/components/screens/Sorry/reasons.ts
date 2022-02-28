import { t } from '@lingui/macro'
import { FromQuery, SorryReason } from 'src/types/page'

const SORRY_TEXT: { [key in SorryReason]: string } = {
  'mobile-not-supported': t`Starlay Finance does not support mobile access. Please connect to this website using your PC.`,
}

export const reasonToMessage = (reason: FromQuery<SorryReason>) =>
  //@ts-ignore
  SORRY_TEXT[reason] || t`Something went wrong. Please go back.`
