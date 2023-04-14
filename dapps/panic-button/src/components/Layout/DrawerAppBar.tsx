import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material'
import { ButtonProps } from '@mui/material/Button'
import { ListItemTextProps } from '@mui/material/ListItemText'
import { Theme, css, styled } from '@mui/material/styles'
import Link, { LinkProps } from 'next/link'
import React, { FC, ReactElement } from 'react'

const CommonCSS = (theme: Theme) => css`
  margin-left: 5px;
  padding: 5px 10px;
  opacity: 0.7;
  color: #1a1b1f;
  font-size: 20px;
  line-height: 26px;
  font-weight: 400;
  letter-spacing: 0.25px;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  font-style: normal;

  &:hover {
    color: rgba(26, 27, 31, 0.6);
  }
`

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>`
  ${({ theme }) => CommonCSS(theme)}
`

const LinkCustom = styled(Link)<LinkProps>`
  ${({ theme }) => CommonCSS(theme)}
`

const ButtonCustom = styled(Button)<ButtonProps>`
  ${({ theme }) => css`
    ${CommonCSS(theme)};
    text-transform: none;
  `}
`

interface IDrawerAppBarProps {
  window?: () => Window
}

interface INavItem {
  name: string
  path: string
}

const DRAWER_WIDTH = 240
const NAV_ITEMS: INavItem[] = []

const HeaderWrapper = styled('div')(({ theme }) => ({
  height: 100,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  zIndex: '999',
  flex: '0 0 auto',
  position: 'sticky',
  backgroundSize: 'cover',
  transition: 'top 0.4s ease-in-out',
  '&.visible': {
    top: 0
  },
  '&.hidden': {
    top: -100
  }
}))

const DrawerAppBar: FC = (props: IDrawerAppBarProps): ReactElement => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const [anchorEl, setAnchorEl] = React.useState<TMaybe<HTMLElement>>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        <Link href="/admin/panel" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <ListItemTextCustom primary="Panel" />
            </ListItemButton>
          </ListItem>
        </Link>
        {NAV_ITEMS.map(({ name, path }: INavItem, index: number) => (
          <Link href={path} key={index} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'left' }}>
                <ListItemTextCustom primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <HeaderWrapper>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'background.default' }}>
        <Toolbar sx={{ marginY: '10px' }}>
          <Box
            component={Link}
            href="/"
            sx={{ flexGrow: 1, alignItems: 'center', display: 'flex' }}
          >
            <Box component="img" sx={{ width: '100px' }} src="/images/logos/logo.png" />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <LinkCustom href="/admin/panel">Panel</LinkCustom>

            {NAV_ITEMS.length > 0 && (
              <>
                <ButtonCustom
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  disableElevation
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  DAO Treasury Information
                </ButtonCustom>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                  sx={{ color: 'background.default' }}
                >
                  {NAV_ITEMS.map(({ name, path }: INavItem, index: number) => (
                    <MenuItem component={LinkCustom} href={path} key={index} onClick={handleClose}>
                      {name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'black', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor={'right'}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </HeaderWrapper>
  )
}

export default DrawerAppBar
