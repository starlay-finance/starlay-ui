import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SymbolLay } from 'src/assets/images'
import { IconSettings, LogoProtocol } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { IconLink } from 'src/components/parts/Link'
import { useRewardModal } from 'src/components/parts/Modal/RewardModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { darkGray, purple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import { formatUSD } from 'src/utils/number'
import { APP, LAUNCHPAD, MAKAI, MARKETS, SWAP } from 'src/utils/routes'
import styled, { css } from 'styled-components'
import { useGasSettingsModal } from '../Modal/GasSettingsModal'
import { HeaderWrapper } from './common'

export const AppHeader = () => {
  const { pathname } = useRouter()
  const { account } = useWallet()
  const { data: user } = useUserData()
  const [isSetingsOpen, setIsSettingsOpen] = useState(false)
  const { open: openRewardModal } = useRewardModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openGasSettingsModal } = useGasSettingsModal()
  const { data: layPriceInUSD } = useLAYPrice()
  return (
    <AppHeaderWrapper>
      <LogoLink href={APP} Icon={LogoProtocol} aria-label="App" />
      <Nav>
        <Tab $active={pathname === APP}>
          <Link href={APP}>{t`Dashboard`}</Link>
        </Tab>
        <Tab $active={pathname === MARKETS}>
          <Link href={MARKETS}>{t`Markets`}</Link>
        </Tab>
        <Tab $active={pathname === MAKAI}>
          <Link href={MAKAI}>{t`Makai`}</Link>
        </Tab>
        <Tab $active={pathname === SWAP}>
          <Link href={SWAP}>{t`Swap`}</Link>
        </Tab>
        <Tab $active={pathname.startsWith(LAUNCHPAD)}>
          <Link href={LAUNCHPAD}>{t`Launchpad`}</Link>
        </Tab>
      </Nav>
      <Menu>
        <MenuButtonSmall onClick={() => openRewardModal()} disabled={!user}>
          <Image src={SymbolLay} alt="Starlay" width={20} height={20} />
          {layPriceInUSD ? formatUSD(layPriceInUSD, { decimalPlaces: 3 }) : '-'}
        </MenuButtonSmall>
        <MenuButton onClick={() => openWalletModal()} disabled={!!account}>
          {account ? shortenAddress(account) : t`Connect`}
        </MenuButton>
        <div>
          <MenuButtonSmall
            onClick={() => setIsSettingsOpen(!isSetingsOpen)}
            disabled={!user}
          >
            <IconSettings />
          </MenuButtonSmall>
          <SettingsContainer $isOpen={isSetingsOpen}>
            <SettingsButton
              onClick={(e) => {
                e.stopPropagation()
                openGasSettingsModal({
                  afterClose: () => setIsSettingsOpen(false),
                })
              }}
            >
              {t`Set Gas Fee`}
            </SettingsButton>
          </SettingsContainer>
        </div>
      </Menu>
    </AppHeaderWrapper>
  )
}

const MenuButton = styled.button`
  ${flexCenter};
  padding: 12px 20px;
  border-radius: 4px;
  backdrop-filter: blur(16px) brightness(1.16);
  background-color: rgba(255, 255, 255, 0.16);
  column-gap: 8px;
`
const MenuButtonSmall = styled(MenuButton)`
  padding: 12px;
`

const Menu = styled.div`
  display: flex;
  column-gap: 12px;
  > * {
    position: relative;
  }
`
const SettingsButton = styled.button`
  padding: 12px 16px;
  white-space: nowrap;
  border-radius: 4px;
  background-color: ${darkGray};
  line-height: 1;
`

const SettingsContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  transition: visibility, opacity, 0.2s ease-in;
  visibility: hidden;
  opacity: 0;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`

const activeStyle = css`
  color: ${purple};
  :after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 1px;
    border-bottom: 1px solid;
  }
`
const Tab = styled.div<{ $active?: boolean }>`
  position: relative;
  font-size: 16px;
  font-weight: ${fontWeightHeavy};
  ${({ $active }) => $active && activeStyle}
`

const Nav = styled.nav`
  ${flexCenter};
  column-gap: 32px;
`

const LogoLink = styled(IconLink)`
  display: block;
  height: 32px;
  :hover {
    color: ${trueWhite};
  }
  svg {
    height: 32px;
    width: 100px;
  }
`

const AppHeaderWrapper = styled(HeaderWrapper)`
  > {
    :first-child {
      flex: 1;
      > :last-child {
        margin-right: auto;
      }
    }
    :last-child {
      flex: 1;
      > :first-child {
        margin-left: auto;
      }
    }
  }
`
