import { SorryReason } from 'src/types/page'

export const TOP = '/'
export const APP = '/app'
export const GOVERNANCE = '/TBD'
export const GOVERNANCE_OVERVIEW = '/TBD'
export const GOVERNANCE_STARLAY = '/TBD'
export const BUG_BOUNTY = '/TBD'
export const DEVELOPERS = '/TBD'
export const SUPPORT = '/TBD'
export const TERMS = '/TBD'

export const SORRY = '/sorry'
export const sorryFor = (reason: SorryReason) => `${SORRY}?reason=${reason}`

export const DOCS = 'https://docs.starlay.finance'
export const DISCORD = 'http://discord.gg/d7FVntK6'
export const GITHUB = 'https://github.com/starlay-finance'
export const TWITTER = 'https://twitter.com/starlay_fi'
