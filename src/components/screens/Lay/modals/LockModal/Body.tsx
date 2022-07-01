import { t } from '@lingui/macro'
import {
  BigNumber,
  valueToBigNumber,
  WEI_DECIMALS,
} from '@starlay-finance/math-utils'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState, VFC } from 'react'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { RatioControl } from 'src/components/parts/Modal/parts/RatioControl'
import { ASSETS_DICT } from 'src/constants/assets'
import { blue, darkRed, lightYellow } from 'src/styles/colors'
import {
  SECONDS_OF_MONTH,
  SECONDS_OF_WEEK,
  SECONDS_OF_YEAR,
  truncateWith,
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
    from: TabType,
    amount: BigNumber,
    duration: number,
    mode?: 'amount' | 'duration',
  ) => Promise<any>
  inWallet: BigNumber
  current?: {
    locked: BigNumber
    lockedEnd: Dayjs
  }
  mode?: 'amount' | 'duration'
  vesting?: Record<
    Exclude<TabType, 'wallet'>,
    { lockable: BigNumber; vestingEnd: Dayjs }
  >
}

export const LockModalBody: VFC<LockModalBodyProps> = ({
  mode,
  current,
  inWallet,
  vesting,
  lock,
}) => {
  const [lockAmount, setLockAmount] = useState(
    current && mode === 'duration' ? formatAmt(current.locked) : '',
  )
  const [lockDuration, setLockDuration] = useState<BigNumber>(
    current
      ? valueToBigNumber(current.lockedEnd.diff(dayjs(), 's'))
      : valueToBigNumber(DURATION_LIST[0].value),
  )
  const [activeTab, setActiveTab] = useState<TabType>('wallet')
  const lockAmountBn = formattedToBigNumber(lockAmount) || BN_ZERO
  const lockable = useMemo(() => {
    if (activeTab === 'wallet') return inWallet
    return vesting ? vesting[activeTab].lockable : BN_ZERO
  }, [activeTab, vesting, inWallet])

  const { label, error } = validate(
    mode,
    activeTab,
    lockAmountBn,
    lockDuration.toNumber(),
    lockable,
    vesting,
  )

  return (
    <ContentDiv>
      <AmountInput
        value={lockAmount}
        onChange={setLockAmount}
        setMaxValue={() => setLockAmount(formatAmt(lockable))}
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
            setValue={(v) =>
              setLockDuration(
                valueToBigNumber(truncateWith(v.toNumber(), SECONDS_OF_WEEK)),
              )
            }
            current={lockDuration}
            min={
              activeTab !== 'wallet' && vesting
                ? vesting[activeTab].vestingEnd.diff(dayjs(), 's')
                : current
                ? current?.lockedEnd.diff(dayjs(), 's')
                : undefined
            }
            max={valueToBigNumber(
              DURATION_LIST[DURATION_LIST.length - 1].value,
            )}
            formatCustomValue={(num) =>
              `Until: ${dayjs().add(num.toNumber(), 's').format('DD/MM/YYYY')}`
            }
            step={SECONDS_OF_WEEK}
            sliderColors={[blue, lightYellow, darkRed]}
            customLabel={t`Custom`}
            disabled={mode === 'amount'}
          />
        </NumberItems>
        <SimpleCtaButton
          onClick={() =>
            lock(activeTab, lockAmountBn, lockDuration.toNumber(), mode)
          }
          disabled={
            !!error || !lockAmountBn.gt(BN_ZERO) || !lockDuration.gt(BN_ZERO)
          }
        >
          {error || label}
        </SimpleCtaButton>
        <Balance
          label={t`Available`}
          balance={lockable}
          symbol={ASSETS_DICT.LAY.symbol}
        />
      </Action>
    </ContentDiv>
  )
}
const validate = (
  mode: string | undefined,
  type: TabType,
  amount: BigNumber,
  duration: number,
  lockable: BigNumber,
  vesting: LockModalBodyProps['vesting'],
) => {
  if (
    type !== 'wallet' &&
    vesting &&
    mode !== 'duration' &&
    vesting[type].vestingEnd.isAfter(dayjs().add(duration, 's'))
  )
    return { error: t`extend lock period later than vesting end` }
  if (mode === 'duration') return { label: t`Extend` }
  if (amount.lte(0)) return { error: t`Enter amount` }
  if (amount.gt(lockable)) return { error: t`No balance to lock` }
  if (mode === 'amount') {
    return { label: t`Add` }
  }
  if (mode === 'duration') return { label: t`Extend` }
  return { label: t`Lock` }
}

const DURATION_LIST = [
  { label: '1 Month', value: SECONDS_OF_MONTH },
  { label: '3 Months', value: SECONDS_OF_MONTH * 3 },
  { label: '6 Months', value: SECONDS_OF_MONTH * 6 },
  { label: '1 Year', value: SECONDS_OF_YEAR },
  { label: '2 Year', value: SECONDS_OF_YEAR * 2 },
]

const ActionTab: TabFC = Tab
