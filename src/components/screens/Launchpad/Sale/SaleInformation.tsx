import { t } from '@lingui/macro'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { FC } from 'react'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { formatWithTZ } from 'src/utils/date'
import { formatAmt, formatPct } from 'src/utils/number'
import { ProjectData, Status } from '../types'
import { CtaButton, Information, InformationItem, Section } from './parts'

const DATE_FORMAT = 'MMM, D HH:mm z'

type SaleInformationProps = {
  token: ProjectData['token']
  information: ProjectData['sale']
  status: Status
  openBiddingModal: VoidFunction
  hasBidded?: boolean
}

export const SaleInformation: FC<SaleInformationProps> = ({
  token,
  information,
  status,
  openBiddingModal,
  hasBidded,
}) => {
  const { account } = useEVMWallet(true)
  const { open: openWalletModal } = useWalletModal()
  const started = status !== 'Upcoming'
  return (
    <Section>
      {started && <h2>{t`Sale Information`}</h2>}
      <Information started={started}>
        <ul>
          {!started && (
            <InformationItem label={t`Token`} value={token.symbol} />
          )}
          <InformationItem
            label={t`Tokens to be Offered`}
            value={formatAmt(valueToBigNumber(information.emissionAmount), {
              symbol: token.symbol,
            })}
          />
          <InformationItem
            label={t`Emission`}
            value={formatPct(information.emissionRatio)}
          />
          <InformationItem
            label={t`Bid with`}
            value={information.biddingAssets
              .map(({ symbol, name }) => `${symbol}(${name})`)
              .join('\n')}
          />
          <InformationItem
            label={t`Sale Start`}
            value={formatWithTZ(information.start, DATE_FORMAT)}
          />
          <InformationItem
            label={t`Sale End`}
            value={formatWithTZ(information.end, DATE_FORMAT)}
          />
        </ul>
      </Information>
      {status === 'Open' && !account ? (
        <CtaButton onClick={() => openWalletModal()}>
          <span>{t`Connect Wallet`}</span>
        </CtaButton>
      ) : status === 'Open' && !hasBidded ? (
        <CtaButton onClick={openBiddingModal}>
          <span>{t`Bid`}</span>
        </CtaButton>
      ) : (
        <></>
      )}
      {status === 'Ended' && (
        <CtaButton disabled>
          <span>{t`Closed`}</span>
        </CtaButton>
      )}
    </Section>
  )
}
