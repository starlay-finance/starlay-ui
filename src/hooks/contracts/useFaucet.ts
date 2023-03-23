import { BN_HUNDRED } from 'src/utils/number'
import { useStarlay } from '../useStarlay'
import { useTxHandler } from './useTxHandler'

export const useFaucet = () => {
  const { faucet, txExecutor } = useStarlay()
  const { handleTx } = useTxHandler()

  const mint = faucet
    ? async () => {
        if (!txExecutor) throw new Error('Unexpected state')
        return handleTx(await faucet.mint(BN_HUNDRED.shiftedBy(18)), txExecutor)
      }
    : undefined

  return {
    mint,
  }
}
