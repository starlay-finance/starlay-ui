import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useRef,
  VFC,
} from 'react'

type ModalOption = {
  inescapable?: boolean
}

type ModalProps<T> = T & {
  afterClose?: VoidFunction
}

type ModalOpener<P> = Partial<P> extends P
  ? (props?: ModalProps<P>) => void
  : (props: ModalProps<P>) => void

type UseModal = <P>(
  Component: VFC<ModalContentProps<P>>,
  option?: ModalOption,
) => {
  isOpen: boolean
  open: ModalOpener<P>
  close: VoidFunction
}

export type ModalContentProps<T = {}> = T & {
  close: VoidFunction
}

export type ModalState<T = any> = {
  Component: VFC<ModalContentProps<T>>
  props: T
  option?: ModalOption
}

type ModalStateHandler = <T = any>() => {
  state: ModalState | null | undefined
  mutate: (state: ModalState<T> | null | undefined) => void
}

export type ModalContainerProps = {
  isOpen: boolean
  close?: VoidFunction
  children: ReactNode
}

export type ModalHandler = {
  beforeClose?: () => Promise<any>
}

export const createModal = (
  useModalState: ModalStateHandler,
  ModalContainer: ForwardRefExoticComponent<
    ModalContainerProps & RefAttributes<ModalHandler>
  >,
  option?: ModalOption,
) => {
  const useModal: UseModal = (Component, componentOption) => {
    const { state, mutate } = useModalState()
    return {
      isOpen: state?.Component.name === Component.name,
      open: (props: any) =>
        mutate({ Component, props, option: { ...componentOption, ...option } }),
      close: () => {
        mutate(null)
        state?.props?.afterClose && state.props.afterClose()
      },
    }
  }

  const ModalFC = () => {
    const ref = useRef<ModalHandler>(null)
    const { state, mutate } = useModalState()
    const close = async () => {
      if (ref.current?.beforeClose) await ref.current.beforeClose()
      mutate(null)
      state?.props?.afterClose && state.props.afterClose()
    }
    return (
      <ModalContainer
        ref={ref}
        isOpen={!!state}
        close={
          state?.option?.inescapable || option?.inescapable ? undefined : close
        }
      >
        {state && <state.Component {...state.props} close={close} />}
      </ModalContainer>
    )
  }
  return {
    useModal,
    Modal: ModalFC,
  }
}
