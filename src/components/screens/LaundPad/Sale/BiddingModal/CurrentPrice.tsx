import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Image } from 'src/components/elements/Image'
import { darkRed, lightBlack, skyBlue, trueBlack } from 'src/styles/colors'
import { fontWeightRegular } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { Asset } from 'src/types/models'
import { formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const CurrentPrice: VFC<{
  receivingAsset: Asset
  currentEstimatedPrice: BigNumber
}> = ({ receivingAsset, currentEstimatedPrice }) => (
  <CurrentPriceContainer>
    <div>
      <p>{t`Current Estimated Price`}</p>
      <CurrentPriceDiv>
        <div />
        <div />
        <div>
          <Image
            src={receivingAsset.icon}
            alt={receivingAsset.symbol}
            width={32}
            height={32}
          />
          <span>{`= ${formatUSD(currentEstimatedPrice)}`}</span>
        </div>
      </CurrentPriceDiv>
    </div>
  </CurrentPriceContainer>
)

const CurrentPriceDiv = styled.div`
  position: relative;
  padding: 14px 22px;
  border-radius: 14px;
  > div:not(:last-child) {
    position: absolute;
    inset: 0;
  }
  > div:nth-child(1) {
    border-radius: 4px;
    background: linear-gradient(90deg, ${darkRed}, ${skyBlue});
    filter: blur(8px);
  }
  > div:nth-child(2) {
    border-radius: 14px;
    background: ${lightBlack};
  }
  > div:last-child {
    position: relative;
    ${flexCenter};
    column-gap: 10px;
    svg {
      width: 32px;
      height: 32px;
    }
    span {
      font-size: 22px;
      font-weight: ${fontWeightRegular};
    }
  }
`

const CurrentPriceContainer = styled.div`
  background-color: ${trueBlack}52;
  > div {
    ${flexCenter};
    flex-direction: column;
    row-gap: 32px;
    padding: 40px;
  }
  ::before,
  ::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, ${darkRed}, ${skyBlue});
  }
`
