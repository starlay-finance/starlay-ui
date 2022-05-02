import { BigNumber } from '@starlay-finance/math-utils'
import { Dayjs } from 'dayjs'

export type LaunchPadData = {
  id: string
  projectName: string
  keyVisual: string
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
    biddingAssets: {
      name: string
      symbol: string
      address: string
    }[]
  }
}

export type Market = {
  currentPriceInUSD: BigNumber
  bottomPriceInUSD: BigNumber
  raisedAmountInUSD: BigNumber
  numOfBids: BigNumber
}

export type PriceChartData = {
  priceInUSD: number
  bottomPriceInUSD: number
  timestamp: number
}
