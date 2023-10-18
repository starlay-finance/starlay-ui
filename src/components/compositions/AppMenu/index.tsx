import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { IconArrowRight, IconProtocol } from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { SimpleCtaButton } from 'src/components/parts/Cta'
import { MenuProps, MobileMenu } from 'src/components/parts/MobileMenu'
import { NumberItem } from 'src/components/parts/Modal/parts'
import { NumberItems } from 'src/components/screens/Dashboard/modals/parts'
import { ASSETS_DICT } from 'src/constants/assets'
import { useClaimer } from 'src/hooks/contracts/useClaimer'
import { useMarketData } from 'src/hooks/useMarketData'
import { useNetworkType } from 'src/hooks/useNetwork'
import { useSwitchChainIfUnsupported } from 'src/hooks/useUnsupportedChainAlert'
import { useWallet } from 'src/hooks/useWallet'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { gray } from 'src/styles/colors'
import { BN_ZERO, formatAmt, formatUSD } from 'src/utils/number'
import {
  APP_ROOT,
  MAKAI,
  MARKETS,
  byNetwork,
  evmOnly,
  matchPath,
} from 'src/utils/routes'
import styled from 'styled-components'

export const AppMenu: FC<MenuProps> = (props) => {
  const [showClaim, setShowClaim] = useState(false)
  return (
    <MobileMenu
      {...props}
      index={showClaim ? 1 : 0}
      back={() => setShowClaim(false)}
      items={[
        {
          content: <MenuItems showClaim={() => setShowClaim(true)} />,
        },
        {
          header: ClaimLAYHeader,
          content: <ClaimLAY />,
        },
      ]}
    ></MobileMenu>
  )
}

const MenuItems: FC<{ showClaim: VoidFunction }> = ({ showClaim }) => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  const { account } = useWallet()
  return (
    <>
      <Link
        href={matchPath(pathname, APP_ROOT) ? '' : byNetwork(APP_ROOT, network)}
      >{t`Dashboard`}</Link>
      <Link
        href={matchPath(pathname, MARKETS) ? '' : byNetwork(MARKETS, network)}
      >{t`Markets`}</Link>
      <Link
        href={matchPath(pathname, MAKAI) ? '' : evmOnly(MAKAI, network)}
      >{t`Makai`}</Link>
      <Link href="">{t`LAY/veLAY`}</Link>
      <button onClick={showClaim} disabled={!account || network !== 'EVM'}>
        Claim LAY
      </button>
    </>
  )
}

const ClaimLAYHeader: FC<{ back: VoidFunction }> = ({ back }) => (
  <>
    <BackButton onClick={back}>
      <IconArrowRight />
    </BackButton>
    <TitleDiv>
      <IconProtocol />
      LAY
    </TitleDiv>
  </>
)
const ClaimLAY = () => {
  const { switchChainIfUnsupported } = useSwitchChainIfUnsupported()
  const { data: marketData } = useMarketData()
  const { data: balance } = useWalletBalance()
  const { data, claim } = useClaimer()

  const { symbol } = ASSETS_DICT.LAY
  const unclaimed = data?.total || BN_ZERO
  const inWallet = balance?.LAY || BN_ZERO
  const total = unclaimed.plus(inWallet)
  const priceInUSD = (
    marketData?.marketReferenceCurrencyPriceInUSD || BN_ZERO
  ).multipliedBy(
    marketData?.assets.find((asset) => asset.symbol === symbol)
      ?.priceInMarketReferenceCurrency || BN_ZERO,
  )
  const totalInUSD = total.multipliedBy(priceInUSD)

  return (
    <LAYDiv>
      <NumberItems>
        <NumberItem
          label={t`Wallet Balance`}
          num={valueToBigNumber(inWallet)}
          format={formatter}
        />
        <NumberItem
          label={t`Unclaimed Reward`}
          num={valueToBigNumber(data?.rewards || BN_ZERO)}
          format={formatter}
        />
        <NumberItem
          label={t`Price`}
          num={priceInUSD}
          format={(num) => formatUSD(num, { decimalPlaces: 8 })}
        />
      </NumberItems>
      <SimpleCtaButton
        onClick={switchChainIfUnsupported(claim)}
      >{t`CLAIM`}</SimpleCtaButton>
    </LAYDiv>
  )
}

const formatter = (num: BigNumber) => formatAmt(num, { decimalPlaces: 18 })
const LAYDiv = styled.div`
  font-size: 14px;
  ${NumberItem} {
    color: ${gray};
    :last-child {
      border-bottom-width: 2px;
      border-color: ${gray};
    }
  }
  ${SimpleCtaButton} {
    margin-top: 32px;
  }
`

const BackButton = styled.button`
  transform: rotate(180deg);
`
const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  svg {
    height: 28px;
    width: 28px;
  }
`
