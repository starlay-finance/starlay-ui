import { VFC } from 'react'
import { asStyled, AsStyledProps } from 'src/components/hoc/asStyled'
import { useMarketData } from 'src/hooks/useMarketData'
import { breakpoint } from 'src/styles/mixins'
import { Asset, AssetMarketData } from 'src/types/models'
import styled, { keyframes } from 'styled-components'
import { AssetItem } from './Assets'

export type AssetsProps = {
  assets: Asset[]
}
export const AssetsMobile = asStyled<AssetsProps>((props) => {
  const { data } = useMarketData()
  const markets = data?.assets || []
  if (typeof window === 'undefined') return <></>
  return (
    <AssetsMobileSection>
      <AssetsComponent {...props} markets={markets} />
      <AssetsComponent {...props} markets={markets} />
    </AssetsMobileSection>
  )
})``

type AssetsComponentProps = {
  assets: Asset[]
  markets: Pick<
    AssetMarketData,
    'symbol' | 'depositAPY' | 'variableBorrowAPY'
  >[]
}
export const AssetsComponent: VFC<AssetsComponentProps & AsStyledProps> = ({
  assets,
  markets,
  className,
}) => (
  <AssetsDiv className={className} $appeared>
    {assets.map((each, idx) => {
      const market = markets.find(({ symbol }) => symbol === each.symbol)
      return (
        <AssetItem key={idx} asset={each} market={market} appeared disabled />
      )
    })}
    {assets.map((each, idx) => {
      const market = markets.find(({ symbol }) => symbol === each.symbol)
      return (
        <AssetItem key={idx} asset={each} market={market} appeared disabled />
      )
    })}
    {assets.map((each, idx) => {
      const market = markets.find(({ symbol }) => symbol === each.symbol)
      return (
        <AssetItem key={idx} asset={each} market={market} appeared disabled />
      )
    })}
  </AssetsDiv>
)

const assetsSlideKeyframes = keyframes`
  0% {
    transform:translateX(15.15%);
  }
  100% {
    transform: translateX(-18.25%);
  }
`

const AssetsDiv = styled.div<{ $appeared: boolean }>`
  display: flex;
  justify-content: flex-start;
  width: max-content;
  overflow: hidden;
  margin: 0 -24px;
  gap: 24px;
  animation: ${assetsSlideKeyframes} 200s infinite linear;
  :nth-child(1) {
    animation-delay: -14s;
  }
  :nth-child(2) {
    animation-delay: -124s;
  }
`

const AssetsMobileSection = styled.section`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @media ${breakpoint.xl} {
    display: none;
  }
`
