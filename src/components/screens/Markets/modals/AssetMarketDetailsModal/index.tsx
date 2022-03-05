import { VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { AssetMarketData } from 'src/types/models'
import { css } from 'styled-components'
import { AssetMarketDetailsModalBody } from './Body'

export const AssetMarketDetails: VFC<
  ModalContentProps & { asset: AssetMarketData }
> = ({ close, asset }) => (
  <DefaultModalContent
    headerNode={
      <AssetLabel asset={asset} label={`${asset.name} Market Details`} />
    }
    headerStyle={headerStyle}
    bodyNode={<AssetMarketDetailsModalBody asset={asset} />}
    closeModal={close}
  />
)

const headerStyle = css`
  border-bottom: none;
`
export const useAssetMarketDetailsModal = () =>
  useModalDialog(AssetMarketDetails)
