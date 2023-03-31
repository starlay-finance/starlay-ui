import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { FC, useState } from 'react'
import { IconMetamask, IconPolkadotJs } from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useNetworkType } from 'src/hooks/useNetwork'
import { WalletConnector, useWallet } from 'src/hooks/useWallet'
import { NetworkType } from 'src/libs/config'
import { darkPurple, purple, trueBlack } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
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
      headerNode={t`Connect Wallet`}
      bodyNode={
        !connecting ? (
          <BodyConnect connect={onClickConnect} network={network} />
        ) : (
          <BodyLoading />
        )
      }
      closeModal={close}
    />
  )
}

const BodyLoading: FC = () => (
  <BodyDiv>
    <LoadingProtocolIcon />
    <p>{t`Connecting the wallet...`}</p>
  </BodyDiv>
)

const BodyConnect: FC<{ connect: WalletConnector; network: NetworkType }> = ({
  connect,
  network,
}) => (
  <BodyDiv>
    {network === 'EVM' && (
      <Heading>{t`We currently supports Metamask only on EVM.`}</Heading>
    )}
    <WalletsDiv>
      {network === 'EVM' && (
        <button onClick={() => connect('EVM', 'Metamask')}>
          <ItemLabel label={t`Metamask`} IconSVG={IconMetamask} />
        </button>
      )}
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

const TermsP = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
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
    :hover {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
    }
  }
`
const Heading = styled.div`
  text-align: center;
  color: ${trueBlack};
`

const BodyDiv = styled.div`
  padding: 32px;
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};
  ${flexCenter};
  flex-direction: column;
  ${WalletsDiv} {
    margin-top: 48px;
  }
  ${TermsP} {
    margin-top: 64px;
    p {
      margin-top: 16px;
    }
  }
`

export const useWalletModal = () => useModalDialog(Wallet)
