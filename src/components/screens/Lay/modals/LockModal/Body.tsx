import { t } from '@lingui/macro'
import {
  BigNumber,
  valueToBigNumber,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import { useState, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { RatioControl } from 'src/components/parts/Modal/parts/RatioControl'
import { ASSETS_DICT } from 'src/constants/assets'
import { blue, darkRed, lightYellow, purple } from 'src/styles/colors'
import { SECONDS_OF_MONTH, SECONDS_OF_YEAR } from 'src/utils/date'
import { BN_ZERO, formatAmt, formattedToBigNumber } from 'src/utils/number'
import styled from 'styled-components'
import {
  Action,
  AmountInput,
  Balance,
  ContentDiv,
  NumberItems,
  Tab,
  TabFC,
} from '../../../Dashboard/modals/parts'

const TABS = ['wallet', 'ido', 'tokenSale'] as const
type TabType = typeof TABS[number]

export type LockModalBodyProps = {
  lock: (amount: BigNumber, duration: number) => Promise<any>
  balances: Record<TabType, BigNumber>
}

export const LockModalBody: VFC<LockModalBodyProps> = ({ balances, lock }) => {
  const [lockAmount, setLockAmount] = useState('')
  const [lockDuration, setLockDuration] = useState<BigNumber>(BN_ZERO)
  const [activeTab, setActiveTab] = useState<TabType>('wallet')

  const lockAmountBn = formattedToBigNumber(lockAmount) || BN_ZERO
  return (
    <ContentDiv>
      <AmountInput
        value={lockAmount}
        onChange={setLockAmount}
        setMaxValue={() => setLockAmount(formatAmt(balances[activeTab]))}
        significantDigits={WEI_DECIMALS}
      />
      <ActionTab
        tabs={TABS}
        contents={{
          wallet: { label: 'Wallet' },
          ido: { label: 'IDO' },
          tokenSale: { label: 'Token Sale' },
        }}
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
      />
      <Action>
        <NumberItems>
          <RatioControl
            label={t`Duration`}
            options={DURATION_LIST}
            setValue={setLockDuration}
            current={lockDuration}
            max={valueToBigNumber(
              DURATION_LIST[DURATION_LIST.length - 1].value,
            )}
            sliderColors={[blue, lightYellow, darkRed]}
            customLabel={t`Custom Duration`}
          />
        </NumberItems>
        <SimpleCtaButton
          onClick={() => lock(lockAmountBn, lockDuration.toNumber())}
          disabled={!lockAmountBn.gt(BN_ZERO) || !lockDuration.gt(BN_ZERO)}
        >
          {t`Lock`}
        </SimpleCtaButton>
        <Balance
          label={t`Available`}
          balance={balances[activeTab]}
          symbol={ASSETS_DICT.LAY.symbol}
        />
      </Action>
    </ContentDiv>
  )
}

const DURATION_LIST = [
  { label: '1 Month', value: SECONDS_OF_MONTH },
  { label: '3 Months', value: SECONDS_OF_MONTH * 3 },
  { label: '6 Months', value: SECONDS_OF_MONTH * 6 },
  { label: '1 Year', value: SECONDS_OF_YEAR },
  { label: '2 Year', value: SECONDS_OF_YEAR * 2 },
]

const ActionTab: TabFC = Tab

const Note = styled.p`
  padding-top: 24px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;
  a {
    color: ${purple};
  }
`
