import { valueToBigNumber } from '@starlay-finance/math-utils'
import { MOCK_ASSET_MARKET } from 'src/__mocks__/dashboard'
import { MOCK_USER_ASSET_BALANCE, MOCK_USER_SUMMARY } from 'src/__mocks__/user'
import { PartialDeep } from 'type-fest'
import { estimateDeposit, EstimationParam } from './calculator'
import { BN_HUNDRED, BN_ONE } from './number'

describe('calculartor', () => {
  describe('estimateDeposit', () => {
    describe('max amount', () => {
      test('should be equal to the amount in wallet', () => {
        const inWallet = valueToBigNumber(BN_ONE)
        const result = estimateDeposit(
          param({ userAssetBalance: { inWallet } }),
        )
        expect(result.maxAmount.eq(inWallet)).toBeTruthy()
      })
    })
    describe('availableBorowsInUSD', () => {
      test('should be equal to sum of current and ltv of the amount to deposit', () => {
        const result = estimateDeposit(
          param({
            userSummary: { availableBorrowsInUSD: BN_ONE },
            userAssetBalance: { inWallet: BN_HUNDRED },
            amount: BN_HUNDRED,
            asset: {
              baseLTVasCollateral: valueToBigNumber('0.8'),
              priceInMarketReferenceCurrency: valueToBigNumber('1.5'),
            },
            marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
          }),
        )
        expect(result.unavailableReason).toBeUndefined()
        expect(result.availableBorrowsInUSD?.toFixed(0)).toBe('241')
      })
    })
    describe('borrowLimitUsed', () => {
      test('should be equal to division between borrwed amount and new borrow limit', () => {
        const result = estimateDeposit(
          param({
            userSummary: {
              availableBorrowsInUSD: BN_ONE,
              totalBorrowedInUSD: BN_ONE,
            },
            userAssetBalance: { inWallet: BN_HUNDRED },
            amount: BN_HUNDRED.minus(BN_ONE),
            asset: {
              baseLTVasCollateral: BN_ONE,
              priceInMarketReferenceCurrency: BN_ONE,
            },
            marketReferenceCurrencyPriceInUSD: BN_ONE,
          }),
        )
        expect(result.unavailableReason).toBeUndefined()
        expect(result.borrowLimitUsed?.toFixed(2)).toBe('0.01')
      })
    })
    describe('healthFactor', () => {
      test('should be equal to division between sum of collateral by liquidation threshold and borrowed amount', () => {
        const result = estimateDeposit(
          param({
            userSummary: {
              totalBorrowedInMarketReferenceCurrency: BN_ONE,
              totalCollateralInMarketReferenceCurrency: BN_ONE,
              currentLiquidationThreshold: valueToBigNumber('0.9'),
            },
            amount: BN_ONE,
            asset: {
              priceInMarketReferenceCurrency: BN_ONE,
              reserveLiquidationThreshold: 0.7,
            },
          }),
        )
        expect(result.unavailableReason).toBeUndefined()
        expect(result.healthFactor?.toFixed(2)).toBe('1.60')
      })
    })
    describe('unavailable reason', () => {
      describe('should return "Enter amount" if amount not valid', () => {
        test('empty', () => {
          const result = estimateDeposit(param({ amount: undefined }))
          expect(result.unavailableReason).toBe('Enter amount')
        })
        test('NaN', () => {
          const result = estimateDeposit(param({ amount: BN_NAN }))
          expect(result.unavailableReason).toBe('Enter amount')
        })
        test('less than or equals to 0', () => {
          const result = estimateDeposit(param({ amount: BN_NEGATIVE }))
          expect(result.unavailableReason).toBe('Enter amount')
        })
      })
      test('should return "No balance to deposit" if amount gte in wallet', () => {
        const result = estimateDeposit(
          param({
            amount: BN_ONE.plus(BN_ONE),
            userAssetBalance: { inWallet: BN_ONE },
          }),
        )
        expect(result.unavailableReason).toBe('No balance to deposit')
      })
    })
  })
})

const BN_NAN = valueToBigNumber('nan')
const BN_NEGATIVE = valueToBigNumber('-1')

// @ts-ignore
const BASE_PARAMS: EstimationParam = {
  asset: MOCK_ASSET_MARKET,
  marketReferenceCurrencyPriceInUSD: BN_HUNDRED,
  userSummary: MOCK_USER_SUMMARY,
  userAssetBalance: MOCK_USER_ASSET_BALANCE,
}
const param = (diff: PartialDeep<EstimationParam>): EstimationParam => ({
  // @ts-ignore
  asset: {
    ...BASE_PARAMS.asset,
    ...diff.asset,
  },
  // @ts-ignore
  marketReferenceCurrencyPriceInUSD:
    diff.marketReferenceCurrencyPriceInUSD ||
    BASE_PARAMS.marketReferenceCurrencyPriceInUSD,
  // @ts-ignore
  userAssetBalance: {
    ...BASE_PARAMS.userAssetBalance,
    ...diff.userAssetBalance,
  },
  // @ts-ignore
  userSummary: {
    ...BASE_PARAMS.userSummary,
    ...diff.userSummary,
  },
  // @ts-ignore
  amount: diff.amount || BASE_PARAMS.amount,
})
