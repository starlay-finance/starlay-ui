import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { Reel } from 'src/components/parts/Number/Reel'
import { Toggle } from 'src/components/parts/Toggle'
import { Asset, ERC20Asset } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
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
  biddingAssets: ERC20Asset[]
  maxAmount: BigNumber
  boostedRaisedAmount: BigNumber
  currentEstimatedPrice: BigNumber
  currentBid?: Bid
  submit: (bid: Bid & { asset: EthereumAddress }) => any
}

export const BiddingForm: VFC<BiddingFormProps> = (props) => {
  const biddingAsset = props.biddingAssets[0]
  const { currentBid, receivingAsset } = props
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
    submit,
    error,
  } = useBiddingForm(props)
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
            disabled={currentBid?.cancelable}
          />
        </InputDiv>
      </FormItem>
      <FormItemMulti>
        <FormItem>
          <label>{t`Get 5% Boost without Price Limit`}</label>
          <ToggleDiv>
            {noPriceLimitEnabled ? t`ON` : t`OFF`}
            <Toggle
              checked={noPriceLimitEnabled}
              onClick={() => setNoPriceLimitEnabled(!noPriceLimitEnabled)}
              checkedStyle={toggleEnabledStyle}
              disabled={
                currentBid?.cancelable || (currentBid && !currentBid.limitPrice)
              }
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
                disabled={currentBid?.cancelable}
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
            checked={!cancelable}
            onClick={() => setCancelable(!cancelable)}
            checkedStyle={toggleEnabledStyle}
            disabled={!!currentBid}
          />
        </ToggleDiv>
      </FormItem>
      <FormItem>
        <label>{t`Boost`}</label>
        <div>
          <Reel text={`+${formatPct(boost)}`} />
        </div>
      </FormItem>
      <FormItem>
        <label>{t`Current Estimated Amount`}</label>
        <div>
          <Reel
            text={formatAmt(estimatedAmount, {
              symbol: receivingAsset.symbol,
              decimalPlaces: 2,
              roundingMode: BigNumber.ROUND_FLOOR,
            })}
          />
        </div>
      </FormItem>
      <Button onClick={submit} disabled={!!error}>
        {error || (currentBid?.cancelable ? t`Cancel` : t`Bid`)}
      </Button>
    </FormDiv>
  )
}
