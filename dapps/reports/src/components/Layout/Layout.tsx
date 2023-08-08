import Body from '@karpatkey-monorepo/reports/src/components/Layout/Body'
import Header, { HEADER_HEIGHT } from '@karpatkey-monorepo/reports/src/components/Layout/Header'
import Sidebar, { SIDEBAR_WIDTH } from '@karpatkey-monorepo/reports/src/components/Layout/Sidebar'
import {ActionKind, useFilter} from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import Footer, { FOOTER_HEIGHT } from '@karpatkey-monorepo/shared/layout/Footer'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import {ReportProps} from "@karpatkey-monorepo/reports/src/types"

export interface LayoutProps {
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

const DISCLAIMER_TEXT = 'Token Balances and Prices are considered at end of month 0 UTC'

const Layout = (props: LayoutProps & ReportProps) => {
  const { children, monthSelected, daoSelected, yearSelected, filters } = props
  const { dispatch, state } = useFilter()

  const { value, status } = state
  const { monthSelected: MONTH, daoSelected: DAO, yearSelected: YEAR } = value

  React.useEffect(() => {
    dispatch({
      type: ActionKind.CREATE,
      payload: {
        status: 'success',
        value: { monthSelected, daoSelected, yearSelected, filters },
        error: null
      }
    })
  }, [monthSelected, daoSelected, yearSelected, filters, dispatch])

  if (status === 'loading') {
    return null
  }

  const isSidebarVisible = !!(DAO && YEAR && MONTH) && status === 'success'

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
        <Footer disclaimerText={DISCLAIMER_TEXT} />
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
