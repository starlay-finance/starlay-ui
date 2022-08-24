import { getMarketData } from 'src/hooks/useMarketData'
import { getLAYPrice } from 'src/libs/arthswap-data-provider'
import { getPoolDataProvider } from 'src/libs/pool-data-provider'
import { getProvider } from 'src/libs/static-rpc-provider'
import { asHandler, cacheControl } from 'src/utils/api'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'

const getMarketDataForAPI = async () => {
  const chainId = DEFAULT_CHAIN_ID
  const provider = getProvider(chainId)
  const poolDataProvider = getPoolDataProvider({ chainId, provider })
  const layPrice = await getLAYPrice(chainId)
  if (!layPrice) throw new Error('Failed to fetch the price of LAY.')
  const { assets, marketTimestamp } = await getMarketData(
    poolDataProvider.provider,
    chainId,
    layPrice,
  )
  return {
    timestamp: marketTimestamp,
    assets: assets
      .filter((each) => each.isActive)
      .map(({ icon, displaySymbol, ...data }) => data),
  }
}

/**
 * @swagger
 * /api/market:
 *   get:
 *     tags:
 *       - starlay
 *     description: Returns Market Data
 *     responses:
 *       200:
 *         description: Market Data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Market'
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const handler = asHandler(getMarketDataForAPI, {
  headers: {
    'Cache-Control': cacheControl(3600, 7200),
  },
})

export default handler
