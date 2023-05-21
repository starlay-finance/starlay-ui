import { t } from '@lingui/macro'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { Toggle } from 'src/components/parts/Toggle'
import { NetworkType } from 'src/libs/config'
import { purple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { AssetMarketData, User } from 'src/types/models'
import { formatAmt, formatPct } from 'src/utils/number'
import styled from 'styled-components'

const DEPOSIT_MARKET_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'apr', name: t`Reward APR`, widthRatio: 3 },
  { id: 'apy', name: t`APY_Deposit`, widthRatio: 2.5 },
  { id: 'deposited', name: t`Deposited`, widthRatio: 3.5 },
  { id: 'collateral', name: t`Collateral`, widthRatio: 3 },
]

type DepositProps = {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  networkType: NetworkType | undefined
  deposit: (user: User, asset: AssetMarketData) => void
  setUsageAsCollateral: (user: User, asset: AssetMarketData) => void
  openWalletModal: () => void
}
export const Deposit = asStyled<DepositProps>(
  ({
    className,
    account,
    markets,
    user,
    networkType,
    deposit,
    setUsageAsCollateral,
    openWalletModal,
  }) => {
    return (
      <TableContainer>
        <MarketTable
          hoverColor={purple}
          caption={t`Deposit Markets`}
          columns={DEPOSIT_MARKET_COLUMNS}
          placeholderLength={3}
          rows={depositRows({
            account,
            markets,
            networkType,
            user,
            onClickRow: user
              ? (asset) => deposit(user, asset)
              : () => openWalletModal(),
            onClickCollateral: user
              ? (asset) => setUsageAsCollateral(user, asset)
              : undefined,
          })}
        />
      </TableContainer>
    )
  },
)``

const depositRows = ({
  markets,
  user,
  account,
  networkType,
  onClickRow,
  onClickCollateral,
}: {
  markets: AssetMarketData[]
  account: string | null | undefined
  user: User | undefined
  networkType: NetworkType | undefined
  onClickRow: (asset: AssetMarketData) => void
  onClickCollateral: ((asset: AssetMarketData) => void) | undefined
}) =>
  markets.map((asset) => {
    const { symbol, displaySymbol, icon, depositAPY, depositIncentiveAPR } =
      asset
    const apy = formatPct(depositAPY)
    const apr = formatPct(depositIncentiveAPR)
    return {
      id: symbol,
      onClick: () => onClickRow(asset),
      data: {
        asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
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
        collateral: !account ? (
          '-'
        ) : user ? (
          user.balanceByAsset[asset.symbol].deposited.isZero() ? (
            <Toggle checked={false} />
          ) : (
            <ClickDisableWrapper onClick={(e) => e.stopPropagation()}>
              <Toggle
                checked={
                  user.balanceByAsset[asset.symbol].usageAsCollateralEnabled
                }
                onClick={
                  onClickCollateral ? () => onClickCollateral(asset) : undefined
                }
                disabled={networkType !== 'EVM'}
              />
            </ClickDisableWrapper>
          )
        ) : undefined,
      },
    }
  })

const ClickDisableWrapper = styled.div`
  position: absolute;
  inset: 0;
  ${flexCenter};
  cursor: auto;
`
