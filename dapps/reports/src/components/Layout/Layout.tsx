import Body from '@karpatkey-monorepo/reports/src/components/Layout/Body'
import Header, { HEADER_HEIGHT } from '@karpatkey-monorepo/reports/src/components/Layout/Header'
import Sidebar, { SIDEBAR_WIDTH } from '@karpatkey-monorepo/reports/src/components/Layout/Sidebar'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import Footer, { FOOTER_HEIGHT } from '@karpatkey-monorepo/shared/layout/Footer'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'

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

const LayoutWithoutSidebarWrapper = styled(Box)(() => ({
  display: 'grid',
  gap: '0px 0px',
  gridTemplateRows: `${HEADER_HEIGHT}px auto ${FOOTER_HEIGHT}px`,
  gridTemplateColumns: `auto`,
  gridTemplateAreas: `"header"
                      "body"
                      "footer"`
}))

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { state } = useFilter()
  const { daoSelected, yearSelected, monthSelected } = state.value

  const isSidebarVisible = !!(daoSelected && yearSelected && monthSelected)

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
        <Header />
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
    <LayoutWithoutSidebarWrapper>
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
        <Header />
      </Box>
      <Box
        sx={{
          gridArea: 'body',
          width: '100%',
          top: HEADER_HEIGHT,
          zIndex: 900,
          minHeight: '100vh',
          overflowX: 'hidden',
          overflowY: 'hidden'
        }}
      >
        <Body>{children}</Body>
      </Box>
      <Box sx={{ gridArea: 'footer', width: '100%' }}>
        <Footer />
      </Box>
    </LayoutWithoutSidebarWrapper>
  )
}

export default Layout
