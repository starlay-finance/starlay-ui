import { InternalLink, Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { LOCALES_DICT } from 'src/locales'
import { darkPurple, purple, trueBlack } from 'src/styles/colors'
import styled, { css } from 'styled-components'

type LocaleSelectProps = {
  toggle: VoidFunction
  visible: boolean
  path: InternalLink
}
export const LocaleSelect = asStyled<LocaleSelectProps>(
  ({ path, visible, toggle, className }) => (
    <>
      <OuterDiv visible={visible} onClick={toggle} />
      <LocaleSelectDiv className={className} visible={visible}>
        {Object.entries(LOCALES_DICT).map(([key, label]) => (
          <Link key={key} href={path} onClick={toggle} locale={key}>
            {label}
          </Link>
        ))}
      </LocaleSelectDiv>
    </>
  ),
)``
const OuterDiv = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 9999vh;
  background-color: ${trueBlack}a3;
  transition: all 0.2s ease-in;
  ${({ visible }) =>
    !visible &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`
const LocaleSelectDiv = styled.div<{ visible: boolean }>`
  background: ${purple}3d;
  position: absolute;
  bottom: 80px;
  transform: translateX(-16px);
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  width: 136px;
  padding: 16px;
  border-radius: 8px;
  a {
    width: 100%;
    text-align: center;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${darkPurple};
    :last-child {
      margin-top: 0;
    }
    :first-child {
      margin-bottom: 0;
      padding-bottom: 0px;
      border: none;
    }
  }
  transition: all 0.2s ease-out;
  clip-path: inset(0);
  ${({ visible }) =>
    !visible &&
    css`
      clip-path: inset(50% 0);
      visibility: hidden;
    `}
`
