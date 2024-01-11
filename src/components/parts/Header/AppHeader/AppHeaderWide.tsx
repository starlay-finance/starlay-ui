// @ts-nocheck
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { SymbolAca, SymbolAstr, SymbolLay } from 'src/assets/images'
import { IconSettings, LogoProtocol } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { IconLink } from 'src/components/parts/Link'
import { useRewardModal } from 'src/components/parts/Modal/RewardModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useFaucet } from 'src/hooks/contracts/useFaucet'
import { useNetworkType } from 'src/hooks/useNetwork'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { getNetworkConfig } from 'src/libs/config'
import { lightBlack, purple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import {
  APP,
  APP_ROOT,
  LAUNCHPAD,
  LAY_VELAY,
  MAKAI,
  MARKETS,
  SWAP,
  byNetwork,
  evmOnly,
  matchPath,
} from 'src/utils/routes'
import styled, { css } from 'styled-components'
import { useAccountsModal } from '../../Modal/AccountsModal'
import { useGasSettingsModal } from '../../Modal/GasSettingsModal'
import { useNetworkModal } from '../../Modal/NetworkModal'
import { MenuButton, MenuButtonSmall } from './styles'

export const AppHeaderWide = styled(({ className }) => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  const { account, chainId } = useWallet(network)
  const { data: user } = useUserData()
  const { mint } = useFaucet()
  const [isSetingsOpen, setIsSettingsOpen] = useState(false)
  const [isNetworkOpen, setIsNetworkOpen] = useState(false)
  const networkContainerRef = useRef(null);
  const settingsContainerRef = useRef(null);
  const { open: openRewardModal } = useRewardModal()
  const { open: openNetworkModal } = useNetworkModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openAccountsModal } = useAccountsModal()
  const { open: openGasSettingsModal } = useGasSettingsModal()
  const handleNetworkClick = () => {
    // Close the menu when a menu item is clicked
    setIsNetworkOpen(false);
  };
  const handleSettingsClick = () => {
    // Close the menu when a menu item is clicked
    setIsSettingsOpen(false);
  };
  const handleClickOutside = (event: { target: any }) => {
    if (
      (networkContainerRef.current &&
        !networkContainerRef.current.contains(event.target)) || (settingsContainerRef.current &&
          !settingsContainerRef.current.contains(event.target))
    ) {
      // Clicked outside the SettingsContainer, so close the menu
      setIsNetworkOpen(false);
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount
  return (
    <HeaderContainer className={className}>
      <LogoLink
        href={byNetwork(APP, network)}
        Icon={LogoProtocol}
        aria-label="App"
      />
      <Nav>
        <Tab $active={matchPath(pathname, APP)}>
          <Link href={byNetwork(APP_ROOT, network)}>{t`Dashboard`}</Link>
        </Tab>
        <Tab $active={matchPath(pathname, MARKETS)}>
          <Link href={byNetwork(MARKETS, network)}>{t`Markets`}</Link>
        </Tab>
        <Tab $active={matchPath(pathname, MAKAI)}>
          <Link href={evmOnly(MAKAI, network)}>{t`Makai`}</Link>
        </Tab>
        <Tab $active={matchPath(pathname, LAY_VELAY)}>
          <Link href={evmOnly(LAY_VELAY, network)}>{t`LAY/veLAY`}</Link>
        </Tab>
      </Nav>
      <Menu>
        {/* <MenuButtonSmall onClick={() => openNetworkModal()}>
          {network === 'Polkadot' ? <IconPolkadotJs /> : <IconMetamask />}
        </MenuButtonSmall> */}
        <MenuButton
          onClick={() =>
            !account
              ? openWalletModal()
              : network === 'Polkadot'
                ? openAccountsModal()
                : {}
          }
          disabled={!!account && network !== 'Polkadot'}
        >
          {account ? shortenAddress(account) : t`Connect`}
        </MenuButton>
        <MenuButtonSmall
          onClick={() => openRewardModal()}
          disabled={!user || network !== 'EVM'}
        >
          <Image src={SymbolLay} alt="LAY" width={20} height={20} />
        </MenuButtonSmall>
        <div>
          <MenuButtonSmall onClick={() => setIsNetworkOpen(!isNetworkOpen)}>
            <Image src={SymbolAstr} alt="ACA" width={20} height={20} />
          </MenuButtonSmall>
          <SettingsContainer $isOpen={isNetworkOpen} ref={networkContainerRef}>
            <NetworkDiv as="div" onClick={handleNetworkClick}>
              <Image src={SymbolAstr} alt="ASTR" width={20} height={20} style={{ marginRight: '10px' }} />
              <Link href="">{t`Astar`}</Link>
            </NetworkDiv>
            <NetworkDiv as="div" onClick={handleNetworkClick}>
              <Image src={SymbolAca} alt="ACA" width={20} height={20} style={{ marginRight: '10px' }} />
              <Link href="https://starlay.finance/app/acala">{t`Acala`}</Link>
            </NetworkDiv>
          </SettingsContainer>
        </div>
        <div>
          <MenuButtonSmall onClick={() => setIsSettingsOpen(!isSetingsOpen)}>
            <IconSettings />
          </MenuButtonSmall>
          <SettingsContainer $isOpen={isSetingsOpen} ref={settingsContainerRef}>
            <SettingsDiv as="div">
              <Link href={SWAP}>{t`Swap`}</Link>
            </SettingsDiv>
            <SettingsDiv as="div">
              <Link href={evmOnly(LAUNCHPAD, network)}>{t`Launchpad`}</Link>
            </SettingsDiv>
            <SettingsDiv>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openGasSettingsModal({
                    afterClose: () => setIsSettingsOpen(false),
                  })
                }}
                disabled={network !== 'EVM'}
              >{t`Set Gas Fee`}</button>
            </SettingsDiv>
            {getNetworkConfig(network, chainId)?.isTestnet && (
              <SettingsDiv>
                <button onClick={mint} disabled={!mint}>{t`Faucet`}</button>
              </SettingsDiv>
            )}
          </SettingsContainer>
        </div>
      </Menu>
    </HeaderContainer>
  )
})``

const Menu = styled.div`
  display: flex;
  column-gap: 12px;
  > * {
    position: relative;
  }
`
const SettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  > a,
  button {
    display: block;
    padding: 12px 16px;
    white-space: nowrap;
    background-color: ${lightBlack};
    line-height: 1;
    transition: color 0.15s ease-in;
    :hover {
      color: ${purple};
    }
    :disabled {
      color: ${trueWhite}80;
    }
  }
`
const NetworkDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* > * {
    display: block; */
    padding: 12px 16px;
    white-space: nowrap;
    background-color: ${lightBlack};
    line-height: 1;
    transition: color 0.15s ease-in;
    :hover {
      color: ${purple};
    }
    :disabled {
      color: ${trueWhite}80;
    }
  /* } */
`

const SettingsContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  border-radius: 4px;
  overflow: hidden;
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
  svg {
    height: 32px;
    width: fit-content;
  }
  :hover {
    color: ${trueWhite};
  }
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
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
