import { BigNumber } from '@starlay-finance/math-utils'
import { Dayjs } from 'dayjs'
import { ERC20Asset } from 'src/types/models'

export type LaunchpadData = {
  id: string
  projectName: string
  keyVisual: string
  ogImage: string
  icon: { url: string; viewBox: string }
  token: {
    name: string
    symbol: string
    address?: string
  }
  information: {
    details: string
    sale: string
    notes: string
    urls: {
      website: string
      docs?: string
      twitter?: string
      discord?: string
      telegram?: string
    }
  }
  sale: {
    start: Dayjs
    end: Dayjs
    emissionAmount: number
    emissionRatio: number
    biddingAssets: Omit<ERC20Asset, 'icon'>[]
  }
}

export type Status = 'Upcoming' | 'Open' | 'Ended'

export type Market = {
  currentPriceInUSD: BigNumber
  bottomPriceInUSD: BigNumber
  raisedAmountInUSD: BigNumber
  boostedRaisedAmountInUSD: BigNumber
  numOfBids: BigNumber
}

export type PriceChartData = {
  priceInUSD: number
  bottomPriceInUSD: number
  timestamp: number
}

export type Bid = {
  amount: BigNumber
  limitPrice?: BigNumber
  cancelable?: boolean
}
