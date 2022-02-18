import { valueToBigNumber } from '@starlay-finance/math-utils'
import { formatAmt } from './number'

describe('number', () => {
  describe('formatAmt', () => {
    test('add comma every 3 digits', () => {
      expect(formatAmt(valueToBigNumber(100000000000))).toBe('100,000,000,000')
    })
    test('add symbol suffix if given', () => {
      expect(formatAmt(valueToBigNumber(1), { symbol: 'LAY' })).toBe('1 LAY')
    })
    test('format to fixed num of decimals by round if given', () => {
      expect(formatAmt(valueToBigNumber(1), { decimalPlaces: 2 })).toBe('1.00')
      expect(formatAmt(valueToBigNumber(1.014), { decimalPlaces: 2 })).toBe(
        '1.01',
      )
      expect(formatAmt(valueToBigNumber(1.015), { decimalPlaces: 2 })).toBe(
        '1.02',
      )
    })
    test('shorten if formatted length exceeds the given value', () => {
      expect(
        formatAmt(valueToBigNumber(1000), { shorteningThreshold: 6 }),
      ).toBe('1,000')
      expect(
        formatAmt(valueToBigNumber(10000), { shorteningThreshold: 6 }),
      ).toBe('10.00K')
      expect(
        formatAmt(valueToBigNumber(100000), { shorteningThreshold: 6 }),
      ).toBe('100.00K')
      expect(
        formatAmt(valueToBigNumber(10.0001), { shorteningThreshold: 6 }),
      ).toBe('10.000')
      expect(
        formatAmt(valueToBigNumber(8888.88888), { shorteningThreshold: 10 }),
      ).toBe('8,888.8888')
      expect(
        formatAmt(valueToBigNumber(10.0001), {
          shorteningThreshold: 6,
          decimalPlaces: 5,
        }),
      ).toBe('10.000')
      expect(
        formatAmt(valueToBigNumber(0.0001), { shorteningThreshold: 6 }),
      ).toBe('0.0001')
      expect(
        formatAmt(valueToBigNumber(0.00009), { shorteningThreshold: 6 }),
      ).toBe('> 0.0001')
      expect(
        formatAmt(valueToBigNumber(0.0001), {
          shorteningThreshold: 6,
          decimalPlaces: 2,
        }),
      ).toBe('0.00')
      expect(formatAmt(valueToBigNumber(0.00009))).toBe('0.00009')
      expect(formatAmt(valueToBigNumber(0), { decimalPlaces: 2 })).toBe('0.00')
    })
  })
})
