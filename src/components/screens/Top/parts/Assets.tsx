import { t } from '@lingui/macro'
import { CSSProperties, useState, VFC } from 'react'
import { useDeviceSelectors } from 'react-device-detect'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { asStyled, AsStyledProps } from 'src/components/hoc/asStyled'
import { SHIMMER_DARA_URI } from 'src/components/parts/Loading'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { useMarketData } from 'src/hooks/useMarketData'
import { darkRed, primary, secondary, skyBlue } from 'src/styles/colors'
import {
  fontWeightBlack,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { Asset, AssetMarketData } from 'src/types/models'
import { formatPct } from 'src/utils/number'
import { APP } from 'src/utils/routes'
import styled, { css, keyframes } from 'styled-components'
import { assetsAnimation } from './animation'

export type AssetsProps = {
  assets: Asset[]
}
export const Assets = asStyled<AssetsProps>((props) => {
  const { data } = useMarketData()
  const markets = data?.assets || []
  if (typeof window === 'undefined') return <></>
  return <AssetsComponent {...props} markets={markets} />
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
}) => {
  const [appeared, setAppeared] = useState(false)
  const [selectors] = useDeviceSelectors('')
  return (
    <AssetsDiv className={className} $appeared={appeared}>
      {assets.map((each, idx, arr) => {
        const market = markets.find(({ symbol }) => symbol === each.symbol)
        const isLast = idx === arr.length - 1
        return (
          <AssetItem
            key={idx}
            asset={each}
            market={market}
            appeared={appeared}
            onAnimationEnd={
              !appeared && isLast ? () => setAppeared(true) : undefined
            }
            symbolStyle={{
              // Heavy use of backdrop-filter in chrome on mac will slow down performance.
              ...(selectors?.isChrome &&
                selectors?.isMacOs && {
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                }),
            }}
          />
        )
      })}
    </AssetsDiv>
  )
}

type AssetItemProps = {
  appeared: boolean
  onAnimationEnd?: VoidFunction
  symbolStyle?: CSSProperties
  asset: Asset
  market?: Pick<AssetMarketData, 'symbol' | 'depositAPY' | 'variableBorrowAPY'>
  disabled?: boolean
}
export const AssetItem: VFC<AssetItemProps> = ({
  appeared,
  onAnimationEnd,
  symbolStyle,
  asset,
  market,
  disabled,
}) => (
  <AssetItemLink
    href={APP}
    $appeared={appeared}
    onAnimationEnd={onAnimationEnd}
    newTab
    $disabled={disabled}
  >
    <Symbol style={symbolStyle}>
      <Image src={asset.icon} alt={asset.name} width={32} height={32} />
      <span>{asset.name}</span>
    </Symbol>
    <Rates>
      {!asset.borrowUnsupported ? (
        <>
          <Rate
            label={t`Deposit APY`}
            value={market ? formatPct(market.depositAPY) : undefined}
          />
          <Rate
            label={t`Borrow APY`}
            value={market ? formatPct(market.variableBorrowAPY) : undefined}
          />
        </>
      ) : (
        <ComingSoon>Coming Soon</ComingSoon>
      )}
    </Rates>
  </AssetItemLink>
)

const Rate: VFC<{ label: string; value: string | undefined }> = ({
  label,
  value = '',
}) => (
  <RateDiv>
    <p>{label}</p>
    <p data-value={value}>
      <BlinkWrapper value={value}>{value}</BlinkWrapper>
    </p>
  </RateDiv>
)

const RateDiv = styled.div`
  p:first-child {
    color: ${secondary};
    font-size: 12px;
    font-weight: ${fontWeightMedium};
  }
  p:last-child {
    margin-top: 4px;
    font-size: 14px;
    font-weight: ${fontWeightSemiBold};
    line-height: 1.2;
    text-align: left;
  }
  p[data-value=''] {
    height: 1.2em;
    border-radius: 0.5em;
    background: url('${SHIMMER_DARA_URI}');
  }
  @media ${breakpoint.xl} {
    p:first-child {
      font-size: 14px;
    }
    p:last-child {
      font-size: 20px;
    }
  }
`

const Rates = styled.div`
  display: flex;
  column-gap: 16px;
`
const ComingSoon = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightRegular};
  font-style: italic;
  color: ${secondary};
`
const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(16px) brightness(1.16);
  background: linear-gradient(90deg, ${darkRed}29, ${skyBlue}29);

  span:last-child {
    display: none;
  }
  @media ${breakpoint.xl} {
    padding: 12px;
    border-radius: 16px;
    span:last-child {
      display: unset;
      font-size: 20px;
      font-weight: ${fontWeightBlack};
      font-style: italic;
    }
  }
`

const hoverBackgroundKeyframes = keyframes`
  0% {
    opacity: 1;
    background-position: 0%;
  }
  100% {
    opacity: 1;
    background-position: -300%;
  }
`

const AssetItemLink = styled(Link)<{ $appeared: boolean; $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 10px;
  padding-right: 24px;
  border-radius: 16px;
  backdrop-filter: blur(8px) brightness(1.08);
  background-color: rgba(255, 255, 255, 0.08);
  ${Rates} {
    margin-left: 20px;
  }
  transition: all 0.2s;
  transform: translateY(0px);
  :hover {
    color: ${primary};
    ${({ $appeared }) =>
      $appeared &&
      css`
        transform: translateY(2px);
        background: linear-gradient(
          90deg,
          ${darkRed}3d,
          ${skyBlue}3d,
          ${darkRed}3d
        );
        background-size: 300%;
        animation: ${hoverBackgroundKeyframes} 5s infinite linear !important;
        ${Symbol} {
          background: transparent;
          backdrop-filter: none;
        }
      `}
  }
  @media ${breakpoint.xl} {
    padding: 24px;
  }
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
    `}
`
const appearingAnimation = css`
  opacity: 0;
  pointer-events: none;
  cursor: auto;
  ${assetsAnimation};
`
const AssetsDiv = styled.div<{ $appeared: boolean }>`
  position: absolute;
  top: -2%;
  right: -48%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1400px;
  transform: translateX(380px);
  ${AssetItemLink} {
    transition: all 0.2s;
    :nth-child(-n + 3) {
      transform: translateX(120px);
      :hover {
        transform: translateX(120px) translateY(2px);
      }
    }
    :nth-child(n + 4):nth-child(-n + 6) {
      transform: translateX(280px);
      :hover {
        transform: translateX(280px) translateY(2px);
      }
    }
    :nth-child(n + 10) {
      transform: translateX(200px);
      :hover {
        transform: translateX(200px) translateY(2px);
      }
    }
  }
  ${AssetItemLink} {
    opacity: 1;
    ${({ $appeared }) => !$appeared && appearingAnimation};
  }
  display: none;
  @media ${breakpoint.xl} {
    display: flex;
  }
`
