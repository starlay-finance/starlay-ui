import { asStyled } from 'src/components/hoc/asStyled'
import styled from 'styled-components'
import { Borrow } from './Borrow'
import { Deposit } from './Deposit'
import { useMarket } from './useMarket'

export const Market = asStyled(({ className }) => {
  const {
    account,
    user,
    markets,
    networkType,
    deposit,
    borrow,
    setUsageAsCollateral,
    openWalletModal,
  } = useMarket()
  return (
    <MarketSecion className={className}>
      <Deposit
        account={account}
        user={user}
        markets={markets}
        networkType={networkType}
        deposit={deposit}
        setUsageAsCollateral={setUsageAsCollateral}
        openWalletModal={openWalletModal}
      />
      <Borrow
        account={account}
        user={user}
        markets={markets}
        borrow={borrow}
        openWalletModal={openWalletModal}
      />
    </MarketSecion>
  )
})``

const MarketSecion = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 24px;
  > * {
    flex: 1;
  }
`
