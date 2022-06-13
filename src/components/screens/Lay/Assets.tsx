import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useState } from 'react'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useMarketData } from 'src/hooks/useMarketData'
import { RevenueData, useRevenueData } from 'src/hooks/useRevenue'
import { UserVoteData, useUserVoteData } from 'src/hooks/useUserVoteData'
import { useVoteData, VoteData } from 'src/hooks/useVoteData'
import { darkGray, darkRed, purple, skyBlue } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { AssetMarketData } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

const STATS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'revenue', name: t`Weekly Protocol Revenue`, widthRatio: 4 },
  { id: 'apr', name: t`Dividend APR`, widthRatio: 2 },
  { id: 'totalWeight', name: t`Total Weight`, widthRatio: 2 },
  { id: 'weight', name: t`Your Weight`, widthRatio: 2 },
  { id: 'claimable', name: t`Claimable Amount`, widthRatio: 3 },
]

const VOTING_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 8 },
  { id: 'totalWeight', name: t`Total Weight`, widthRatio: 2 },
  { id: 'votedWeight', name: t`Voted Weight`, widthRatio: 2 },
  { id: 'voting', name: t`Vorting`, widthRatio: 2 },
  { id: 'votingSlider', name: '', widthRatio: 6 },
]

export const Assets = asStyled(({ className }) => {
  const [activeTab, setActiveTab] = useState('stats')
  const { data: marketData } = useMarketData()
  const { data: voteData } = useVoteData()
  const { data: userVoteData } = useUserVoteData()
  const { data: revenueData } = useRevenueData()
  const { data: layPrice } = useLAYPrice()
  const { assets } = marketData || {}
  const markets = (assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)
  return (
    <DetailsSection className={className}>
      <TableContainer>
        {activeTab == 'stats' ? (
          <MarketTable
            tabs={{
              items: [
                { id: 'stats', label: t`Stats` },
                { id: 'voting', label: t`Vote` },
              ],
              setTab: setActiveTab,
              activeTab: 'stats',
            }}
            control={
              <Control>
                <span>{t`Total Claimable: ${
                  userVoteData
                    ? formatUSD(userVoteData.claimableTotalInUSD)
                    : '-'
                }`}</span>
                <button>{t`Claim`}</button>
              </Control>
            }
            columns={STATS_COLUMNS}
            rows={markets.map((asset) =>
              statsRow({
                asset,
                revenueData,
                voteData,
                userVoteData,
                layPrice,
              }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
          />
        ) : (
          <MarketTable
            tabs={{
              items: [
                { id: 'stats', label: t`Stats` },
                { id: 'voting', label: t`Vote` },
              ],
              setTab: setActiveTab,
              activeTab: 'voting',
            }}
            control={
              <Control>
                <span>{t`Voting Power Used: ${
                  userVoteData
                    ? `${formatAmtShort(
                        userVoteData.votedTotal,
                      )}/${formatAmtShort(userVoteData.total)}`
                    : '-/-'
                }`}</span>
                <button>{t`Submit`}</button>
              </Control>
            }
            columns={VOTING_COLUMNS}
            rows={markets.map((asset) =>
              votingRow({ asset, voteData, userVoteData }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
          />
        )}
      </TableContainer>
    </DetailsSection>
  )
})``

const statsRow = ({
  asset,
  revenueData,
  voteData,
  userVoteData,
  layPrice,
}: {
  asset: AssetMarketData
  revenueData: RevenueData | undefined
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  layPrice: BigNumber | undefined
}) => {
  const { symbol, icon, name, depositAPY, totalDepositedInUSD } = asset
  const assetRevenueData = revenueData && revenueData[asset.symbol]
  const assetVoteData = voteData?.data[asset.symbol]
  const userAssetVoteData = userVoteData?.data[asset.symbol]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      revenue:
        assetRevenueData && formatUSD(assetRevenueData, { decimalPlaces: 2 }),
      apr:
        assetRevenueData &&
        assetVoteData &&
        layPrice &&
        formatPct(
          assetRevenueData.div(7).times(365).div(assetVoteData).div(layPrice),
        ),
      totalWeight:
        voteData &&
        assetVoteData &&
        `${formatAmtShort(assetVoteData)}(${formatPct(
          assetVoteData.div(voteData.total),
        )})`,
      weight: userAssetVoteData && formatAmtShort(userAssetVoteData.voted),
      claimable:
        userAssetVoteData &&
        formatUSD(userAssetVoteData.claimableInUSD, {
          decimalPlaces: 2,
        }),
    },
  }
}
const votingRow = ({
  asset,
  voteData,
  userVoteData,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
}) => {
  const { symbol, icon, name } = asset
  const assetVoteData = voteData?.data[asset.symbol]
  const userAssetVoteData = userVoteData?.data[asset.symbol]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      totalWeight:
        voteData &&
        assetVoteData &&
        `${formatAmtShort(assetVoteData)}(${formatPct(
          assetVoteData.div(voteData.total),
        )})`,
      votedWeight: userAssetVoteData && formatAmtShort(userAssetVoteData.voted),
      voting: userAssetVoteData && formatAmtShort(userAssetVoteData.voted),
      votingSlider: 'TODO',
    },
  }
}

const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 20px;
  font-size: 14px;
  span {
    font-weight: ${fontWeightMedium};
  }
  button {
    background: ${darkGray};
    border-radius: 4px;
    font-weight: ${fontWeightBold};
    padding: 8px 16px;
    line-height: 1;
    transition: background 0.15s ease-in;
    :enabled:hover {
      background: ${purple};
    }
  }
`

const DetailsSection = styled.section``
