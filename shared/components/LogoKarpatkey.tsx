import { Box } from '@mui/material'
import React from 'react'
import NextImage from 'next/image'

const LogoKarpatkey = () => (
  <Box
    onClick={() => {
      window.open('https://www.karpatkey.com/', '_self')
    }}
    alignItems="center"
    display="flex"
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
    <NextImage alt="logo" src="/images/logos/logo1.png" width={102} height={21} />
  </Box>
)

export default LogoKarpatkey
