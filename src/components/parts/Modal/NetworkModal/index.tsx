import { t } from '@lingui/macro'
import { FC } from 'react'
import { IconMetamask, IconPolkadotJs } from 'src/assets/svgs'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useNetworkType } from 'src/hooks/useNetwork'
import { NetworkType, getNetworkConfig } from 'src/libs/config'
import { DEFAULT_CHAIN_ID_POLKADOT } from 'src/libs/config/network'
import { darkPurple, trueBlack } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import styled from 'styled-components'
import { ItemLabel } from '../parts'

const Network: FC<ModalContentProps> = ({ close }) => {
  const { data: network, mutate: setNetwork } = useNetworkType()
  return (
    <DefaultModalContent
      headerNode={t`Select Network`}
      bodyNode={
        <BodyConnect
          network={network}
          setNetwork={(network) => {
            setNetwork(network)
            close()
          }}
        />
      }
      closeModal={close}
    />
  )
}

const BodyConnect: FC<{
  setNetwork: (network: NetworkType) => void
  network: NetworkType
}> = ({ setNetwork, network }) => (
  <BodyDiv>
    <NetworksDiv>
      <button onClick={() => setNetwork('EVM')} disabled={network === 'EVM'}>
        <ItemLabel
          label={getNetworkConfig('EVM', DEFAULT_CHAIN_ID).name}
          IconSVG={IconMetamask}
        />
      </button>
      <button
        onClick={() => setNetwork('Polkadot')}
        disabled={network === 'Polkadot'}
      >
        <ItemLabel
          label={getNetworkConfig('Polkadot', DEFAULT_CHAIN_ID_POLKADOT).name}
          IconSVG={IconPolkadotJs}
        />
      </button>
    </NetworksDiv>
  </BodyDiv>
)

const NetworksDiv = styled.div`
  width: 100%;
  button {
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
    color: ${trueBlack};
    padding: 20px;
    border-bottom: 1px solid ${darkPurple}3a;
    ${ItemLabel} {
      justify-content: flex-start;
    }
    svg {
      width: 32px;
      /* height: 32px; */
    }
    transition: all 0.2s ease-in;
    :enabled:hover {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
    }
    :disabled {
      color: ${trueBlack}80;
    }
  }
`

const BodyDiv = styled.div`
  padding: 32px;
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};
  ${flexCenter};
  flex-direction: column;
`

export const useNetworkModal = () => useModalDialog(Network)
