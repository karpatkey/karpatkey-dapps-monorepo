import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box, Button, styled } from '@mui/material'
import { NextPage } from 'next'
import * as React from 'react'
import { useRouter } from 'next/router'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const HomeLinkWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '85%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    top: '100%',
    width: '100%'
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    height: '59px'
  }
}))

const Custom404Page: NextPage = () => {
  const router = useRouter()

  const onClickBackToHome = () => {
    router.push('/')
  }

  return (
    <PageWrapper>
      <Box height="100%" display="flex" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <CustomTypography color="textSecondary" variant="h3" textAlign="center">
            Page not found
          </CustomTypography>
        </Box>
        <HomeLinkWrapper>
          <StyledButton size="large" type="button" variant="contained" onClick={onClickBackToHome}>
            Back to Home
          </StyledButton>
        </HomeLinkWrapper>
      </Box>
    </PageWrapper>
  )
}

export default Custom404Page
