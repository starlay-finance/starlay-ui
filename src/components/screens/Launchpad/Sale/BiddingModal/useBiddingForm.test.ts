import { BN_ONE, BN_ZERO } from 'src/utils/number'
import { validate } from './useBiddingForm'

describe('useBiddingForm', () => {
  describe('validate', () => {
    describe('new', () => {
      const validBid = {
        amount: BN_ONE,
      }
      test('return undefined if valid', () => {
        expect(validate(validBid, true)).toBeUndefined()
      })
      test('return "Enter Amount" if input amount is zero', () => {
        expect(validate({ amount: BN_ZERO }, true)).toBe('Enter Amount')
      })
      test('return "Enter Amount" if input amount is zero', () => {
        expect(validate({ amount: BN_ZERO }, true)).toBe('Enter Amount')
      })
      test('return "Enter Limit Price" if not noLimitPriceEnabled  and Limit Price is zero or empty', () => {
        expect(validate(validBid, false)).toBe('Enter Limit Price')
        expect(validate({ ...validBid, limitPrice: BN_ZERO }, false)).toBe(
          'Enter Limit Price',
        )
      })
      test('return "Enter Limit Price" if not noLimitPriceEnabled  and Limit Price is zero or empty', () => {
        expect(validate(validBid, false)).toBe('Enter Limit Price')
        expect(validate({ ...validBid, limitPrice: BN_ZERO }, false)).toBe(
          'Enter Limit Price',
        )
      })
    })
    describe('update', () => {
      test('return undefined if Amount is updated larger', () => {
        expect(
          validate({ amount: BN_ONE.plus(BN_ONE) }, true, { amount: BN_ONE }),
        ).toBeUndefined()
      })
      test('return undefined if Limit Price is updated higher', () => {
        expect(
          validate({ amount: BN_ONE, limitPrice: BN_ONE }, false, {
            amount: BN_ONE,
            limitPrice: BN_ONE.div(2),
          }),
        ).toBeUndefined()
      })
      test('return undefined if Limit Price removed', () => {
        expect(
          validate({ amount: BN_ONE.plus(BN_ONE) }, true, {
            amount: BN_ONE,
            limitPrice: BN_ONE,
          }),
        ).toBeUndefined()
      })
      test('return "Amount must be larger than current" if new Amount is smaller', () => {
        expect(
          validate({ amount: BN_ONE }, true, { amount: BN_ONE.plus(BN_ONE) }),
        ).toBe('Amount must be larger than current')
      })
      test('return "Limit Price must be higher than current" if new Limit Price is lower', () => {
        expect(
          validate({ amount: BN_ONE, limitPrice: BN_ONE.div(2) }, false, {
            amount: BN_ONE,
            limitPrice: BN_ONE,
          }),
        ).toBe('Limit Price must be higher than current')
      })
      test('return "Limit Price cannot be added" if Limit Price not set', () => {
        expect(validate({ amount: BN_ONE }, false, { amount: BN_ONE })).toBe(
          'Limit Price cannot be added',
        )
      })
      test('return "Cancelable or not is unchangeable" if cancelable changed', () => {
        expect(
          validate({ amount: BN_ONE, cancelable: true }, true, {
            amount: BN_ONE,
            cancelable: false,
          }),
        ).toBe('Cancelable or not is unchangeable')
      })
      test('return "No changes" if input not changed', () => {
        expect(validate({ amount: BN_ONE }, true, { amount: BN_ONE })).toBe(
          'No changes',
        )
        expect(
          validate({ amount: BN_ONE, limitPrice: BN_ONE }, false, {
            amount: BN_ONE,
            limitPrice: BN_ONE,
          }),
        ).toBe('No changes')
      })
    })
    describe('cancel', () => {
      test('return "undefined" if current bid is cancelable', () => {
        expect(
          validate({ amount: BN_ONE }, true, {
            amount: BN_ONE,
            cancelable: true,
          }),
        ).toBeUndefined()
      })
    })
  })
})
