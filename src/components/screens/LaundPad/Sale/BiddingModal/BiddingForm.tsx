import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { Toggle } from 'src/components/parts/Toggle'
import { ASSETS_DICT } from 'src/constants/assets'
import { Asset } from 'src/types/models'
import { formatAmt, formatPct } from 'src/utils/number'
import { Bid } from '../../types'
import {
  AmountInput,
  Button,
  FormDiv,
  FormItem,
  FormItemMulti,
  InputDiv,
  ToggleDiv,
  toggleEnabledStyle,
} from './parts'
import { useBiddingForm } from './useBiddingForm'

type BiddingFormProps = {
  receivingAsset: Asset
  maxAmount: BigNumber
  boostedRaisedAmount: BigNumber
  currentEstimatedPrice: BigNumber
  bid?: Bid
}

export const BiddingForm: VFC<BiddingFormProps> = ({
  receivingAsset,
  maxAmount,
  boostedRaisedAmount,
  currentEstimatedPrice,
  bid,
}) => {
  const biddingAsset = { ...ASSETS_DICT.USDC, decimals: 6 }
  const {
    amount,
    setAmount,
    noPriceLimitEnabled,
    setNoPriceLimitEnabled,
    limitPrice,
    setLimitPrice,
    cancelable,
    setCancelable,
    boost,
    estimatedAmount,
  } = useBiddingForm({
    maxAmount,
    boostedRaisedAmount,
    currentEstimatedPrice,
    bid,
  })
  return (
    <FormDiv>
      <FormItem>
        <label>Amount</label>
        <InputDiv>
          <Image
            src={biddingAsset.icon}
            alt={biddingAsset.symbol}
            width={24}
            height={24}
          />
          <AmountInput
            value={amount}
            decimals={biddingAsset.decimals}
            step={1}
            placeholder="0.00"
            onChange={setAmount}
          />
        </InputDiv>
      </FormItem>
      <FormItemMulti>
        <FormItem>
          <label>{t`Get 5% Boost without Price Limit`}</label>
          <ToggleDiv>
            {noPriceLimitEnabled ? t`ON` : t`OFF`}
            <Toggle
              enabled={noPriceLimitEnabled}
              onClick={() => setNoPriceLimitEnabled(!noPriceLimitEnabled)}
              enabledStyle={toggleEnabledStyle}
            />
          </ToggleDiv>
        </FormItem>
        {!noPriceLimitEnabled && (
          <FormItem>
            <label>{t`Price Limit`}</label>
            <InputDiv>
              <div>$</div>
              <AmountInput
                value={limitPrice}
                decimals={biddingAsset.decimals}
                step={0.01}
                placeholder="0.00"
                onChange={setLimitPrice}
              />
            </InputDiv>
          </FormItem>
        )}
      </FormItemMulti>
      <FormItem>
        <label>{t`Get 10% Boost without Cancel`}</label>
        <ToggleDiv>
          {!cancelable ? t`ON` : t`OFF`}
          <Toggle
            enabled={!cancelable}
            onClick={() => setCancelable(!cancelable)}
            enabledStyle={toggleEnabledStyle}
          />
        </ToggleDiv>
      </FormItem>
      <FormItem>
        <label>{t`Boost`}</label>
        <div>{boost ? `+${formatPct(boost)}` : '0%'}</div>
      </FormItem>
      <FormItem>
        <label>{t`Current Estimated Amount`}</label>
        <div>
          {formatAmt(estimatedAmount, {
            symbol: receivingAsset.symbol,
            decimalPlaces: 2,
            roundingMode: BigNumber.ROUND_FLOOR,
          })}
        </div>
      </FormItem>
      <Button>{t`Bid`}</Button>
    </FormDiv>
  )
}
