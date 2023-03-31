import { SorryReason } from 'src/types/page'

export const DEVELOPERS = 'https://docs.starlay.finance/development/repository'
export const DOCS = 'https://docs.starlay.finance'
export const DOCS_RISK = 'https://docs.starlay.finance/asset/risk-parameters'
export const DOCS_MAKAI = 'https://docs.starlay.finance/function/makai'
export const DOCS_LAUNCHPAD = 'https://docs.starlay.finance/function/launchpad'
export const DOCS_VELAY = 'https://docs.starlay.finance/function/lock-vote'
export const DOCS_VELAY_TERMS =
  'https://docs.starlay.finance/function/lock-vote#terminology'
export const DOCS_VELAY_CLAIM =
  'https://docs.starlay.finance/function/lock-vote#terminology'
export const DISCORD = 'https://discord.gg/M4NjBJZ94b'
export const GITHUB = 'https://github.com/starlay-finance'
export const MEDIA_KIT = 'https://github.com/starlay-finance/media-kit'
export const TWITTER = 'https://twitter.com/starlay_fi'
export const MEDIUM = 'http://medium.com/@starlay_fi'

export const ARTHSWAP_SWAP_URL = 'https://app.arthswap.org/#/swap'

export const TOP = '/'
export const APP = '/app/evm'
export const POLKADOT_APP = '/app/wasm'
export const MARKETS = '/app/evm/markets'
export const POLKADOT_MARKETS = '/app/wasm/markets'
export const MAKAI = '/app/evm/makai'
export const LAY_VELAY = '/app/evm/lay'
export const LAUNCHPAD = '/app/evm/launchpad'
export const SWAP = ARTHSWAP_SWAP_URL
export const GOVERNANCE = ''
export const GOVERNANCE_OVERVIEW = ''
export const BUG_BOUNTY = ''
export const SUPPORT = DISCORD
export const EVM_PREFIX = '/evm'
export const POLKADOT_PREFIX = '/wasm'

export const POLKADOT_SUPPORTED_PAGES = [APP, MARKETS]

export const toLaunchpad = (token: string) => `${LAUNCHPAD}/${token}`
export const toMakaiLoop = (symbol: string) => `${MAKAI}?asset=${symbol}`

export const SORRY = '/sorry'
export const sorryFor = (reason: SorryReason) => `${SORRY}?reason=${reason}`

const MOBILE_SUPPORTED_PATHS = [TOP, SORRY]

export const isMobileSupported = (path: string) =>
  MOBILE_SUPPORTED_PATHS.includes(path)

export const GAS_GUIDE_URL =
  'https://metamask.zendesk.com/hc/en-us/articles/4404600179227-User-Guide-Gas'

export const METAMASK_EXT_URL =
  'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
export const POLKADOT_JS_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
