import { valueToBigNumber } from '@starlay-finance/math-utils'
import { UserAssetBalance, UserSummary } from 'src/types/models'

export const MOCK_ADDRESS =
  '0xCdfc500F7f0FCe1278aECb0340b523cD55b3EBbb' ||
  '0x03A77413f872A72ECdD480C755E577B362150640' ||
  '0x3d8846eA345A06938D3E1FDA2c59a98d750c1582'

export const MOCK_USER_SUMMARY: UserSummary = {
  availableBorrowsInUSD: valueToBigNumber(0),
  borrowLimitInUSD: valueToBigNumber(0),
  totalBorrowedInUSD: valueToBigNumber(0),
  totalDepositedInUSD: valueToBigNumber(0),
  healthFactor: valueToBigNumber(0),
  totalBorrowedInMarketReferenceCurrency: valueToBigNumber(0),
  netAPY: valueToBigNumber(0),
  currentLiquidationThreshold: valueToBigNumber(1),
  totalCollateralInMarketReferenceCurrency: valueToBigNumber(0),
}

export const MOCK_USER_ASSET_BALANCE: UserAssetBalance = {
  inWallet: valueToBigNumber(999999),
  deposited: valueToBigNumber(10000),
  borrowed: valueToBigNumber(5000),
  usageAsCollateralEnabled: true,
}
