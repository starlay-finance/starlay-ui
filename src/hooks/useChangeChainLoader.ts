import { useEffect } from 'react'
import { useLoadingModal } from 'src/components/parts/Modal/LoadingModal'
import { useMarketData } from 'src/hooks/useMarketData'
import { usePoolDataProvider } from 'src/hooks/usePoolDataProvider'

export const useChangeChainLoader = () => {
  const { open, close, isOpen } = useLoadingModal()
  const { data: poolDataProvider } = usePoolDataProvider()
  const { data: marketData } = useMarketData()
  useEffect(() => {
    if (!isOpen) return
    if (!marketData) return
    close()
  }, [marketData])
  useEffect(() => {
    if (isOpen) return
    if (!poolDataProvider) return
    open()
  }, [poolDataProvider])
}
