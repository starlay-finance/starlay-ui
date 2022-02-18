import { VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { useLoadingModal as useLoadingModalPortal } from 'src/hooks/useModal'
import { LoadingProtocolIcon } from '../../Loading'

const LoadingModal: VFC = () => (
  <DefaultModalContent bodyNode={<LoadingProtocolIcon />} />
)

export const useLoadingModal = () => useLoadingModalPortal(LoadingModal)

export const LOADING_MODAL_FALLBACK = {
  'modal-loading': {
    Component: LoadingModal,
    option: { inescapable: true },
  },
}
