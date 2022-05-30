import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { utils } from 'ethers'
import { useState, VFC } from 'react'
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
import { GAS_GUIDE_URL } from 'src/utils/routes'
import styled from 'styled-components'
import { Item } from '../parts/Item'

export type GasSettingsModalBodyProps = {
  inWallet: BigNumber
  symbol: string
  current: BigNumber
  save: (ratio: BigNumber) => void
  baseGasPrice: BigNumber | undefined
}

export const GasSettingsModalBody: VFC<GasSettingsModalBodyProps> = ({
  current,
  save,
  inWallet,
  symbol,
  baseGasPrice,
}) => {
  const [value, setValue] = useState(current)
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
          <RatioControl
            label={t`Speed`}
            options={GAS_OPTIONS}
            setValue={setValue}
            current={value}
            max={MAX_GAS_RATIO}
            step={0.1}
            sliderColors={[positive, success]}
            customLabel={t`Custom Speed`}
            tooltip={t`"Standard" speed refers to the median Gas Fee of the past few blocks.`}
          />
          <Item
            label={t`Gas Fee`}
            value={
              baseGasPrice
                ? `${utils.formatUnits(
                    baseGasPrice.times(value).shiftedBy(18).toString(),
                    'gwei',
                  )} GWEI`
                : '-'
            }
          />
        </NumberItems>
        <SimpleCtaButton onClick={() => save(value)}>{t`SET`}</SimpleCtaButton>
        <Balance label={t`Wallet Balance`} balance={inWallet} symbol={symbol} />
      </Action>
    </ContentDiv>
  )
}

const MAX_GAS_RATIO = valueToBigNumber('50')

const GAS_OPTIONS = [
  { label: t`Standard`, value: 1 },
  { label: t`Fast`, value: 2 },
  { label: t`Very Fast`, value: 5 },
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
