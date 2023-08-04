import { Box } from '@mui/material'
import React from 'react'

import CustomTypography from './CustomTypography'

const Logo = () => (
  <Box
    onClick={() => {
      window.open('https://www.karpatkey.com/', '_self')
    }}
    alignItems="center"
    display="flex"
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        textAlign: 'center',
        color: '#1A1A1A',
        width: '130px',
        height: '30px'
      }}
    >
      karpatkey
    </CustomTypography>
  </Box>
)

export default Logo
