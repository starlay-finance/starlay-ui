import { valueToBigNumber } from '@starlay-finance/math-utils'
import { BN_HUNDRED, BN_ONE, BN_ZERO } from 'src/utils/number'
import { calcEstimatedAmount, validate } from './useBiddingForm'

describe('useBiddingForm', () => {
  describe('estimate', () => {
    const market = {
      maxAmount: valueToBigNumber('100'),
      boostedRaisedAmount: valueToBigNumber('90'),
      currentEstimatedPrice: valueToBigNumber('0.9'),
    }
    const marketWithoutBids = {
      maxAmount: valueToBigNumber('100'),
      boostedRaisedAmount: BN_ZERO,
      currentEstimatedPrice: BN_ZERO,
    }
    test('return max amount if first bid', () => {
      expect(
        calcEstimatedAmount(
          { amount: BN_ONE },
          false,
          marketWithoutBids,
        ).toString(),
      ).toBe(market.maxAmount.toString())
    })
    test('return 0% boosted amount with limit price and cancelable option', () => {
      expect(
        calcEstimatedAmount(
          {
            amount: valueToBigNumber(10),
            limitPrice: BN_ONE.plus(1),
            cancelable: true,
          },
          false,
          market,
        ).toString(),
      ).toBe('10')
    })
    test('return 5% boosted amount with no limit price and cancelable option', () => {
      expect(
        calcEstimatedAmount(
          {
            amount: valueToBigNumber(10),
            limitPrice: BN_ONE.plus(1),
            cancelable: true,
          },
          true,
          {
            ...market,
            boostedRaisedAmount: valueToBigNumber('89.5'),
          },
        ).toString(),
      ).toBe('10.5')
    })
    test('return 10% boosted amount with limit price and no cancelable option', () => {
      expect(
        calcEstimatedAmount(
          {
            amount: valueToBigNumber(10),
            limitPrice: BN_ONE.plus(1),
            cancelable: false,
          },
          false,
          {
            ...market,
            boostedRaisedAmount: valueToBigNumber('89'),
          },
        ).toString(),
      ).toBe('11')
    })
    test('return 15% boosted amount with no limit price and no cancelable option', () => {
      expect(
        calcEstimatedAmount(
          { amount: valueToBigNumber(10), cancelable: false },
          true,
          {
            ...market,
            boostedRaisedAmount: valueToBigNumber('88.5'),
          },
        ).toString(),
      ).toBe('11.5')
    })
    test('return 0 if bid amount is 0', () => {
      expect(
        calcEstimatedAmount({ amount: BN_ZERO }, false, market).toString(),
      ).toBe(BN_ZERO.toString())
      expect(
        calcEstimatedAmount(
          { amount: BN_ZERO },
          false,
          marketWithoutBids,
        ).toString(),
      ).toBe(BN_ZERO.toString())
    })
    test('return 0 if limit price is lower than current', () => {
      expect(
        calcEstimatedAmount({ amount: BN_ONE, limitPrice: BN_ONE }, false, {
          ...market,
          currentEstimatedPrice: BN_ONE.plus(0.1),
        }).toString(),
      ).toBe(BN_ZERO.toString())
    })
    test('calculated by subtracting current bid', () => {
      expect(
        calcEstimatedAmount(
          {
            amount: market.boostedRaisedAmount,
            limitPrice: BN_ONE,
            cancelable: true,
          },
          false,
          market,
          {
            amount: market.boostedRaisedAmount,
            limitPrice: BN_ONE,
            cancelable: true,
          },
        ).toString(),
      ).toBe(market.maxAmount.toString())
    })
  })
  describe('validate', () => {
    const inWallet = BN_HUNDRED
    describe('new', () => {
      const validBid = {
        amount: BN_ONE,
      }
      test('return undefined if valid', () => {
        expect(validate(validBid, true, inWallet)).toBeUndefined()
      })
      test('return "Enter Amount" if input amount is zero', () => {
        expect(validate({ amount: BN_ZERO }, true, inWallet)).toBe(
          'Enter Amount',
        )
      })
      test('return "Enter Amount" if input amount is zero', () => {
        expect(validate({ amount: BN_ZERO }, true, inWallet)).toBe(
          'Enter Amount',
        )
      })
      test('return "Enter Limit Price" if not noLimitPriceEnabled  and Limit Price is zero or empty', () => {
        expect(validate(validBid, false, inWallet)).toBe('Enter Limit Price')
        expect(
          validate({ ...validBid, limitPrice: BN_ZERO }, false, inWallet),
        ).toBe('Enter Limit Price')
      })
      test('return "Enter Limit Price" if not noLimitPriceEnabled  and Limit Price is zero or empty', () => {
        expect(validate(validBid, false, inWallet)).toBe('Enter Limit Price')
        expect(
          validate({ ...validBid, limitPrice: BN_ZERO }, false, inWallet),
        ).toBe('Enter Limit Price')
      })
      test('return "No Balance to Bid" if the balance less than the bid amount', () => {
        expect(validate(validBid, true, BN_ZERO)).toBe('No Balance to Bid')
      })
    })
    describe('update', () => {
      test('return undefined if Amount is updated larger', () => {
        expect(
          validate({ amount: BN_ONE.plus(BN_ONE) }, true, inWallet, {
            amount: BN_ONE,
          }),
        ).toBeUndefined()
      })
      test('return undefined if Limit Price is updated higher', () => {
        expect(
          validate({ amount: BN_ONE, limitPrice: BN_ONE }, false, inWallet, {
            amount: BN_ONE,
            limitPrice: BN_ONE.div(2),
          }),
        ).toBeUndefined()
      })
      test('return undefined if Limit Price removed', () => {
        expect(
          validate({ amount: BN_ONE.plus(BN_ONE) }, true, inWallet, {
            amount: BN_ONE,
            limitPrice: BN_ONE,
          }),
        ).toBeUndefined()
      })
      test('return "Only Allowed to Add Bid" if new Amount is smaller', () => {
        expect(
          validate({ amount: BN_ONE }, true, inWallet, {
            amount: BN_ONE.plus(BN_ONE),
          }),
        ).toBe('Only Allowed to Add Bid')
      })
      test('return "Only Allowed to Raise or Disable Limit Price" if new Limit Price is lower', () => {
        expect(
          validate(
            { amount: BN_ONE, limitPrice: BN_ONE.div(2) },
            false,
            inWallet,
            {
              amount: BN_ONE,
              limitPrice: BN_ONE,
            },
          ),
        ).toBe('Only Allowed to Raise or Disable Limit Price')
      })
      test('return "Limit Price cannot be added" if Limit Price not set', () => {
        expect(
          validate({ amount: BN_ONE }, false, inWallet, { amount: BN_ONE }),
        ).toBe('Limit Price cannot be added')
      })
      test('return "Cancelable or not is unchangeable" if cancelable changed', () => {
        expect(
          validate({ amount: BN_ONE, cancelable: true }, true, inWallet, {
            amount: BN_ONE,
            cancelable: false,
          }),
        ).toBe('Cancelable or not is unchangeable')
      })
      test('return "Nothing Changed" if input not changed', () => {
        expect(
          validate({ amount: BN_ONE }, true, inWallet, { amount: BN_ONE }),
        ).toBe('Nothing Changed')
        expect(
          validate({ amount: BN_ONE, limitPrice: BN_ONE }, false, inWallet, {
            amount: BN_ONE,
            limitPrice: BN_ONE,
          }),
        ).toBe('Nothing Changed')
      })
      test('return "No Balance to Add Bid" if the balance less than the additional bid amount', () => {
        expect(
          validate({ amount: BN_ONE.plus(1.1) }, true, BN_ONE, {
            amount: BN_ONE,
          }),
        ).toBe('No Balance to Add Bid')
      })
    })
    describe('cancel', () => {
      test('return "undefined" if current bid is cancelable', () => {
        expect(
          validate({ amount: BN_ONE }, true, inWallet, {
            amount: BN_ONE,
            cancelable: true,
          }),
        ).toBeUndefined()
      })
    })
  })
})
