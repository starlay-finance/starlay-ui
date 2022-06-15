import { t } from '@lingui/macro'
import {
  BigNumber,
  valueToBigNumber,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import dayjs, { Dayjs } from 'dayjs'
import { useState, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { RatioControl } from 'src/components/parts/Modal/parts/RatioControl'
import { ASSETS_DICT } from 'src/constants/assets'
import { blue, darkRed, lightYellow } from 'src/styles/colors'
import {
  SECONDS_OF_DAY,
  SECONDS_OF_MONTH,
  SECONDS_OF_YEAR,
} from 'src/utils/date'
import { BN_ZERO, formatAmt, formattedToBigNumber } from 'src/utils/number'
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
  lock: (
    amount: BigNumber,
    duration: number,
    mode?: 'amount' | 'duration',
  ) => Promise<any>
  balances: Record<TabType, BigNumber>
  current?: {
    locked: BigNumber
    lockedEnd: Dayjs
  }
  mode?: 'amount' | 'duration'
}

export const LockModalBody: VFC<LockModalBodyProps> = ({
  balances,
  mode,
  current,
  lock,
}) => {
  const [lockAmount, setLockAmount] = useState(
    current && mode === 'duration' ? formatAmt(current.locked) : '',
  )
  const [lockDuration, setLockDuration] = useState<BigNumber>(
    current
      ? valueToBigNumber(current.lockedEnd.unix() - dayjs().unix())
      : valueToBigNumber(DURATION_LIST[0].value),
  )
  const [activeTab, setActiveTab] = useState<TabType>('wallet')

  const lockAmountBn = formattedToBigNumber(lockAmount) || BN_ZERO
  return (
    <ContentDiv>
      <AmountInput
        value={lockAmount}
        onChange={setLockAmount}
        setMaxValue={() => setLockAmount(formatAmt(balances[activeTab]))}
        significantDigits={WEI_DECIMALS}
        disabled={mode === 'duration'}
      />
      <ActionTab
        tabs={mode !== 'duration' ? TABS : []}
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
            formatCustomValue={(num) =>
              `Until: ${dayjs().add(num.toNumber(), 's').format('DD/MM/YYYY')}`
            }
            step={SECONDS_OF_DAY}
            sliderColors={[blue, lightYellow, darkRed]}
            customLabel={t`Custom`}
            disabled={mode === 'amount'}
          />
        </NumberItems>
        <SimpleCtaButton
          onClick={() => lock(lockAmountBn, lockDuration.toNumber(), mode)}
          disabled={!lockAmountBn.gt(BN_ZERO) || !lockDuration.gt(BN_ZERO)}
        >
          {mode === 'amount'
            ? t`Add`
            : mode === 'duration'
            ? t`Extend`
            : t`Lock`}
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
