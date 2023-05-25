import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { FC, useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  IconClose,
  IconMetamask,
  IconPolkadotJs,
  IconProtocol,
  IconWalletConnect,
} from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useNetworkType } from 'src/hooks/useNetwork'
import { WalletConnector, useWallet } from 'src/hooks/useWallet'
import { NetworkType } from 'src/libs/config'
import { darkPurple, gray, offWhite, purple } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import { DOCS } from 'src/utils/routes'
import styled from 'styled-components'
import { LoadingProtocolIcon } from '../../Loading'
import { useMessageModal } from '../MessageModal'
import { ItemLabel } from '../parts'

const Wallet: FC<ModalContentProps> = ({ close }) => {
  const { data: network } = useNetworkType()
  const { connect } = useWallet(network)

  const { open } = useMessageModal()

  const [connecting, setConnecting] = useState(false)
  const onClickConnect = async (networkType: any, walletType: any) => {
    setConnecting(true)
    await connect(networkType, walletType).then(close, () => {
      setConnecting(false)
      open({
        type: 'Alert',
        title: t`Failed to connect to wallet`,
        message: t`Please check your wallet settings and try again.`,
      })
    })
  }

  return (
    <DefaultModalContent
      bodyNode={
        !connecting ? (
          <BodyConnect
            connect={onClickConnect}
            network={network}
            closeModal={close}
          />
        ) : (
          <BodyLoading />
        )
      }
      closeModal={close}
    />
  )
}

const BodyLoading = styled(({ className }) => (
  <BodyDiv className={className}>
    <LoadingProtocolIcon />
    <p>{t`Connecting the wallet...`}</p>
  </BodyDiv>
))`
  > p {
    margin-top: 48px;
  }
`

const BodyConnect: FC<{
  connect: WalletConnector
  closeModal: VoidFunction
  network: NetworkType
}> = ({ connect, closeModal, network }) => (
  <BodyDiv>
    <Heading>
      <IconDiv>
        <IconProtocol />
      </IconDiv>
      <div>{t`Connect Wallet`}</div>
      <button onClick={closeModal}>
        <IconClose />
      </button>
    </Heading>
    <WalletsDiv>
      {network === 'EVM' &&
        (isMobile ? (
          <button onClick={() => connect('EVM', 'WalletConnect')}>
            <ItemLabel label={t`WalletConnect`} IconSVG={IconWalletConnect} />
          </button>
        ) : (
          <button onClick={() => connect('EVM', 'Metamask')}>
            <ItemLabel label={t`Metamask`} IconSVG={IconMetamask} />
          </button>
        ))}
      {network === 'Polkadot' && (
        <button onClick={() => connect('Polkadot', 'polkadot-js')}>
          <ItemLabel label={t`Polkadot`} IconSVG={IconPolkadotJs} />
        </button>
      )}
    </WalletsDiv>
    <TermsP>
      <Trans
        id="By connecting, I understood <0>how Starlay Finance works and the risks involved</0> and agreed to use it at my own risk."
        message="By connecting, I understood <0>how Starlay Finance works and the risks involved</0> and agreed to use it at my own risk."
        components={[<Link key="0" href={DOCS} />]}
      />
    </TermsP>
  </BodyDiv>
)

const IconDiv = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin-top: 8px;
  padding: 8px;
  svg {
    width: 100%;
    height: 100%;
  }
  ::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #e6007a 0%, #5a8fce 64%, #0ae2ff 100%);
    filter: blur(16px);
    z-index: -1;
  }
  ::after {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(30px) brightness(0.76);
    background-color: rgba(0, 0, 0, 0.76);
    border-radius: 50%;

    overflow: hidden;
    z-index: -1;
  }
`

const Heading = styled.div`
  position: relative;
  width: 100%;
  ${flexCenter};
  flex-direction: column;
  row-gap: 20px;
  font-size: 20px;
  > button {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    color: ${gray};
  }
`

const TermsP = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
  color: ${gray};
  a {
    color: ${purple};
  }
`
const WalletsDiv = styled.div`
  width: 100%;
  button {
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
    border-bottom: 1px solid ${darkPurple}3a;
    ${ItemLabel} {
      justify-content: flex-start;
    }
    svg {
      width: 32px;
      /* height: 32px; */
    }
    transition: all 0.2s ease-in;
    :hover {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
    }
  }
`
const BodyDiv = styled.div`
  padding: 32px;
  font-size: 16px;
  font-weight: ${fontWeightSemiBold};
  color: ${offWhite};
  ${flexCenter};
  flex-direction: column;
  ${WalletsDiv} {
    margin-top: 24px;
    button {
      padding: 16px;
    }
  }
  ${TermsP} {
    margin-top: 16px;
  }
  @media ${breakpoint.xl} {
    font-size: 18px;
    ${WalletsDiv} {
      margin-top: 48px;
      button {
        padding: 20px;
      }
    }
    ${TermsP} {
      margin-top: 64px;
    }
  }
`

export const useWalletModal = () => useModalDialog(Wallet)
