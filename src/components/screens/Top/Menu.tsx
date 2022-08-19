import { t } from '@lingui/macro'
import { useEffect, VFC } from 'react'
import {
  IconClose,
  IconDiscord,
  IconGithub,
  IconMedium,
  IconProtocol,
  IconTwitter,
} from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { IconLink } from 'src/components/parts/Link'
import { useMessageModalGradient } from 'src/components/parts/Modal/MessageModalGradient'
import { fadeIn, sequentialFadeIn } from 'src/styles/animation'
import { purple, trueWhite } from 'src/styles/colors'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { disableScroll, enableScroll } from 'src/utils/handleScroll'
import {
  BUG_BOUNTY,
  DISCORD,
  DOCS,
  GITHUB,
  GOVERNANCE,
  MEDIUM,
  TWITTER,
} from 'src/utils/routes'
import { Z_MODAL } from 'src/utils/zIndex'
import styled, { css, keyframes } from 'styled-components'

export const MobileMenu: VFC<{
  isOpen: boolean
  close: VoidFunction
}> = ({ isOpen, close }) => {
  const { open } = useMessageModalGradient()
  useEffect(() => {
    if (isOpen) disableScroll()
    else enableScroll()
  }, [isOpen])
  return (
    <MenuContainer isOpen={isOpen}>
      <MenuHeaderDiv>
        <h3>{t`Menu`}</h3>
        <button onClick={close}>
          <IconClose />
        </button>
      </MenuHeaderDiv>
      <Nav>
        <button
          onClick={() =>
            open({
              title: t`Sorry`,
              message: t`Starlay Finance does not support mobile access currently. Please connect to this website using your PC.`,
            })
          }
        >{t`Launch App`}</button>
        <Link href={DISCORD}>{t`Discord`}</Link>
        <Link href={DOCS}>{t`Docs`}</Link>
        <Link href={GOVERNANCE}>{t`Governance`}</Link>
        <Link href={BUG_BOUNTY}>{t`Bug Bounty`}</Link>
      </Nav>
      <IconLinks>
        <IconLink Icon={IconTwitter} href={TWITTER} aria-label={t`Twitter`} />
        <IconLink Icon={IconDiscord} href={DISCORD} aria-label={t`Discord`} />
        <IconLink Icon={IconMedium} href={MEDIUM} aria-label={t`Medium`} />
        <IconLink Icon={IconGithub} href={GITHUB} aria-label={t`Github`} />
      </IconLinks>
      <BgIcon>
        <IconProtocol />
      </BgIcon>
    </MenuContainer>
  )
}
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  font-size: 18px;
  font-size: ${fontWeightRegular};
`

const IconLinks = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  a {
    color: ${trueWhite};
    :hover {
      color: ${purple};
    }
  }
`
const MenuHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 16px;
    height: 16px;
  }
`
const BgIcon = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -72px;
  right: -116px;
  width: 400px;
  height: 400px;
  opacity: 0.02;
  svg {
    width: 100%;
    height: 100%;
    path {
      fill: ${trueWhite};
    }
  }
`
const bgiconFadeIn = keyframes`
0% {
   opacity: 0;
}  
100% {
   opacity: 0.02;
}
`

const contentFadeInAnimation = css`
  ${MenuHeaderDiv} {
    opacity: 0;
    animation: ${fadeIn} 0.25s 0.5s ease-in forwards;
  }
  ${Nav} > * {
    ${sequentialFadeIn({
      numOfItems: 5,
      duration: 0.25,
      sequenceDelay: 0.05,
      initialDelay: 0.6,
    })};
  }
  ${IconLinks} {
    opacity: 0;
    animation: ${fadeIn} 0.25s 1.05s ease-in forwards;
  }
  ${BgIcon} {
    opacity: 0;
    animation: ${bgiconFadeIn} 1.75s linear forwards;
  }
`

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  padding: 22px 24px 24px;
  z-index: ${Z_MODAL};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 64px;
  ${Nav} {
    flex: 1;
  }

  h3 {
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
  button:hover {
    color: ${purple};
  }

  background-color: rgba(0, 0, 0, 0.64);
  backdrop-filter: blur(24px) brightness(0.76);

  transition: all 0.2s ease-out;
  opacity: 1;
  ${({ isOpen }) =>
    isOpen
      ? contentFadeInAnimation
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`
