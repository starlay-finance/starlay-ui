import { t } from '@lingui/macro'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Blink'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { Table } from 'src/components/parts/Table'
import { useMarketData } from 'src/hooks/useMarketData'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { darkPurple, lightYellow, purple, secondary } from 'src/styles/colors'
import {
  fontWeightHeavy,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { Color } from 'src/styles/types'
import { Asset, AssetMarketData, User } from 'src/types/models'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmt, formatPct } from 'src/utils/number'
import styled, { css, keyframes } from 'styled-components'
import { useBorrowModal } from '../modals/BorrowModal'
import { useDepositModal } from '../modals/DepositModal'

export const Market = asStyled(({ className }) => {
  const { account } = useWallet()
  const { data: marketData } = useMarketData()
  const markets = (marketData?.assets || []).sort(symbolSorter)
  const marketReferenceCurrencyPriceInUSD =
    marketData?.marketReferenceCurrencyPriceInUSD || BN_ZERO

  const { data: user } = useUserData()
  const { data: balance } = useWalletBalance()
  const { open: openDepositModal } = useDepositModal()
  const { open: openBorrowModal } = useBorrowModal()
  const { open: openWalletModal } = useWalletModal()

  const deposit = (user: User, asset: AssetMarketData) => {
    openDepositModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
    })
  }

  const borrow = (user: User, asset: AssetMarketData) => {
    openBorrowModal({
      asset,
      userSummary: user.summary,
      userAssetBalance: {
        ...user.balanceByAsset[asset.symbol],
        inWallet: balance[asset.symbol],
      },
      marketReferenceCurrencyPriceInUSD,
    })
  }

  return (
    <MarketSecion className={className}>
      <MarketSummary>
        <MarketSummaryTable
          color={purple}
          caption={t`Deposit Markets`}
          columns={[
            { id: 'asset', name: 'Asset', widthRatio: 6 },
            { id: 'apr', name: 'Reward APR', widthRatio: 3 },
            { id: 'apy', name: 'APY', widthRatio: 3 },
            { id: 'deposited', name: 'Deposited', widthRatio: 6 },
          ]}
          placeholderLength={3}
          rows={markets.map((asset) => {
            const {
              symbol,
              displaySymbol,
              name,
              icon,
              depositAPY,
              depositIncentiveAPR,
            } = asset
            const apy = formatPct(depositAPY)
            const apr = formatPct(depositIncentiveAPR)
            return {
              id: symbol,
              onClick: user ? () => deposit(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
                apr: <BlinkWrapper value={apr}>{apr}</BlinkWrapper>,
                apy: <BlinkWrapper value={apy}>{apy}</BlinkWrapper>,
                deposited: !account
                  ? '-'
                  : user
                  ? formatAmt(user.balanceByAsset[asset.symbol].deposited, {
                      symbol: displaySymbol || symbol,
                      shorteningThreshold: 6,
                    })
                  : undefined,
              },
            }
          })}
        />
      </MarketSummary>
      <MarketSummary>
        <MarketSummaryTable
          color={lightYellow}
          caption={t`Borrow Markets`}
          columns={[
            { id: 'asset', name: 'Asset', widthRatio: 6 },
            { id: 'apr', name: 'Reward APR', widthRatio: 3 },
            { id: 'apy', name: 'APY', widthRatio: 3 },
            { id: 'borrowed', name: 'Borrowed', widthRatio: 6 },
          ]}
          placeholderLength={3}
          rowDisabledStyle={rowDisabledStyle}
          rows={markets.map((asset) => {
            const {
              symbol,
              displaySymbol,
              name,
              icon,
              variableBorrowAPY,
              variableBorrowIncentiveAPR,
              borrowUnsupported,
            } = asset
            const apy = formatPct(variableBorrowAPY)
            const apr = formatPct(variableBorrowIncentiveAPR)
            return {
              id: symbol,
              onClick: user ? () => borrow(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
                apr: borrowUnsupported ? (
                  'Coming soon'
                ) : (
                  <BlinkWrapper value={apr}>{apr}</BlinkWrapper>
                ),
                apy: borrowUnsupported ? (
                  '-'
                ) : (
                  <BlinkWrapper value={apy}>{apy}</BlinkWrapper>
                ),
                borrowed:
                  borrowUnsupported || !account
                    ? '-'
                    : user
                    ? formatAmt(user.balanceByAsset[asset.symbol].borrowed, {
                        symbol: displaySymbol || symbol,
                        shorteningThreshold: 6,
                      })
                    : undefined,
              },
              disabled: borrowUnsupported,
            }
          })}
        />
      </MarketSummary>
    </MarketSecion>
  )
})``
const rowDisabledStyle = css`
  opacity: 0.32;
  pointer-events: none;
`
const AssetTd: VFC<Pick<Asset, 'icon' | 'name'>> = ({ icon, name }) => (
  <AssetDiv>
    <Image src={icon} alt={name} width={32} height={32} />
    {name}
  </AssetDiv>
)

const hoverBackgroundKeyframes = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -300%;
  }
`

const MarketSummaryTable = styled(Table)<{ color: Color }>`
  caption {
    padding: 24px 32px 0;
    font-size: 20px;
    font-weight: ${fontWeightHeavy};
    margin-bottom: 24px;
  }
  tr {
    border-top: 1px solid ${darkPurple}3d;
    height: 64px;
  }
  th {
    color: ${secondary};
    font-size: 14px;
    font-weight: ${fontWeightMedium};
  }
  td {
    font-size: 16px;
    font-weight: ${fontWeightSemiBold};
    white-space: nowrap;
  }
  th,
  td {
    padding: 16px 0;
    vertical-align: middle;
    :first-child {
      padding-left: 32px;
    }
    :last-child {
      padding-right: 32px;
    }
    :nth-child(n + 2) {
      text-align: right;
      margin-left: auto;
    }
  }
  tbody > tr {
    :hover {
      background: ${({ color }) =>
        `linear-gradient(90deg, ${color}00, ${color}52, ${color}00)`};
      background-size: 300%;
      animation: ${hoverBackgroundKeyframes} 5s infinite linear;
    }
  }
`

const AssetDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const MarketSummary = styled.div`
  border-radius: 8px;
  backdrop-filter: blur(8px) brightness(1.16);
  background-color: rgba(255, 255, 255, 0.16);
  overflow: hidden;
`

const MarketSecion = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 48px;
  > * {
    flex: 1;
  }
`
