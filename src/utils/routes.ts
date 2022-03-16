import { SorryReason } from 'src/types/page'

export const DEVELOPERS = 'https://docs.starlay.finance/development/repository'
export const DOCS = 'https://docs.starlay.finance'
export const DOCS_RISK = 'https://docs.starlay.finance/asset/risk-parameters'
export const DOCS_MAKAI = 'https://docs.starlay.finance/function/makai'
export const DISCORD = 'https://discord.gg/M4NjBJZ94b'
export const GITHUB = 'https://github.com/starlay-finance'
export const MEDIA_KIT = 'https://github.com/starlay-finance/media-kit'
export const TWITTER = 'https://twitter.com/starlay_fi'
export const TELEGRAM = 'https://t.me/starlay_fi'
export const MEDIUM = 'http://medium.com/@starlay_fi'

export const ARTHSWAP_SWAP_URL = 'https://app.arthswap.org/#/swap'

export const TOP = '/'
export const APP = '/app'
export const MARKETS = '/app/markets'
export const MAKAI = '/app/makai'
export const SWAP = ARTHSWAP_SWAP_URL
export const GOVERNANCE = ''
export const GOVERNANCE_OVERVIEW = ''
export const BUG_BOUNTY = ''
export const SUPPORT = DISCORD

export const SORRY = '/sorry'
export const sorryFor = (reason: SorryReason) => `${SORRY}?reason=${reason}`

const MOBILE_SUPPORTED_PATHS = [TOP, SORRY]

export const isMobileSupported = (path: string) =>
  MOBILE_SUPPORTED_PATHS.includes(path)
