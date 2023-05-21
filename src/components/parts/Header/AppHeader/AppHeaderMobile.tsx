import { useRouter } from 'next/router'
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
import { fontWeightBold } from 'src/styles/font'
import { APP, POLKADOT_APP } from 'src/utils/routes'
import styled from 'styled-components'
import { MenuButtonSmall } from './styles'

const NETWORK: Record<NetworkType, string> = {
  EVM: 'EVM',
  Polkadot: 'WASM',
}

export const AppHeaderMobile = styled(({ className }) => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  const { account, chainId } = useWallet(network)
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
        <MenuButtonSmall>
          <IconWallet />
        </MenuButtonSmall>
        <MenuButtonSmall>
          <IconMenu />
        </MenuButtonSmall>
      </div>
    </HeaderContainer>
  )
})``

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
    svg {
      height: 10px;
    }
  }
  > div:last-child {
    column-gap: 8px;
  }
`
