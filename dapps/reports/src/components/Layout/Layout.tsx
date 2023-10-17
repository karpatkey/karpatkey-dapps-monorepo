import Body from '@karpatkey-monorepo/reports/src/components/Layout/Body'
import Header, { HEADER_HEIGHT } from '@karpatkey-monorepo/reports/src/components/Layout/Header'
import { Header as HomepageHeader } from '@karpatkey-monorepo/reports/src/components/Layout/Homepage/Header'
import { Footer as HomepageFooter } from '@karpatkey-monorepo/reports/src/components/Layout/Homepage/Footer'
import Sidebar, { SIDEBAR_WIDTH } from '@karpatkey-monorepo/reports/src/components/Layout/Sidebar'
import Footer, { FOOTER_HEIGHT } from '@karpatkey-monorepo/shared/layout/Footer'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'

interface LayoutProps {
  children: React.ReactElement
}

const LayoutWithSidebarWrapper = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: `${HEADER_HEIGHT}px auto ${FOOTER_HEIGHT}px`,
  gridTemplateColumns: `${SIDEBAR_WIDTH}px auto auto`,
  gridTemplateAreas: `"header header header"
                      "sidebar body body"
                      "sidebar footer footer"`
}))

const MainWrapper = styled(BoxWrapperColumn)(() => ({
  height: '100vh',
  width: '100vw'
}))

const MainContainer = styled(BoxWrapperColumn)(() => ({
  alignItems: 'center',
  flexGrow: 1,
  zIndex: 1,
  paddingRight: '30px',
  paddingLeft: '30px',
  justifyContent: 'space-between'
}))

const Layout = ({ children }: LayoutProps): ReactElement => {
  const queryParams = new URLSearchParams(window.location.search)
  const daoParam = queryParams.get('dao')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')

  const isSidebarVisible = !!(daoParam && yearParam && monthParam)

  return isSidebarVisible ? (
    <LayoutWithSidebarWrapper>
      <Box
        sx={{
          gridArea: 'header',
          width: '100%',
          position: 'fixed',
          top: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: 1000,
          minHeight: HEADER_HEIGHT
        }}
      >
        <Header showFilters />
      </Box>
      <Box
        sx={{
          gridArea: 'sidebar',
          height: '100%',
          position: 'fixed',
          top: HEADER_HEIGHT,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: 900,
          minWidth: SIDEBAR_WIDTH
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          gridArea: 'body',
          width: '100%',
          top: HEADER_HEIGHT,
          borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: 800,
          minHeight: '100vh',
          overflowX: 'hidden',
          overflowY: 'hidden'
        }}
      >
        <Body>{children}</Body>
      </Box>
      <Box sx={{ gridArea: 'footer', width: '100%' }}>
        <Footer disclaimerText={'Token Balances and Prices are considered at end of month 0 UTC'} />
      </Box>
    </LayoutWithSidebarWrapper>
  ) : (
    <MainWrapper>
      <HomepageHeader />
      <MainContainer component="main">{children}</MainContainer>
      <HomepageFooter />
    </MainWrapper>
  )
}

export default Layout
