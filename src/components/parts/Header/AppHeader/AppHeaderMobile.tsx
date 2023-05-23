import { FC } from 'react'
import {
  IconArrowBottom,
  IconMenu,
  IconProtocol,
  IconWallet,
} from 'src/assets/svgs'
import { IconLink } from 'src/components/parts/Link'
import { useNetworkType } from 'src/hooks/useNetwork'
import { useWallet } from 'src/hooks/useWallet'
import { NetworkType } from 'src/libs/config'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { shortenAddress } from 'src/utils/address'
import { APP, POLKADOT_APP } from 'src/utils/routes'
import styled from 'styled-components'
import { useWalletModal } from '../../Modal/WalletModal'
import { MenuButtonSmall } from './styles'

const NETWORK: Record<NetworkType, string> = {
  EVM: 'EVM',
  Polkadot: 'WASM',
}

export const AppHeaderMobile = styled<
  FC<{ openMenu: VoidFunction } & { className?: string }>
>(({ className, openMenu }) => {
  const { data: network } = useNetworkType()
  const { account } = useWallet(network)
  const { open } = useWalletModal()
  return (
    <HeaderContainer className={className}>
      <div>
        <IconLink
          href={network === 'Polkadot' ? POLKADOT_APP : APP}
          Icon={IconProtocol}
          aria-label="App"
        />
        <button>
          {NETWORK[network]}
          <IconArrowBottom />
        </button>
      </div>
      <div>
        {account ? (
          <AccountDiv>
            <IconWallet />
            <div>{shortenAddress(account)}</div>
          </AccountDiv>
        ) : (
          <MenuButtonSmall onClick={() => open()}>
            <IconWallet />
          </MenuButtonSmall>
        )}
        <MenuButtonSmall onClick={openMenu}>
          <IconMenu />
        </MenuButtonSmall>
      </div>
    </HeaderContainer>
  )
})``

const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 12px 10px;
  border-radius: 16px;
  backdrop-filter: blur(8px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
  font-size: 12px;
  font-weight: ${fontWeightMedium};
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  > div {
    display: flex;
    align-items: center;
    height: 32px;
  }

  > div:first-child {
    column-gap: 12px;
    height: 32px;
    ${IconLink} {
      svg {
        height: 32px;
        width: 32px;
      }
    }
    button {
      display: flex;
      align-items: center;
      column-gap: 4px;

      font-weight: ${fontWeightBold};
      svg {
        margin-top: -3px;
      }
    }
  }
  ${MenuButtonSmall} {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  ${AccountDiv},
  ${MenuButtonSmall} {
    svg {
      height: 10px;
    }
  }
  > div:last-child {
    column-gap: 8px;
  }
`
