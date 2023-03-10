import { FC } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { BarChart } from 'src/components/parts/Chart'
import { SHIMMER_DARA_URI } from 'src/components/parts/Loading'
import { secondary, skyBlue } from 'src/styles/colors'
import { fontWeightBlack, fontWeightSemiBold } from 'src/styles/font'
import { MarketComposition } from 'src/types/models'
import { BN_ZERO, formatPct } from 'src/utils/number'
import styled from 'styled-components'
import { IterableElement } from 'type-fest'

export const AssetBarChartWithPlaceholder = asStyled<{
  totalInUSD: MarketComposition['totalInUSD']
  asset?: IterableElement<MarketComposition['amountByAssets']>
}>(({ totalInUSD, asset, className }) => {
  const isValid = totalInUSD.gt(BN_ZERO) && asset
  return (
    <Asset className={className}>
      <LabelWithPlaceholder
        label={asset?.symbol}
        value={
          isValid
            ? formatPct(asset.amountInUSD.dividedBy(totalInUSD))
            : formatPct(0)
        }
      />
      <BarChart
        ratio={
          isValid
            ? Math.min(asset.amountInUSD.dividedBy(totalInUSD).toNumber(), 1)
            : 0
        }
        filledStyles={{ bgColor: skyBlue }}
        unfilled={`${skyBlue}3d`}
      />
    </Asset>
  )
})``

const LabelWithPlaceholder: FC<{
  label?: string
  value: string
}> = ({ label, value }) => (
  <p>
    <span data-label={label || ''}>{label}</span>
    <span>{value}</span>
  </p>
)

const Asset = styled.div`
  p {
    display: flex;
    justify-content: space-between;
    color: ${secondary};
    span:first-child {
      font-size: 16px;
      font-weight: ${fontWeightBlack};
      line-height: 1.2;
    }
    span[data-label=''] {
      background: url('${SHIMMER_DARA_URI}');
      width: 6em;
      height: 1.2em;
      border-radius: 0.5em;
    }
    span:last-child {
      font-size: 14px;
      font-weight: ${fontWeightSemiBold};
    }
  }
  ${BarChart} {
    margin-top: 14px;
    height: 8px;
  }
`
