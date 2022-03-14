import { disableLoadingDecorator, modalDecorator } from '.storybook/decorators'
import { useEffect } from 'react'
import { DefaultModalContainer } from 'src/components/parts/Modal/base'
import { ASSETS_DICT } from 'src/constants/assets'
import { BN_HUNDRED, BN_ZERO } from 'src/utils/number'
import { MOCK_ASSET_MARKET } from 'src/__mocks__/dashboard'
import { MOCK_USER_ASSET_BALANCE, MOCK_USER_SUMMARY } from 'src/__mocks__/user'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { disableSVGAnimation } from 'src/__tests__/utils/disableAnimation'
import { isScreenshot } from 'storycap'
import { Dashboard } from '.'
import { Borrow } from './modals/BorrowModal'
import { Deposit } from './modals/DepositModal'
import { Suggest } from './modals/SuggestModal'

export default {
  title: 'screens/Dashboard',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  decorators: [disableLoadingDecorator, modalDecorator],
}

export { DashboardScreen, DepositModal, BorrowModal, SuggestModal }

const DashboardScreen = () => {
  useEffect(() => {
    if (isScreenshot()) disableSVGAnimation()
  }, [])
  return <Dashboard />
}

const DepositModal = () => (
  <DefaultModalContainer isOpen>
    <Deposit
      asset={MOCK_ASSET_MARKET}
      userSummary={MOCK_USER_SUMMARY}
      userAssetBalance={MOCK_USER_ASSET_BALANCE}
      marketReferenceCurrencyPriceInUSD={BN_ZERO}
      marketReferenceCurrencyDecimals={0}
      close={() => {}}
    />
  </DefaultModalContainer>
)

const BorrowModal = () => (
  <DefaultModalContainer isOpen>
    <Borrow
      asset={MOCK_ASSET_MARKET}
      userSummary={MOCK_USER_SUMMARY}
      userAssetBalance={MOCK_USER_ASSET_BALANCE}
      marketReferenceCurrencyPriceInUSD={BN_ZERO}
      marketReferenceCurrencyDecimals={0}
      close={() => {}}
      openSuggestModal={() => {}}
    />
  </DefaultModalContainer>
)

const SuggestModal = () => (
  <DefaultModalContainer isOpen>
    <Suggest
      asset={{ ...MOCK_ASSET_MARKET, ...ASSETS_DICT.USDC }}
      arthswapPair={{
        apr: BN_HUNDRED,
        symbols: ['USDT', 'DAI'],
      }}
      inWallet={BN_HUNDRED}
      close={() => {}}
      openDeposit={() => {}}
    />
  </DefaultModalContainer>
)
