import { valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetMarketData, User } from 'src/types/models'
import { MOCK_ASSET_MARKET } from 'src/__mocks__/dashboard'
import { ValueOf } from 'type-fest'
import { EMPTY_BALANCE_BY_ASSET } from './assets'
import { calculateAssetPL, calculateNetAPY } from './calculator'
import { BN_HUNDRED, BN_ONE, BN_ZERO } from './number'

describe('calculator', () => {
  describe('calculateAssetPL', () => {
    const marketReferenceCurrencyPriceInUSD = valueToBigNumber('10')
    const rewardPriceInMarketReferenceCurrency = valueToBigNumber('20')

    const mockBalance: ValueOf<User['balanceByAsset']> = {
      deposited: BN_ZERO,
      borrowed: BN_ZERO,
      usageAsCollateralEnabled: true,
    }
    test('profit should be deposited amount multiplied by apy', () => {
      const balance: ValueOf<User['balanceByAsset']> = {
        ...mockBalance,
        deposited: BN_HUNDRED,
      }
      const asset: AssetMarketData = {
        ...MOCK_ASSET_MARKET,
        symbol: 'ASTR',
        priceInMarketReferenceCurrency: valueToBigNumber('2'),
        depositAPY: valueToBigNumber('0.1'),
      }
      const result = calculateAssetPL(
        balance,
        asset,
        marketReferenceCurrencyPriceInUSD,
      )
      expect(result.profitInUSD.toString()).toBe('200')
    })
    test('loss should be borrowed amount multiplied by apy', () => {
      const balance: ValueOf<User['balanceByAsset']> = {
        ...mockBalance,
        borrowed: BN_HUNDRED,
      }
      const asset: AssetMarketData = {
        ...MOCK_ASSET_MARKET,
        symbol: 'ASTR',
        priceInMarketReferenceCurrency: valueToBigNumber('2'),
        variableBorrowAPY: valueToBigNumber('0.1'),
      }
      const result = calculateAssetPL(
        balance,
        asset,
        marketReferenceCurrencyPriceInUSD,
      )
      expect(result.lossInUSD.toString()).toBe('200')
    })
    test('reward should be sum of deposited amount and borrowed amount multiplied by the respective incentive apr', () => {
      const balance: ValueOf<User['balanceByAsset']> = {
        ...mockBalance,
        deposited: BN_HUNDRED,
        borrowed: BN_ONE,
      }
      const asset: AssetMarketData = {
        ...MOCK_ASSET_MARKET,
        symbol: 'ASTR',
        priceInMarketReferenceCurrency: valueToBigNumber('20'),
        depositIncentiveAPR: valueToBigNumber('0.1'),
        variableBorrowIncentiveAPR: valueToBigNumber('0.2'),
      }
      const result = calculateAssetPL(
        balance,
        asset,
        marketReferenceCurrencyPriceInUSD,
      )
      expect(result.rewardInUSD.toString()).toBe('2040')
    })
    test('reward should be zero if apr is not finite', () => {
      const balance: ValueOf<User['balanceByAsset']> = {
        ...mockBalance,
        deposited: BN_HUNDRED,
        borrowed: BN_ONE,
      }
      const asset: AssetMarketData = {
        ...MOCK_ASSET_MARKET,
        symbol: 'ASTR',
        depositIncentiveAPR: valueToBigNumber('Infinity'),
        variableBorrowIncentiveAPR: valueToBigNumber('Infinity'),
      }
      const result = calculateAssetPL(
        balance,
        asset,
        marketReferenceCurrencyPriceInUSD,
      )
      expect(result.rewardInUSD.toString()).toBe('0')
    })
  })
  describe('calculateNetAPY', () => {
    test('net apy should be division between sum of profit, reward, loss and total deposited', () => {
      const balance: ValueOf<User['balanceByAsset']> = {
        deposited: BN_HUNDRED,
        borrowed: BN_ONE,
        usageAsCollateralEnabled: true,
      }
      const balanceByAsset: User['balanceByAsset'] = {
        ...EMPTY_BALANCE_BY_ASSET,
        ASTR: balance,
        USDC: balance,
      }
      const marketReferenceCurrencyPriceInUSD = valueToBigNumber('10')
      const astrPriceInMarketReferenceCurrency = valueToBigNumber('2')
      const usdcPriceInMarketReferenceCurrency = valueToBigNumber('4')
      const asset: AssetMarketData = {
        ...MOCK_ASSET_MARKET,
        priceInMarketReferenceCurrency: astrPriceInMarketReferenceCurrency,
        depositAPY: valueToBigNumber('0.1'),
        depositIncentiveAPR: valueToBigNumber('0.1'),
        variableBorrowAPY: valueToBigNumber('0.2'),
        variableBorrowIncentiveAPR: valueToBigNumber('0.2'),
      }
      const assets: AssetMarketData[] = [
        { ...asset, symbol: 'ASTR' },
        {
          ...asset,
          symbol: 'USDC',
          priceInMarketReferenceCurrency: usdcPriceInMarketReferenceCurrency,
        },
      ]
      const totalDepositedInUSD = balanceByAsset.ASTR.deposited
        .multipliedBy(astrPriceInMarketReferenceCurrency)
        .multipliedBy(marketReferenceCurrencyPriceInUSD)
        .plus(
          balanceByAsset.USDC.deposited
            .multipliedBy(usdcPriceInMarketReferenceCurrency)
            .multipliedBy(marketReferenceCurrencyPriceInUSD),
        )
      const result = calculateNetAPY(
        balanceByAsset,
        assets,
        marketReferenceCurrencyPriceInUSD,
        totalDepositedInUSD,
      )
      expect(result.toFixed(4)).toBe('0.2000')
    })
  })
})
