import { t } from '@lingui/macro'
import { VFC } from 'react'
import {
  IconArrowRight,
  IconDiscord,
  IconTelegram,
  IconTwitter,
} from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { lightBlack, secondary } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { LaunchPadData } from './types'

export const ProjectInformation = styled<
  VFC<
    {
      information: LaunchPadData['information']
      token: LaunchPadData['token']
    } & { className?: string }
  >
>(({ information: { details, sale, notes, urls }, token, className }) => (
  <ProjectInformationDiv className={className}>
    <Description>
      <h2>{t`What is $${token.symbol}?`}</h2>
      <p>{details}</p>
      <Urls urls={urls} />
    </Description>
    <Description>
      <h2>{t`Sale Information`}</h2>
      <p>{sale}</p>
      {urls.docs && (
        <SingleLink>
          <Link href={urls.docs}>
            {t`View details in the docs`} <IconArrowRight />
          </Link>
        </SingleLink>
      )}
    </Description>
    <Description>
      <h2>{t`Reminder`}</h2>
      <p>{notes}</p>
    </Description>
  </ProjectInformationDiv>
))``

const Urls: VFC<{ urls: LaunchPadData['information']['urls'] }> = ({
  urls,
}) => (
  <UrlsDiv>
    <Link href={urls.website}>{t`Web`}</Link>
    {urls.docs && <Link href={urls.docs}>{t`Docs`}</Link>}
    <IconLinks>
      {urls.twitter && (
        <Link href={urls.twitter}>
          <IconTwitter />
        </Link>
      )}
      {urls.discord && (
        <Link href={urls.discord}>
          <IconDiscord />
        </Link>
      )}
      {urls.telegram && (
        <Link href={urls.telegram}>
          <IconTelegram />
        </Link>
      )}
    </IconLinks>
  </UrlsDiv>
)

const SingleLink = styled.div`
  font-size: 16px;
  font-weight: ${fontWeightSemiBold};
  a {
    display: flex;
    align-items: center;
    line-height: 1;
    width: fit-content;
    svg {
      height: 0.8em;
    }
  }
`
const IconLinks = styled.div`
  a {
    ${flexCenter};
    width: 32px;
    height: 32px;
    svg {
      width: 16px;
    }
  }
`
const UrlsDiv = styled.div`
  &,
  ${IconLinks} {
    display: flex;
    column-gap: 8px;
  }
  a {
    ${flexCenter};
    height: 32px;
    border-radius: 16px;
    background: ${lightBlack};
    line-height: 1;
  }
  > a {
    padding: 0 16px;
  }
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  white-space: pre-wrap;
  h2 {
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
  p {
    color: ${secondary};
    font-size: 16px;
    font-weight: ${fontWeightMedium};
  }
`

const ProjectInformationDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`
