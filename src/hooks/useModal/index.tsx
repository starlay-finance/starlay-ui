import {
  DefaultModalContainer,
  LoadingModalContainer,
} from 'src/components/parts/Modal/base'
import { createModal, ModalState } from 'src/hooks/useModal/ModalFactory'
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
  DefaultModalContainer,
)

const { useModal: useLoadingModal, Modal: LoadingModal } = createModal(
  createHandler(MODAL_KEY_LOADING),
  LoadingModalContainer,
  { inescapable: true },
)

const { useModal: useErrorModal, Modal: ErrorModal } = createModal(
  createHandler('error'),
  DefaultModalContainer,
  { inescapable: true },
)

const ModalPortal = () => (
  <>
    <ModalDialog />
    <LoadingModal />
    <ErrorModal />
  </>
)
