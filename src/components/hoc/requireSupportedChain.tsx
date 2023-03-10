import { FC } from 'react'
import { useUnsupportedChainAlert } from 'src/hooks/useUnsupportedChainAlert'

type RequireSupportedChainHOC = <T>(Component: FC<T>) => FC<T & {}>
export const requireSupportedChain: RequireSupportedChainHOC =
  (Component) => (props) => {
    const { isUnsupportedChain } = useUnsupportedChainAlert({
      forceChangeChain: true,
    })
    if (isUnsupportedChain) return <></>
    return <Component {...props} />
  }
