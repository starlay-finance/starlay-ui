import { SorryReason } from 'src/types/page'

export const TOP = '/'
export const APP = '/app'
export const GOVERNANCE = ''
export const GOVERNANCE_OVERVIEW = ''
export const GOVERNANCE_STARLAY = ''
export const BUG_BOUNTY = ''
export const SUPPORT = ''
export const TERMS = ''

export const SORRY = '/sorry'
export const sorryFor = (reason: SorryReason) => `${SORRY}?reason=${reason}`

export const DEVELOPERS = 'https://docs.starlay.finance/development/repository'
export const DOCS = 'https://docs.starlay.finance'
export const DISCORD = 'http://discord.gg/d7FVntK6'
export const GITHUB = 'https://github.com/starlay-finance'
export const TWITTER = 'https://twitter.com/starlay_fi'
export const TELEGRAM = 'https://t.me/starlay_fi'
export const MEDIUM = 'http://medium.com/@starlay_fi'

export const ARTHSWAP = 'https://app.arthswap.org/#/pool'
