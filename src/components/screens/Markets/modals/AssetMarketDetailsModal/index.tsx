import { VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { css } from 'styled-components'
import {
  AssetMarketDetailsModalBody,
  AssetMarketDetailsModalBodyProps,
} from './Body'

export const AssetMarketDetails: VFC<
  ModalContentProps & AssetMarketDetailsModalBodyProps
> = ({ close, asset, marketReferenceCurrencyPriceInUSD }) => (
  <DefaultModalContent
    headerNode={
      <AssetLabel asset={asset} label={`${asset.name} Market Details`} />
    }
    headerStyle={headerStyle}
    bodyNode={
      <AssetMarketDetailsModalBody
        asset={asset}
        marketReferenceCurrencyPriceInUSD={marketReferenceCurrencyPriceInUSD}
      />
    }
    closeModal={close}
  />
)

const headerStyle = css`
  border-bottom: none;
`
export const useAssetMarketDetailsModal = () =>
  useModalDialog(AssetMarketDetails)
