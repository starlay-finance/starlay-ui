import styled from 'styled-components'
import { LockedLAY, UnclaimedLAY, WalletBalance } from './LayBalance'

export const LAYBalances = styled(({ className }) => {
  return (
    <Section className={className}>
      <UnclaimedLAY />
      <WalletBalance />
      <LockedLAY />
    </Section>
  )
})``

const Section = styled.section`
  display: flex;
  column-gap: 24px;
  > * {
    flex: 1;
  }
`
