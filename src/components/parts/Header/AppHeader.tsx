import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SymbolLay } from 'src/assets/images'
import {
  IconMetamask,
  IconPolkadotJs,
  IconSettings,
  LogoProtocol,
} from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { IconLink } from 'src/components/parts/Link'
import { useRewardModal } from 'src/components/parts/Modal/RewardModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useFaucet } from 'src/hooks/contracts/useFaucet'
import { useNetworkType } from 'src/hooks/useNetwork'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { NetworkType, getNetworkConfig } from 'src/libs/config'
import { darkGray, purple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import {
  APP,
  LAUNCHPAD,
  LAY_VELAY,
  MAKAI,
  MARKETS,
  POLKADOT_APP,
  POLKADOT_MARKETS,
  SWAP,
} from 'src/utils/routes'
import styled, { css } from 'styled-components'
import { useAccountsModal } from '../Modal/AccountsModal'
import { useGasSettingsModal } from '../Modal/GasSettingsModal'
import { useNetworkModal } from '../Modal/NetworkModal'
import { HeaderWrapper } from './common'

export const AppHeader = () => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  const { account, chainId } = useWallet(network)
  const { data: user } = useUserData()
  const { mint } = useFaucet()
  const [isSetingsOpen, setIsSettingsOpen] = useState(false)
  const { open: openRewardModal } = useRewardModal()
  const { open: openNetworkModal } = useNetworkModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openAccountsModal } = useAccountsModal()
  const { open: openGasSettingsModal } = useGasSettingsModal()
  return (
    <AppHeaderWrapper>
      <LogoLink
        href={network === 'Polkadot' ? POLKADOT_APP : APP}
        Icon={LogoProtocol}
        aria-label="App"
      />
      <Nav>
        <Tab $active={pathname === APP || pathname === POLKADOT_APP}>
          <Link
            href={network === 'Polkadot' ? POLKADOT_APP : APP}
          >{t`Dashboard`}</Link>
        </Tab>
        <Tab $active={pathname === MARKETS || pathname === POLKADOT_MARKETS}>
          <Link
            href={network === 'Polkadot' ? POLKADOT_MARKETS : MARKETS}
          >{t`Markets`}</Link>
        </Tab>
        <Tab $active={pathname === MAKAI}>
          <Link href={evmOnly(MAKAI, network)}>{t`Makai`}</Link>
        </Tab>
        <Tab $active={pathname === LAY_VELAY}>
          <Link href={evmOnly(LAY_VELAY, network)}>{t`LAY/veLAY`}</Link>
        </Tab>
      </Nav>
      <Menu>
        <MenuButtonSmall onClick={() => openNetworkModal()}>
          {network === 'Polkadot' ? <IconPolkadotJs /> : <IconMetamask />}
        </MenuButtonSmall>
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
          <MenuButtonSmall onClick={() => setIsSettingsOpen(!isSetingsOpen)}>
            <IconSettings />
          </MenuButtonSmall>
          <SettingsContainer $isOpen={isSetingsOpen}>
            <SettingsDiv as="div">
              <Link href={SWAP}>{t`Swap`}</Link>
            </SettingsDiv>
            <SettingsDiv as="div">
              <Link href={LAUNCHPAD}>{t`Launchpad`}</Link>
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
    </AppHeaderWrapper>
  )
}
const evmOnly = (url: string, network: NetworkType | undefined) =>
  network === 'EVM' ? url : undefined

const MenuButton = styled.button`
  ${flexCenter};
  padding: 12px 20px;
  border-radius: 4px;
  backdrop-filter: blur(16px) brightness(1.16);
  background-color: rgba(255, 255, 255, 0.16);
  column-gap: 8px;
`
const MenuButtonSmall = styled(MenuButton)`
  width: 42px;
  height: 42px;
  padding: unset;
  svg {
    height: 18px;
  }
`

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
    background-color: ${darkGray};
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
