import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { utils } from 'ethers'
import { FC, useState } from 'react'
import { Link } from 'src/components/elements/Link'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { RatioControl } from 'src/components/parts/Modal/parts/RatioControl'
import {
  Action,
  Balance,
  ContentDiv,
  NumberItems,
} from 'src/components/screens/Dashboard/modals/parts'
import { positive, purple, success } from 'src/styles/colors'
import { BN_ONE } from 'src/utils/number'
import { GAS_GUIDE_URL } from 'src/utils/routes'
import styled from 'styled-components'
import { Item } from '../parts/Item'

export type GasSettingsModalBodyProps = {
  inWallet: BigNumber
  symbol: string
  currentMultiplier: BigNumber | undefined
  currentManualValue: BigNumber | undefined
  save: (
    multiplier: BigNumber | undefined,
    manual: BigNumber | undefined,
  ) => void
  baseGasPrice: BigNumber | undefined
}

export const GasSettingsModalBody: FC<GasSettingsModalBodyProps> = ({
  currentMultiplier,
  currentManualValue,
  save,
  inWallet,
  symbol,
  baseGasPrice,
}) => {
  const [multiplier, setMultiplier] = useState(currentMultiplier)
  const [manualValue, setManualValue] = useState(currentManualValue)
  return (
    <ContentDiv>
      <Description>
        {t`You can set Gas Fee for all transactions on Starlay Finance.
The higher Gas Fee, the more chance for your transaction to be confirmed.`}
        <Trans
          id="For more about Gas Fee, please click <0>here</0>."
          components={[<Link key="0" href={GAS_GUIDE_URL} />]}
        />
      </Description>
      <Action>
        <NumberItems>
          {!manualValue ? (
            <RatioControl
              label={t`Speed`}
              options={GAS_OPTIONS}
              setValue={setMultiplier}
              onCustomActive={() => setManualValue(BN_ONE)}
              current={multiplier || BN_ONE}
              max={MAX_GAS_RATIO}
              step={0.1}
              sliderColors={[positive, success]}
              customLabel={t`Manual Gas Fee`}
              customButtonLabel={t`Manual`}
              tooltip={t`"Standard" speed refers to the median Gas Fee of the past few blocks.`}
              showValueOnCustom={false}
            />
          ) : (
            <RatioControl
              label={t`Speed`}
              options={[{ value: 0 }]}
              setValue={setManualValue}
              onCustomInactive={() => setManualValue(undefined)}
              current={manualValue}
              max={MAX_GAS_RATIO}
              step={0.1}
              sliderColors={[positive, success]}
              customLabel={t`Manual Gas Fee`}
              customButtonLabel={t`Manual`}
              showValueOnCustom={false}
            />
          )}
          <Item
            label={!manualValue ? t`Current Gas Fee` : t`Manual Gas Fee`}
            value={
              baseGasPrice
                ? `${utils.formatUnits(
                    (
                      manualValue?.shiftedBy(9) ||
                      baseGasPrice.times(multiplier || BN_ONE)
                    ).toString(),
                    'gwei',
                  )} GWEI`
                : '-'
            }
          />
        </NumberItems>
        <SimpleCtaButton
          onClick={() => save(multiplier, manualValue)}
        >{t`SET`}</SimpleCtaButton>
        <Balance label={t`Wallet Balance`} balance={inWallet} symbol={symbol} />
      </Action>
    </ContentDiv>
  )
}

const MAX_GAS_RATIO = valueToBigNumber('50')

const GAS_OPTIONS = [
  { label: t`Standard`, value: 1 },
  { label: t`Fast`, value: 1.25 },
  { label: t`Very Fast`, value: 1.5 },
]

const Description = styled.p`
  padding: 0 32px 48px;
  border-bottom: 3px solid ${purple};
  text-align: center;
  white-space: pre-wrap;
  a {
    color: ${purple};
  }
`
