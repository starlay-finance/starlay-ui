import { valueToBigNumber } from '@starlay-finance/math-utils'
import { MOCK_ASSET_MARKET } from 'src/__mocks__/dashboard'
import { MOCK_USER_ASSET_BALANCE, MOCK_USER_SUMMARY } from 'src/__mocks__/user'
import { PartialDeep } from 'type-fest'
import {
  estimateBorrow,
  estimateDeposit,
  estimateLooping,
  estimateRepayment,
  estimateWithdrawal,
  EstimationParam,
} from './estimationHelper'
import { BN_HUNDRED, BN_ONE } from './number'

describe('estimationHelper', () => {
  describe('estimateDeposit', () => {
    test('max amount should be equal to the amount in wallet', () => {
      const inWallet = valueToBigNumber(BN_ONE)
      const result = estimateDeposit(param({ userAssetBalance: { inWallet } }))
      expect(result.maxAmount.eq(inWallet)).toBeTruthy()
    })
    test('availableBorowsInUSD should be equal to sum of current and ltv of the amount to deposit', () => {
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
    test('borrowLimitUsed should be equal to division between borrwed amount and new borrow limit', () => {
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
    test('healthFactor should be equal to division between sum of collateral multiplied by liquidation threshold and borrowed amount', () => {
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
            reserveLiquidationThreshold: valueToBigNumber('0.7'),
          },
        }),
      )
      expect(result.unavailableReason).toBeUndefined()
      expect(result.healthFactor?.toFixed(2)).toBe('1.60')
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
      test('should return "No balance to deposit" if the amount gt in wallet', () => {
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

  describe('estimateWithdrawal', () => {
    describe('max amount should be min of deposited, liquidity, unused collateral', () => {
      test('should be equal to the deposited', () => {
        const deposited = BN_ONE
        const result = estimateWithdrawal(
          param({
            userAssetBalance: {
              deposited,
              usageAsCollateralEnabled: false,
            },
            userSummary: { totalBorrowedInMarketReferenceCurrency: BN_HUNDRED },
            asset: { liquidityInUSD: BN_HUNDRED },
          }),
        )
        expect(result.maxAmount.eq(deposited)).toBeTruthy()
      })
      test('should be equal to the liquidity', () => {
        const liquidity = BN_ONE
        const result = estimateWithdrawal(
          param({
            userAssetBalance: {
              deposited: BN_HUNDRED,
              usageAsCollateralEnabled: false,
            },
            userSummary: { totalBorrowedInMarketReferenceCurrency: BN_HUNDRED },
            asset: { liquidity },
          }),
        )
        expect(result.maxAmount.eq(liquidity)).toBeTruthy()
      })
      test('should be equal to the unused collateral', () => {
        const result = estimateWithdrawal(
          param({
            userAssetBalance: {
              deposited: BN_HUNDRED,
              usageAsCollateralEnabled: true,
            },
            userSummary: {
              totalBorrowedInMarketReferenceCurrency: BN_HUNDRED,
              healthFactor: valueToBigNumber('1.1'),
            },
            asset: {
              liquidity: BN_HUNDRED,
              reserveLiquidationThreshold: valueToBigNumber('0.8'),
              priceInMarketReferenceCurrency: valueToBigNumber('1'),
            },
          }),
        )
        expect(result.maxAmount.toFixed(2)).toBe('12.22')
      })
    })
    test('if usageAsCollateral not enabled, borrow limit should no change', () => {
      const parameter = param({
        amount: BN_ONE,
        userSummary: {
          availableBorrowsInUSD: BN_ONE,
          borrowLimitUsed: valueToBigNumber('0.1'),
          healthFactor: BN_HUNDRED,
        },
        userAssetBalance: { usageAsCollateralEnabled: false },
      })
      const result = estimateWithdrawal(parameter)
      expect(
        result.availableBorrowsInUSD?.eq(
          parameter.userSummary.availableBorrowsInUSD,
        ),
      ).toBeTruthy()
      expect(
        result.borrowLimitUsed?.eq(parameter.userSummary.borrowLimitUsed!),
      ).toBeTruthy()
      expect(
        result.healthFactor?.eq(parameter.userSummary.healthFactor!),
      ).toBeTruthy()
    })
    describe('if usageAsCollateral enabled', () => {
      test('availableBorowsInUSD should be equal to subtraction ltv of the amount to withdraw from the current', () => {
        const result = estimateWithdrawal(
          param({
            userSummary: {
              borrowLimitInUSD: valueToBigNumber('400'),
              totalBorrowedInUSD: BN_HUNDRED,
            },
            userAssetBalance: { deposited: BN_HUNDRED },
            amount: BN_HUNDRED,
            asset: {
              baseLTVasCollateral: valueToBigNumber('0.8'),
              priceInMarketReferenceCurrency: valueToBigNumber('1.5'),
            },
            marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
          }),
        )
        expect(result.availableBorrowsInUSD?.toFixed(0)).toBe('60')
      })
      test('borrowLimitUsed should be equal to division between borrwed amount and new borrow limit', () => {
        const result = estimateWithdrawal(
          param({
            userSummary: {
              borrowLimitInUSD: valueToBigNumber('400'),
              totalBorrowedInUSD: BN_HUNDRED,
            },
            userAssetBalance: { deposited: BN_HUNDRED },
            amount: BN_HUNDRED,
            asset: {
              baseLTVasCollateral: BN_ONE,
              priceInMarketReferenceCurrency: BN_ONE,
            },
            marketReferenceCurrencyPriceInUSD: BN_ONE,
          }),
        )
        expect(result.borrowLimitUsed?.toFixed(2)).toBe('0.33')
      })
      test('healthFactor should be equal to division between sum of collateral multiplied by liquidation threshold and borrowed amount', () => {
        const totalCollateralInMarketReferenceCurrency = BN_HUNDRED
        const currentLiquidationThreshold = valueToBigNumber('0.9')
        const reserveLiquidationThreshold = valueToBigNumber('0.7')
        const amount = BN_ONE
        const result = estimateWithdrawal(
          param({
            userSummary: {
              totalBorrowedInUSD: BN_ONE,
              totalBorrowedInMarketReferenceCurrency: BN_ONE,
              totalCollateralInMarketReferenceCurrency,
              currentLiquidationThreshold,
              healthFactor: valueToBigNumber('2'),
            },
            userAssetBalance: { deposited: BN_HUNDRED },
            amount,
            asset: {
              liquidity: BN_HUNDRED,
              priceInMarketReferenceCurrency: BN_ONE,
              reserveLiquidationThreshold,
            },
          }),
        )
        expect(result.unavailableReason).toBeUndefined()
        expect(result.healthFactor?.toFixed(2)).toBe('89.30')
      })
    })
    describe('unavailable reason', () => {
      test('should return "Enter amount" if the amount not valid', () => {
        const result = estimateWithdrawal(param({ amount: undefined }))
        expect(result.unavailableReason).toBe('Enter amount')
      })
      test('should return "No balance to withdraw" if the amount gt deposited', () => {
        const result = estimateWithdrawal(
          param({
            amount: BN_ONE.plus(BN_ONE),
            userAssetBalance: { deposited: BN_ONE },
            asset: { liquidity: BN_HUNDRED },
          }),
        )
        expect(result.unavailableReason).toBe('No balance to withdraw')
      })
      test('should return "Insufficient collateral" if the amount gt unused collateral', () => {
        const result = estimateWithdrawal(
          param({
            amount: BN_ONE.plus(BN_ONE),
            userSummary: {
              totalBorrowedInMarketReferenceCurrency: BN_HUNDRED,
              healthFactor: valueToBigNumber('1.1'),
            },
            userAssetBalance: {
              deposited: BN_HUNDRED,
              usageAsCollateralEnabled: true,
            },
            asset: {
              liquidity: BN_ONE,
              usageAsCollateralEnabled: true,
              priceInMarketReferenceCurrency: BN_HUNDRED,
              reserveLiquidationThreshold: valueToBigNumber('1'),
            },
          }),
        )
        expect(result.unavailableReason).toBe('Insufficient collateral')
      })
      test('should return "No liquidity to withdraw" if the amount gt liquidity', () => {
        const result = estimateWithdrawal(
          param({
            amount: BN_ONE.plus(BN_ONE),
            userAssetBalance: { deposited: BN_HUNDRED },
            asset: { liquidity: BN_ONE },
          }),
        )
        expect(result.unavailableReason).toBe('No liquidity to withdraw')
      })
      test('should return "Health factor too low" if health factor lt threshold', () => {
        const result = estimateWithdrawal(
          param({
            userSummary: {
              totalBorrowedInUSD: BN_ONE,
              totalBorrowedInMarketReferenceCurrency: BN_ONE,
              totalCollateralInMarketReferenceCurrency: BN_HUNDRED,
              currentLiquidationThreshold: valueToBigNumber('0.01'),
              healthFactor: valueToBigNumber('2'),
            },
            userAssetBalance: { deposited: BN_HUNDRED },
            amount: BN_ONE,
            asset: {
              liquidity: BN_HUNDRED,
              priceInMarketReferenceCurrency: BN_ONE,
              reserveLiquidationThreshold: valueToBigNumber('0.9'),
            },
          }),
        )
        expect(result.unavailableReason).toBe('Health factor too low')
      })
    })
  })

  describe('estimateBorrow', () => {
    describe('max amount should be min of liquidity or unused collateral', () => {
      test('should be equal to the liquidity', () => {
        const liquidity = BN_ONE
        const result = estimateBorrow(
          param({
            userSummary: { availableBorrowsInUSD: BN_HUNDRED },
            asset: { liquidity, priceInMarketReferenceCurrency: BN_ONE },
            marketReferenceCurrencyPriceInUSD: BN_ONE,
          }),
        )
        expect(result.maxAmount.eq(liquidity)).toBeTruthy()
      })
      test('should be equal to the unused collateral', () => {
        const result = estimateBorrow(
          param({
            userSummary: { availableBorrowsInUSD: BN_HUNDRED },
            asset: {
              liquidity: BN_HUNDRED,
              priceInMarketReferenceCurrency: valueToBigNumber('2'),
            },
            marketReferenceCurrencyPriceInUSD: valueToBigNumber('10'),
          }),
        )
        expect(result.maxAmount.toFixed(0)).toBe('5')
      })
    })
    test('totalBorrowedInUSD should be equal to sum the current and new borrowed', () => {
      const result = estimateBorrow(
        param({
          userSummary: {
            totalBorrowedInUSD: BN_HUNDRED,
            availableBorrowsInUSD: BN_HUNDRED.multipliedBy(BN_HUNDRED),
          },
          amount: BN_HUNDRED,
          asset: {
            priceInMarketReferenceCurrency: valueToBigNumber('1.5'),
          },
          marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
        }),
      )
      expect(result.totalBorrowedInUSD?.toFixed(0)).toBe('400')
    })
    test('borrowLimitUsed should be equal to sum the current and new usage', () => {
      const borrowLimitInUSD = BN_HUNDRED.multipliedBy(BN_HUNDRED)
      const result = estimateBorrow(
        param({
          userSummary: {
            borrowLimitInUSD,
            totalBorrowedInUSD: BN_HUNDRED,
            availableBorrowsInUSD: borrowLimitInUSD.minus(BN_HUNDRED),
          },
          amount: BN_HUNDRED,
          asset: {
            priceInMarketReferenceCurrency: valueToBigNumber('1.5'),
          },
          marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
        }),
      )
      expect(result.borrowLimitUsed?.toFixed(2)).toBe('0.04')
    })
    test('healthFactor should be equal to division between sum of collateral multiplied by liquidation threshold and borrowed amount', () => {
      const totalCollateralInMarketReferenceCurrency = BN_HUNDRED
      const currentLiquidationThreshold = valueToBigNumber('0.9')
      const amount = BN_ONE
      const result = estimateBorrow(
        param({
          userSummary: {
            totalBorrowedInMarketReferenceCurrency: BN_ONE,
            totalCollateralInMarketReferenceCurrency,
            availableBorrowsInUSD: BN_HUNDRED,
            currentLiquidationThreshold,
            healthFactor: valueToBigNumber('2'),
          },
          amount,
          asset: {
            liquidity: BN_HUNDRED,
            priceInMarketReferenceCurrency: BN_ONE,
          },
          marketReferenceCurrencyPriceInUSD: BN_ONE,
        }),
      )
      expect(result.unavailableReason).toBeUndefined()
      expect(result.healthFactor?.toFixed(2)).toBe('45.00')
    })
    describe('unavailable reason', () => {
      test('should return "Enter amount" if the amount not valid', () => {
        const result = estimateBorrow(param({ amount: undefined }))
        expect(result.unavailableReason).toBe('Enter amount')
      })
      test('should return "No liquidity to borrow" if the amount gt liquidity', () => {
        const result = estimateBorrow(
          param({
            userSummary: {
              availableBorrowsInUSD: valueToBigNumber('99999999999'),
            },
            amount: BN_ONE.plus(BN_ONE),
            asset: { liquidity: BN_ONE },
          }),
        )
        expect(result.unavailableReason).toBe('No liquidity to borrow')
      })
      test('should return "Borrowing limit reached" if the amount gt unused collateral', () => {
        const result = estimateBorrow(
          param({
            amount: BN_ONE,
            userSummary: { availableBorrowsInUSD: BN_HUNDRED },
            asset: {
              liquidity: BN_HUNDRED,
              priceInMarketReferenceCurrency: valueToBigNumber('10'),
            },
            marketReferenceCurrencyPriceInUSD: valueToBigNumber('11'),
          }),
        )
        expect(result.unavailableReason).toBe('Borrowing limit reached')
      })
      test('should return "Health factor too low" if health factor lt threshold', () => {
        const result = estimateBorrow(
          param({
            userSummary: {
              totalBorrowedInMarketReferenceCurrency: BN_ONE,
              totalCollateralInMarketReferenceCurrency: BN_HUNDRED,
              currentLiquidationThreshold: valueToBigNumber('0.01'),
              healthFactor: valueToBigNumber('2'),
              availableBorrowsInUSD: BN_HUNDRED,
            },
            userAssetBalance: { deposited: BN_HUNDRED },
            amount: BN_ONE,
            asset: {
              liquidity: BN_HUNDRED,
              priceInMarketReferenceCurrency: BN_ONE,
              reserveLiquidationThreshold: valueToBigNumber('0.9'),
            },
            marketReferenceCurrencyPriceInUSD: BN_ONE,
          }),
        )
        expect(result.unavailableReason).toBe('Health factor too low')
      })
    })
  })

  describe('estimateRepayment', () => {
    describe('max amount should be the min amount of borrowed or in wallet', () => {
      test('should be equal to the borrowed(with margin', () => {
        const borrowed = BN_ONE
        const result = estimateRepayment(
          param({ userAssetBalance: { borrowed, inWallet: BN_HUNDRED } }),
        )
        expect(result.maxAmount.eq(borrowed)).toBeTruthy()
      })
      test('should be equal to in wallet', () => {
        const inWallet = BN_ONE
        const result = estimateRepayment(
          param({ userAssetBalance: { borrowed: BN_HUNDRED, inWallet } }),
        )
        expect(result.maxAmount.eq(inWallet)).toBeTruthy()
      })
    })
    test('totalBorrowedInUSD should be equal to subtraction of repayment from the current', () => {
      const result = estimateRepayment(
        param({
          userSummary: { totalBorrowedInUSD: BN_HUNDRED },
          amount: BN_ONE,
          asset: { priceInMarketReferenceCurrency: valueToBigNumber('1.5') },
          marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
        }),
      )
      expect(result.unavailableReason).toBeUndefined()
      expect(result.totalBorrowedInUSD?.toFixed(0)).toBe('97')
    })
    test('borrowLimitUsed should be equal to subtraction of the repayment from the current', () => {
      const borrowLimitInUSD = BN_HUNDRED.multipliedBy(BN_HUNDRED)
      const result = estimateRepayment(
        param({
          userSummary: {
            borrowLimitInUSD,
            totalBorrowedInUSD: borrowLimitInUSD.div('2'),
            availableBorrowsInUSD: borrowLimitInUSD.div('2'),
          },
          amount: BN_HUNDRED,
          asset: {
            priceInMarketReferenceCurrency: valueToBigNumber('1.5'),
          },
          marketReferenceCurrencyPriceInUSD: valueToBigNumber('2'),
        }),
      )
      expect(result.unavailableReason).toBeUndefined()
      expect(result.borrowLimitUsed?.toFixed(2)).toBe('0.47')
    })
    test('healthFactor should be equal to division between sum of collateral multiplied by liquidation threshold and borrowed amount', () => {
      const totalCollateralInMarketReferenceCurrency = BN_HUNDRED
      const currentLiquidationThreshold = valueToBigNumber('0.9')
      const amount = BN_ONE
      const result = estimateRepayment(
        param({
          userSummary: {
            totalBorrowedInMarketReferenceCurrency: BN_HUNDRED,
            totalCollateralInMarketReferenceCurrency,
            availableBorrowsInUSD: BN_HUNDRED,
            currentLiquidationThreshold,
            healthFactor: valueToBigNumber('0.9'),
          },
          amount,
          asset: {
            liquidity: BN_HUNDRED,
            priceInMarketReferenceCurrency: BN_ONE,
          },
          marketReferenceCurrencyPriceInUSD: BN_ONE,
        }),
      )
      expect(result.unavailableReason).toBeUndefined()
      expect(result.healthFactor?.toFixed(2)).toBe('0.91')
    })
    describe('unavailable reason', () => {
      test('should return "Enter amount" if the amount not valid', () => {
        const result = estimateRepayment(param({ amount: undefined }))
        expect(result.unavailableReason).toBe('Enter amount')
      })
      test('should return "No balance to repay" if the amount gt inWallet', () => {
        const inWallet = BN_ONE
        const result = estimateRepayment(
          param({
            userAssetBalance: { borrowed: BN_HUNDRED, inWallet },
            amount: BN_HUNDRED,
          }),
        )
        expect(result.unavailableReason).toBe('No balance to repay')
      })
    })
  })
  describe('estimateLooping', () => {
    test('max amount should be equal to the balance in the wallet', () => {
      const inWallet = BN_ONE
      const result = estimateLooping({
        ...param({ amount: undefined, userAssetBalance: { inWallet } }),
        leverage: BN_ONE,
      })
      expect(result.maxAmount).toBe(inWallet)
    })
    test('deposit APY should be division between looped deposit and the amount ', () => {
      const leverage = valueToBigNumber('5')
      const depositAPY = valueToBigNumber('0.1')
      const result = estimateLooping({
        ...param({
          amount: BN_ONE,
          userAssetBalance: { inWallet: BN_HUNDRED },
          asset: { depositAPY },
        }),
        leverage,
      })
      expect(result.depositAPY.toFixed(2)).toBe(
        depositAPY.multipliedBy(leverage).toFixed(2),
      )
    })
    test('borrow APY should be division between looped borrow(leverage - 1) and the amount ', () => {
      const leverage = valueToBigNumber('5')
      const variableBorrowAPY = valueToBigNumber('0.2')
      const result = estimateLooping({
        ...param({
          amount: BN_ONE,
          userAssetBalance: { inWallet: BN_HUNDRED },
          asset: { variableBorrowAPY },
        }),
        leverage,
      })
      expect(result.borrowAPY.toFixed(2)).toBe(
        variableBorrowAPY.multipliedBy(leverage.minus(BN_ONE)).toFixed(2),
      )
    })
    test('reward APR should be sum of deposited amount and borrowed amount multiplied by the respective incentive apr', () => {
      const leverage = valueToBigNumber('5')
      const depositIncentiveAPR = valueToBigNumber('1')
      const variableBorrowIncentiveAPR = valueToBigNumber('2')
      const result = estimateLooping({
        ...param({
          amount: BN_ONE,
          userAssetBalance: { inWallet: BN_HUNDRED },
          asset: { depositIncentiveAPR, variableBorrowIncentiveAPR },
        }),
        leverage,
      })
      expect(result.rewardAPR.toFixed(2)).toBe(
        depositIncentiveAPR
          .multipliedBy(leverage)
          .plus(variableBorrowIncentiveAPR.multipliedBy(leverage.minus(BN_ONE)))
          .toFixed(2),
      )
    })
    test('net APY should be sum of looped APYs and Reward APR', () => {
      const leverage = valueToBigNumber('5')
      const depositAPY = valueToBigNumber('0.1')
      const variableBorrowAPY = valueToBigNumber('0.2')
      const depositIncentiveAPR = valueToBigNumber('1')
      const variableBorrowIncentiveAPR = valueToBigNumber('2')
      const result = estimateLooping({
        ...param({
          amount: BN_ONE,
          userAssetBalance: { inWallet: BN_HUNDRED },
          asset: {
            depositAPY,
            variableBorrowAPY,
            depositIncentiveAPR,
            variableBorrowIncentiveAPR,
          },
        }),
        leverage,
      })
      expect(result.netAPY.toFixed(2)).toBe(
        depositAPY
          .multipliedBy(leverage)
          .minus(variableBorrowAPY.multipliedBy(leverage.minus(BN_ONE)))
          .plus(depositIncentiveAPR.multipliedBy(leverage))
          .plus(variableBorrowIncentiveAPR.multipliedBy(leverage.minus(BN_ONE)))
          .toFixed(2),
      )
    })
    test('health factor should be calculated from looped deposit and borrow', () => {
      const amount = valueToBigNumber('2')
      const leverage = valueToBigNumber('5')
      const totalCollateralInMarketReferenceCurrency = valueToBigNumber('50')
      const totalBorrowedInMarketReferenceCurrency = valueToBigNumber('20')
      const currentLiquidationThreshold = valueToBigNumber('0.8')
      const reserveLiquidationThreshold = valueToBigNumber('0.5')
      const priceInMarketReferenceCurrency = valueToBigNumber('10')
      const result = estimateLooping({
        ...param({
          amount,
          userSummary: {
            currentLiquidationThreshold,
            totalCollateralInMarketReferenceCurrency,
            totalBorrowedInMarketReferenceCurrency,
          },
          userAssetBalance: { inWallet: BN_HUNDRED },
          asset: {
            reserveLiquidationThreshold,
            priceInMarketReferenceCurrency,
          },
        }),
        leverage,
      })

      const leveragedCollateral = amount
        .multipliedBy(leverage)
        .multipliedBy(priceInMarketReferenceCurrency)
      const newTotalCollateral =
        totalCollateralInMarketReferenceCurrency.plus(leveragedCollateral)
      const newTotalBorrow = totalBorrowedInMarketReferenceCurrency.plus(
        amount
          .multipliedBy(leverage.minus(BN_ONE))
          .multipliedBy(priceInMarketReferenceCurrency),
      )
      const newLiquidationThreshold = currentLiquidationThreshold
        .multipliedBy(totalCollateralInMarketReferenceCurrency)
        .plus(leveragedCollateral.multipliedBy(reserveLiquidationThreshold))
        .div(newTotalCollateral)

      expect(result.healthFactor?.toFixed(2)).toBe(
        newTotalCollateral
          .multipliedBy(newLiquidationThreshold)
          .div(newTotalBorrow)
          .toFixed(2),
      )
    })
    describe('unavailable reason', () => {
      test('should return "Enter amount" if the amount not valid', () => {
        const result = estimateLooping({
          ...param({ amount: undefined }),
          leverage: BN_HUNDRED,
        })
        expect(result.unavailableReason).toBe('Enter amount')
      })
      test('should return "Enter leverage" if the leverage not valid', () => {
        const result = estimateLooping({
          ...param({ amount: BN_ONE }),
          leverage: BN_ONE,
        })
        expect(result.unavailableReason).toBe('Enter leverage')
      })
      test('should return "No balance to looping" if the amount gt inWallet', () => {
        const inWallet = BN_ONE
        const result = estimateLooping({
          ...param({
            amount: inWallet.plus(BN_ONE),
            userAssetBalance: { inWallet },
          }),
          leverage: BN_HUNDRED,
        })
        expect(result.unavailableReason).toBe('No balance to loop')
      })
      test('should return "Health factor too low" if the health factro lt the threshold', () => {
        const inWallet = BN_ONE
        const result = estimateLooping({
          ...param({
            amount: inWallet,
            userAssetBalance: { inWallet },
          }),
          leverage: BN_HUNDRED,
        })
        expect(result.unavailableReason).toBe('Health factor too low')
      })
      test('should be undefined if valid', () => {
        const inWallet = BN_ONE
        const result = estimateLooping({
          ...param({
            amount: valueToBigNumber('0.1'),
            userSummary: {
              totalCollateralInMarketReferenceCurrency: BN_HUNDRED,
            },
            userAssetBalance: { inWallet },
            asset: { reserveLiquidationThreshold: BN_ONE },
          }),
          leverage: BN_HUNDRED,
        })
        expect(result.unavailableReason).toBeUndefined()
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
