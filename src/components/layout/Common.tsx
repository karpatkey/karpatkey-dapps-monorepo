import React from 'react'
import clsx from 'clsx'
import { Box, css, Link, styled } from '@mui/material'
import { Modal as BaseModal } from '@mui/base/Modal'

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
  (props, ref) => {
    const { open, className, ...other } = props
    return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />
  }
)

Backdrop.displayName = 'Backdrop'

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
`

export const ModalContent = styled('div')(
  ({ theme }) => css`
    text-align: start;
    background-color: ${theme.palette.background.default};
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    padding: 24px;
  `
)

export const LinkStyled = styled(Link)(() => ({
  opacity: '.7',
  color: '#1a1b1f',
  letterSpacing: '.25px',
  marginLeft: '5px',
  marginRight: '5px',
  padding: '5px 10px',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: '600 !important',
  lineHeight: '20px',
  textDecoration: 'none',
  '&:hover': {
    color: 'rgba(26, 27, 31, 0.6)'
  }
}))

export const NavbarContainer = styled(Box)(() => ({
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  zIndex: 1302
}))

interface NavbarProps {
  height?: number // Making height optional
}
export const Navbar = styled(Box)<NavbarProps>`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1301;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 20px;
  height: ${(props) =>
    props.height
      ? `${props.height}px`
      : '60px'}; /* Using a default value of 60px if height is not provided */
  background-color: #eeeded;
  '&.hide': {
    position: fixed;
    top: ${(props) =>
      props.height
        ? `-${props.height}px`
        : '-60px'}; /* Using a default value of -60px if height is not provided */
    transition: 0.3s linear;
    z-index: 1301;
  }
  '&.show , &.down': {
    position: fixed;
    top: 0;
    transition: 0.3s linear;
    z-index: 1301;
  }
`

export const NavbarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

interface WrapperProps {
  children: React.ReactNode
  sx?: any
  sxNavBar?: any
  height?: number
}

export const Wrapper = (props: WrapperProps) => {
  const [show, setShow] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false)
    } else {
      // if scroll up show the navbar
      setShow(true)
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  return (
    <NavbarContainer sx={{ ...props.sx }}>
      <Navbar
        className={`header ${show ? 'show' : 'hide'}`}
        height={props?.height}
        sx={{
          display: 'block',
          width: '100%',
          colorBackground: 'background.default',
          ...(props?.sxNavBar ?? {})
        }}
      >
        <NavbarWrapper>{props.children}</NavbarWrapper>
      </Navbar>
    </NavbarContainer>
  )
}