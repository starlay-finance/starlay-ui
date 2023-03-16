import { t } from '@lingui/macro'
import { FC, useEffect, useState } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import {
  PolkadotAccountWithMeta,
  usePolkadotWallet,
} from 'src/hooks/usePolkadotWallet'
import { darkPurple, trueBlack } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { PolkadotAddress } from 'src/types/web3'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'
import { ItemLabel } from '../parts'

const Accounts: FC<ModalContentProps> = ({ close }) => {
  const {
    account,
    accounts: getAccounts,
    changeActiveAccount,
  } = usePolkadotWallet(true)

  const [accounts, setAccounts] = useState<PolkadotAccountWithMeta[]>([])
  useEffect(() => {
    getAccounts().then(setAccounts)
  }, [])

  return (
    <DefaultModalContent
      headerNode={t`Select Account`}
      bodyNode={
        <Body
          setAccount={(newAccount) => {
            changeActiveAccount(newAccount)
            close()
          }}
          accounts={accounts}
          activeAccount={account}
        />
      }
      closeModal={close}
    />
  )
}

const Body: FC<{
  setAccount: (account: PolkadotAddress) => void
  accounts: PolkadotAccountWithMeta[]
  activeAccount: PolkadotAddress | undefined
}> = ({ setAccount, accounts, activeAccount }) => (
  <BodyDiv>
    <AccountsDiv>
      {accounts.map(({ address, meta }) => (
        <button
          key={address}
          onClick={() => setAccount(address)}
          disabled={address === activeAccount}
        >
          {`${meta} : [${shortenAddress(address)}]`}
        </button>
      ))}
    </AccountsDiv>
  </BodyDiv>
)

const AccountsDiv = styled.div`
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
`

export const useAccountsModal = () => useModalDialog(Accounts)
