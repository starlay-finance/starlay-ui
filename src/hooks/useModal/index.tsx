import { ResponsiveModalContainer } from 'src/components/parts/Modal/base'
import { ModalState, createModal } from 'src/hooks/useModal/ModalFactory'
import { useSWRLocal } from '../base/useSWRLocal'

export type {
  ModalContainerProps,
  ModalContentProps,
  ModalHandler,
} from './ModalFactory'
export { ModalPortal, useModalDialog, useLoadingModal, useErrorModal }

const modalKey = (key: string) => `modal-${key}`

export const MODAL_KEY_LOADING = modalKey('loading')

const createHandler = (key: string) => () => {
  const { data, mutate } = useSWRLocal<ModalState | null>(modalKey(key))
  return { state: data, mutate }
}

const { useModal: useModalDialog, Modal: ModalDialog } = createModal(
  createHandler('dialog'),
  ResponsiveModalContainer,
)

const { useModal: useLoadingModal, Modal: LoadingModal } = createModal(
  createHandler(MODAL_KEY_LOADING),
  ResponsiveModalContainer,
  { inescapable: true },
)

const { useModal: useErrorModal, Modal: ErrorModal } = createModal(
  createHandler('error'),
  ResponsiveModalContainer,
  { inescapable: true },
)

const ModalPortal = () => (
  <>
    <ModalDialog />
    <LoadingModal />
    <ErrorModal />
  </>
)
