import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { FC, useEffect, useState } from 'react'
import { IconMetamask } from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { WalletType } from 'src/libs/wallet-provider'
import { darkPurple, purple, trueBlack } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { DOCS } from 'src/utils/routes'
import styled from 'styled-components'
import { LoadingProtocolIcon } from '../../Loading'
import { ItemLabel } from '../parts'

const Wallet: FC<ModalContentProps> = ({ close }) => {
  const { account, connect } = useEVMWallet()

  const [connecting, setConnecting] = useState(false)
  const onClickConnect = async (type: WalletType) => {
    setConnecting(true)
    await connect(type).catch(() => {})
    setConnecting(false)
  }

  useEffect(() => {
    if (!account) return
    close()
  }, [account])

  return (
    <DefaultModalContent
      headerNode={t`Connect Wallet`}
      bodyNode={
        !connecting ? <BodyConnect connect={onClickConnect} /> : <BodyLoading />
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

const BodyConnect: FC<{ connect: (type: WalletType) => void }> = ({
  connect,
}) => (
  <BodyDiv>
    <Heading>{t`We currently supports Metamask only.`}</Heading>
    <WalletsDiv>
      <button onClick={() => connect('Metamask')}>
        <ItemLabel label={t`Metamask`} IconSVG={IconMetamask} />
      </button>
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
    display: block;
    text-align: left;
    width: 100%;
    color: ${trueBlack};
    padding: 20px;
    border-bottom: 1px solid ${darkPurple}3a;
    ${ItemLabel} {
      justify-content: flex-start;
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
  p {
    margin-top: 16px;
  }
  ${WalletsDiv} {
    margin-top: 48px;
  }
  ${TermsP} {
    margin-top: 64px;
  }
`

export const useWalletModal = () => useModalDialog(Wallet)
