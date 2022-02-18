import { LOADING_MODAL_FALLBACK } from 'src/components/parts/Modal/LoadingModal'
import { PageStaticProps } from 'src/types/page'

export const swrFallback = ({ loading }: PageStaticProps) => {
  let fallback = {}
  if (loading) Object.assign(fallback, LOADING_MODAL_FALLBACK)
  return fallback
}
