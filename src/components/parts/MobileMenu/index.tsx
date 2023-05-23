import { t } from '@lingui/macro'
import { a, useSpringRef, useTransition } from '@react-spring/web'
import { FC, ReactNode, useEffect } from 'react'
import {
  IconClose,
  IconDiscord,
  IconGithub,
  IconMedium,
  IconProtocol,
  IconTwitter,
} from 'src/assets/svgs'
import { IconLink } from 'src/components/parts/Link'
import { fadeIn, sequentialFadeIn } from 'src/styles/animation'
import { purple, trueWhite } from 'src/styles/colors'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { disableScroll, enableScroll } from 'src/utils/handleScroll'
import { DISCORD, GITHUB, MEDIUM, TWITTER } from 'src/utils/routes'
import { Z_MODAL } from 'src/utils/zIndex'
import styled, { css, keyframes } from 'styled-components'

const SWIPEOUT_PX = 150

export type MenuProps = {
  isOpen: boolean
  close: VoidFunction
  items: {
    header?: FC<{ back: VoidFunction }>
    content: ReactNode
  }[]
  index?: number
  back?: VoidFunction
}

export const MobileMenu: FC<MenuProps> = ({
  isOpen,
  close,
  // children,
  items,
  index = 0,
  back,
}) => {
  useEffect(() => {
    if (isOpen) disableScroll()
    else enableScroll()
    return () => {
      enableScroll()
    }
  }, [isOpen])

  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: {
      transform: index === 0 ? 'translateX(-50%)' : 'translateX(150%)',
    },
    enter: { transform: 'translateX(0%)' },
    leave: {
      transform: index === 0 ? 'translateX(150%)' : 'translateX(-50%)',
    },
  })
  useEffect(() => {
    transRef.set({ transform: 'translateX(0%)' })
  }, [])

  useEffect(() => {
    transRef.start()
  }, [index])

  return (
    <MenuContainer isOpen={isOpen}>
      <TransitionContainer>
        {transitions((style, i) => {
          const { content, header: Header } = items[i]
          return (
            <a.div style={style}>
              <MenuHeaderDiv>
                {Header && back ? (
                  <Header back={back} />
                ) : (
                  <>
                    <h3>{t`Menu`}</h3>
                  </>
                )}
              </MenuHeaderDiv>
              <Content>{content}</Content>
            </a.div>
          )
        })}
      </TransitionContainer>
      <IconLinks>
        <IconLink Icon={IconTwitter} href={TWITTER} aria-label={t`Twitter`} />
        <IconLink Icon={IconDiscord} href={DISCORD} aria-label={t`Discord`} />
        <IconLink Icon={IconMedium} href={MEDIUM} aria-label={t`Medium`} />
        <IconLink Icon={IconGithub} href={GITHUB} aria-label={t`Github`} />
      </IconLinks>
      <BgIcon>
        <IconProtocol />
      </BgIcon>
      <CloseButton show={index === 0} onClick={() => close()}>
        <IconClose />
      </CloseButton>
    </MenuContainer>
  )
}
const CloseButton = styled.button<{ show?: boolean }>`
  opacity: 0;
  transition: all 0.5s;
  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
`
const TransitionContainer = styled.div`
  position: relative;
  > div {
    position: absolute;
    inset: 0;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  font-size: 18px;
  font-size: ${fontWeightRegular};

  a[href=''] {
    color: ${trueWhite}80;
  }
  > a,
  > button {
    opacity: 0;
  }
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
    /* opacity: 0; */
    /* animation: ${fadeIn} 0.25s 0.5s ease-in forwards; */
  }
  ${Content} > a,
  ${Content} > button {
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
  ${Content} {
    margin-top: 64px;
    flex: 1;
  }

  h3 {
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
  button:hover {
    color: ${purple};
  }

  ${CloseButton} {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 16px;
    height: 16px;
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
