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
import { BN_ZERO, formatAmt, formatPct, formatUSDShort } from 'src/utils/number'
import styled, { keyframes } from 'styled-components'
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
      userAssetStatus: {
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
      userAssetStatus: {
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
            { id: 'apy', name: 'APY', widthRatio: 4 },
            { id: 'deposited', name: 'Deposited', widthRatio: 4 },
          ]}
          placeholderLength={3}
          rows={markets.map((asset) => {
            const { symbol, name, icon, depositAPY } = asset
            const apy = formatPct(depositAPY)
            return {
              id: symbol,
              onClick: user ? () => deposit(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
                apy: <BlinkWrapper value={apy}>{apy}</BlinkWrapper>,
                deposited: !account
                  ? '-'
                  : user
                  ? formatAmt(user.balanceByAsset[asset.symbol].deposited, {
                      symbol,
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
            { id: 'apy', name: 'APY', widthRatio: 2 },
            { id: 'borrowed', name: 'Borrowed', widthRatio: 4 },
            { id: 'liquidity', name: 'Liquidity', widthRatio: 4 },
          ]}
          placeholderLength={3}
          rows={markets.map((asset) => {
            const { symbol, name, icon, variableBorrowAPY, liquidityInUSD } =
              asset
            const apy = formatPct(variableBorrowAPY)
            return {
              id: symbol,
              onClick: user ? () => borrow(user, asset) : openWalletModal,
              data: {
                asset: <AssetTd icon={icon} name={name} />,
                apy: <BlinkWrapper value={apy}>{apy}</BlinkWrapper>,
                borrowed: !account
                  ? '-'
                  : user
                  ? formatAmt(user.balanceByAsset[asset.symbol].borrowed, {
                      symbol,
                      shorteningThreshold: 6,
                    })
                  : undefined,
                liquidity: formatUSDShort(liquidityInUSD),
              },
            }
          })}
        />
      </MarketSummary>
    </MarketSecion>
  )
})``

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
