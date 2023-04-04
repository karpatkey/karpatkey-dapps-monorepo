import Link from '@karpatkey-monorepo/shared/components/Link'
import ProTip from '@karpatkey-monorepo/shared/components/ProTip'
import Copyright from '@karpatkey-monorepo/shared/layout/Copyright'
import { Box, Button, Container, Typography } from '@mui/material'
import * as React from 'react'

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}
