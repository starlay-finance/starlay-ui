import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useState, VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { GlassModalContent } from 'src/components/parts/Modal/base/Content/Glass'
import { Toggle } from 'src/components/parts/Toggle'
import { ASSETS_DICT } from 'src/constants/assets'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import {
  darkRed,
  gray,
  lightBlack,
  skyBlue,
  trueBlack,
  trueWhite,
} from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
} from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { Asset } from 'src/types/models'
import {
  BN_ONE,
  BN_ZERO,
  formatAmt,
  formatPct,
  formattedToBigNumber,
  parseInput,
} from 'src/utils/number'
import styled, { css } from 'styled-components'
import { Bid } from './types'
import { calcBoost } from './utils'

type BiddingModalProps = {
  receivingAsset: Asset
  maxAmount: BigNumber
  boostedRaisedAmount?: BigNumber
  currentEstimatedPrice?: BigNumber
  bid?: Bid
}
const BiddingModal: VFC<ModalContentProps & BiddingModalProps> = ({
  close,
  receivingAsset,
  maxAmount,
  boostedRaisedAmount = BN_ZERO,
  currentEstimatedPrice = BN_ZERO,
  bid,
}) => {
  const biddingAsset = { ...ASSETS_DICT.USDC, decimals: 6 }
  const [amount, setAmount] = useState(bid?.amount.toString() || '')
  const [noPriceLimitEnabled, setNoPriceLimitEnabled] = useState(
    !bid?.limitPrice,
  )
  const [limitPrice, setLimitPrice] = useState(
    bid?.limitPrice?.toString() || '',
  )
  const [cancelable, setCancelable] = useState(bid?.cancelable)
  const boost = calcBoost({
    limitPrice: noPriceLimitEnabled ? undefined : BN_ZERO,
    cancelable,
  })
  const amountBn =
    (amount && formattedToBigNumber(amount)?.times(BN_ONE.plus(boost))) ||
    BN_ZERO
  const estimatedAmount =
    !amountBn.isZero() &&
    (noPriceLimitEnabled || currentEstimatedPrice.lte(limitPrice))
      ? amountBn.div(amountBn.plus(boostedRaisedAmount)).times(maxAmount)
      : BN_ZERO
  return (
    <GlassModalContent closeModal={close}>
      <Title>
        <p>{t`Bid on ${receivingAsset.symbol}`}</p>
      </Title>
      <CurrentPriceDiv>
        <div>
          <p>{t`Current Estimated Price`}</p>
          <CurrentPrice>
            <div />
            <div />
            <div>
              <Image
                src={receivingAsset.icon}
                alt={receivingAsset.symbol}
                width={32}
                height={32}
              />
              <span>{`= ${formatAmt(currentEstimatedPrice, {
                prefix: '$',
                decimalPlaces: 2,
              })}`}</span>
            </div>
          </CurrentPrice>
        </div>
      </CurrentPriceDiv>
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
            <input
              placeholder="0.00"
              value={amount}
              onChange={({ target: { value } }) => {
                const parsed = parseInput(value, biddingAsset.decimals)
                if (parsed == null) return
                setAmount(parsed)
              }}
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
                <input
                  placeholder="0.00"
                  value={limitPrice}
                  onChange={({ target: { value } }) => {
                    const parsed = parseInput(value, biddingAsset.decimals)
                    if (parsed == null) return
                    setLimitPrice(parsed)
                  }}
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
    </GlassModalContent>
  )
}

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 22px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px) brightness(1.15);

  font-size: 18px;
  font-weight: ${fontWeightBold};
  text-align: center;
`

const ToggleDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 12px;
  ${Toggle} {
    background-color: ${gray};
  }
`
const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${trueBlack}52;

  font-size: 18px;
  font-weight: ${fontWeightRegular};
  input {
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const toggleEnabledStyle = css`
  background: linear-gradient(105deg, ${darkRed}, ${skyBlue});
`
const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  :not(:last-child) {
    border-bottom: 1px solid ${trueWhite}29;
  }
  > * {
    :first-child {
    }
    :last-child {
      text-align: right;
    }
  }
`
const FormItemMulti = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${trueWhite}29;
  ${FormItem} {
    padding-bottom: 0;
    border-bottom: none;
    :not(:first-child) {
      padding-top: 20px;
    }
  }
`

const FormDiv = styled.div`
  padding: 0 32px 32px;
  ${Button} {
    margin-top: 32px;
  }
`

const Title = styled.div`
  text-align: center;
  p {
    padding: 32px;
    font-weight: ${fontWeightMedium};
    font-size: 24px;
  }
`

const CurrentPrice = styled.div`
  position: relative;
  padding: 14px 22px;
  border-radius: 14px;
  > div:not(:last-child) {
    position: absolute;
    inset: 0;
  }
  > div:nth-child(1) {
    border-radius: 4px;
    background: linear-gradient(90deg, ${darkRed}, ${skyBlue});
    filter: blur(8px);
  }
  > div:nth-child(2) {
    border-radius: 14px;
    background: ${lightBlack};
  }
  > div:last-child {
    position: relative;
    ${flexCenter};
    column-gap: 10px;
    svg {
      width: 32px;
      height: 32px;
    }
    span {
      font-size: 22px;
      font-weight: ${fontWeightRegular};
    }
  }
`

const CurrentPriceDiv = styled.div`
  background-color: ${trueBlack}52;
  > div {
    ${flexCenter};
    flex-direction: column;
    row-gap: 32px;
    padding: 40px;
  }
`

export const useBiddingModal = () => useModalDialog(BiddingModal)
